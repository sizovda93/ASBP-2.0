const express = require('express');
const multer = require('multer');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: 'aspb-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// ─── Multer setup ────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, suffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Допустимы только изображения: jpg, png, gif, webp, svg'));
    }
  }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

const readJSON = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// ─── Auth middleware ─────────────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
  if (req.session && req.session.isAdmin) return next();
  res.status(401).json({ error: 'Требуется авторизация' });
};

// ─── Static routes ───────────────────────────────────────────────────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin', 'index.html')));
app.get('/admin/', (req, res) => res.sendFile(path.join(__dirname, 'admin', 'index.html')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// ─── Auth API ────────────────────────────────────────────────────────────────
app.get('/api/auth/check', (req, res) => {
  res.json({ isAdmin: !!(req.session && req.session.isAdmin) });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const admin = readJSON(ADMIN_FILE);
  if (username === admin.username && password === admin.password) {
    req.session.isAdmin = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Неверный логин или пароль' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.post('/api/auth/change-password', requireAuth, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Пароль должен содержать не менее 6 символов' });
  }
  const admin = readJSON(ADMIN_FILE);
  admin.password = newPassword;
  writeJSON(ADMIN_FILE, admin);
  res.json({ success: true });
});

// ─── Content API ─────────────────────────────────────────────────────────────
app.get('/api/content', (req, res) => {
  res.json(readJSON(CONTENT_FILE));
});

// Update a full section (object-type sections)
app.put('/api/content/:section', requireAuth, (req, res) => {
  const content = readJSON(CONTENT_FILE);
  content[req.params.section] = req.body;
  writeJSON(CONTENT_FILE, content);
  res.json({ success: true });
});

// Add item to an array section
app.post('/api/content/:section/item', requireAuth, (req, res) => {
  const content = readJSON(CONTENT_FILE);
  const section = req.params.section;
  if (!Array.isArray(content[section])) {
    return res.status(400).json({ error: 'Секция не является массивом' });
  }
  const newItem = { ...req.body, id: Date.now() };
  content[section].push(newItem);
  writeJSON(CONTENT_FILE, content);
  res.json({ success: true, item: newItem });
});

// Update item in an array section
app.put('/api/content/:section/item/:id', requireAuth, (req, res) => {
  const content = readJSON(CONTENT_FILE);
  const section = req.params.section;
  const id = parseInt(req.params.id);
  if (!Array.isArray(content[section])) {
    return res.status(400).json({ error: 'Секция не является массивом' });
  }
  const idx = content[section].findIndex(item => item.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Элемент не найден' });
  content[section][idx] = { ...req.body, id };
  writeJSON(CONTENT_FILE, content);
  res.json({ success: true });
});

// Delete item from an array section
app.delete('/api/content/:section/item/:id', requireAuth, (req, res) => {
  const content = readJSON(CONTENT_FILE);
  const section = req.params.section;
  const id = parseInt(req.params.id);
  if (!Array.isArray(content[section])) {
    return res.status(400).json({ error: 'Секция не является массивом' });
  }
  content[section] = content[section].filter(item => item.id !== id);
  writeJSON(CONTENT_FILE, content);
  res.json({ success: true });
});

// Reorder items in an array section
app.put('/api/content/:section/reorder', requireAuth, (req, res) => {
  const content = readJSON(CONTENT_FILE);
  const section = req.params.section;
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Ожидается массив' });
  content[section] = req.body;
  writeJSON(CONTENT_FILE, content);
  res.json({ success: true });
});

// ─── Image/Upload API ────────────────────────────────────────────────────────
app.get('/api/uploads', requireAuth, (req, res) => {
  const dir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(dir)) return res.json([]);
  const files = fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
    .map(f => {
      const stat = fs.statSync(path.join(dir, f));
      return { name: f, url: `/uploads/${f}`, size: stat.size, mtime: stat.mtime };
    })
    .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
  res.json(files);
});

app.post('/api/uploads', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Файл не загружен' });
  res.json({ success: true, url: `/uploads/${req.file.filename}`, name: req.file.originalname });
});

app.delete('/api/uploads/:filename', requireAuth, (req, res) => {
  // Prevent path traversal
  const filename = path.basename(req.params.filename);
  const filePath = path.join(__dirname, 'uploads', filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Файл не найден' });
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

// ─── Submissions API ─────────────────────────────────────────────────────────
app.post('/api/submissions', (req, res) => {
  const { name, phone, debt } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Укажите имя и телефон' });
  const submissions = readJSON(SUBMISSIONS_FILE);
  const entry = { id: Date.now(), date: new Date().toISOString(), name, phone, debt: debt || '', status: 'new' };
  submissions.unshift(entry);
  writeJSON(SUBMISSIONS_FILE, submissions);
  res.json({ success: true });
});

app.get('/api/submissions', requireAuth, (req, res) => {
  res.json(readJSON(SUBMISSIONS_FILE));
});

app.put('/api/submissions/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const submissions = readJSON(SUBMISSIONS_FILE);
  const idx = submissions.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Заявка не найдена' });
  submissions[idx] = { ...submissions[idx], ...req.body, id };
  writeJSON(SUBMISSIONS_FILE, submissions);
  res.json({ success: true });
});

app.delete('/api/submissions/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const submissions = readJSON(SUBMISSIONS_FILE);
  writeJSON(SUBMISSIONS_FILE, submissions.filter(s => s.id !== id));
  res.json({ success: true });
});

// ─── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Сервер запущен: http://localhost:${PORT}`);
  console.log(`🔧 Админ-панель:   http://localhost:${PORT}/admin`);
  console.log(`   Логин: admin`);
  console.log(`   Пароль: admin123\n`);
});
