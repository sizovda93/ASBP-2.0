import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import multer from 'multer';
import path from 'path';
import { query } from '../db.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg|avif|pdf|doc|docx)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  },
});

const router = Router();

// GET /api/media — list all media
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT id, file_name, file_url, file_type, file_size, created_at FROM media ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/media/:id/content — serve file from DB
router.get('/:id/content', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM media WHERE id=$1', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const file = result.rows[0];
    res.setHeader('Content-Type', file.file_type || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.file_name)}"`);

    if (file.file_data) {
      res.send(file.file_data);
    } else {
      res.status(404).json({ error: 'File data not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/media/upload — upload file to database
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    const mediaId = randomUUID();
    const fileUrl = `/api/media/${mediaId}/content`;

    const result = await query(
      `INSERT INTO media (id, file_name, file_url, file_type, file_size, file_data, storage_kind)
       VALUES ($1,$2,$3,$4,$5,$6,'db')
       RETURNING id, file_name, file_url, file_type, file_size, created_at`,
      [mediaId, req.file.originalname, fileUrl, req.file.mimetype, req.file.size, req.file.buffer]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/media/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM media WHERE id=$1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'File not found' });
      return;
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
