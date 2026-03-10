// ─── State ────────────────────────────────────────────────────────────────────
let content = {};
let imagePickerCallback = null;
let imagePickerPreviewId = null;

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    const { isAdmin } = await api('GET', '/api/auth/check');
    if (isAdmin) {
        showAdmin();
    } else {
        showLogin();
    }

    // Sidebar navigation
    document.querySelectorAll('.sidebar-item[data-section]').forEach(el => {
        el.addEventListener('click', () => {
            const section = el.dataset.section;
            navigate(section);
        });
    });

    // Login form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errEl = document.getElementById('login-error');
        errEl.style.display = 'none';

        try {
            await api('POST', '/api/auth/login', { username, password });
            showAdmin();
        } catch {
            errEl.style.display = 'block';
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', async () => {
        await api('POST', '/api/auth/logout');
        location.reload();
    });

    // Upload zone drag-and-drop
    const zone = document.getElementById('upload-zone');
    if (zone) {
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files[0]) uploadImageFile(files[0]).then(loadGallery);
        });
    }
});

// ─── Auth ─────────────────────────────────────────────────────────────────────
function showLogin() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-screen').style.display = 'none';
}

async function showAdmin() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-screen').style.display = 'flex';
    await loadAllContent();
    navigate('dashboard');
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function navigate(section) {
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    const sidebarItem = document.querySelector(`.sidebar-item[data-section="${section}"]`);
    if (sidebarItem) sidebarItem.classList.add('active');

    document.querySelectorAll('.section-panel').forEach(el => el.classList.remove('active'));
    const panel = document.getElementById(`panel-${section}`);
    if (panel) panel.classList.add('active');

    // Populate section data
    const fns = {
        dashboard: renderDashboard,
        submissions: renderSubmissions,
        topbar: renderTopBar,
        nav: renderNav,
        hero: renderHero,
        stats: renderStats,
        services: renderServices,
        cases: renderCases,
        contact: renderContact,
        footer: renderFooter,
        gallery: loadGallery,
        settings: () => {}
    };
    if (fns[section]) fns[section]();
}

// ─── Data loading ─────────────────────────────────────────────────────────────
async function loadAllContent() {
    content = await api('GET', '/api/content');
    const subs = await api('GET', '/api/submissions');
    const newCount = subs.filter(s => s.status === 'new').length;
    const badge = document.getElementById('submissions-badge');
    if (badge) {
        if (newCount > 0) { badge.textContent = newCount; badge.style.display = 'inline-block'; }
        else { badge.style.display = 'none'; }
    }
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
async function renderDashboard() {
    const subs = await api('GET', '/api/submissions');
    const newCount = subs.filter(s => s.status === 'new').length;

    const statsEl = document.getElementById('dashboard-stats');
    if (statsEl) {
        statsEl.innerHTML = `
            <div class="dash-card">
                <div class="dash-card-label">Всего заявок</div>
                <div class="dash-card-value">${subs.length}</div>
            </div>
            <div class="dash-card">
                <div class="dash-card-label">Новых заявок</div>
                <div class="dash-card-value" style="color:var(--accent)">${newCount}</div>
            </div>
            <div class="dash-card">
                <div class="dash-card-label">Обработано</div>
                <div class="dash-card-value">${subs.filter(s => s.status === 'done').length}</div>
            </div>`;
    }

    const subsEl = document.getElementById('dashboard-submissions');
    if (subsEl) {
        const recent = subs.slice(0, 5);
        if (!recent.length) {
            subsEl.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">Заявок пока нет</p>';
        } else {
            subsEl.innerHTML = renderSubmissionTable(recent, false);
        }
    }
}

// ─── Submissions ──────────────────────────────────────────────────────────────
async function renderSubmissions() {
    const subs = await api('GET', '/api/submissions');
    const wrap = document.getElementById('submissions-table-wrap');
    if (!wrap) return;
    if (!subs.length) {
        wrap.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">Заявок пока нет</p>';
        return;
    }
    wrap.innerHTML = renderSubmissionTable(subs, true);
}

function renderSubmissionTable(subs, showActions) {
    return `<table>
        <thead>
            <tr>
                <th>Дата</th>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Сумма долга</th>
                <th>Статус</th>
                ${showActions ? '<th></th>' : ''}
            </tr>
        </thead>
        <tbody>
            ${subs.map(s => `
                <tr>
                    <td style="color:var(--text-muted);white-space:nowrap;">${formatDate(s.date)}</td>
                    <td>${esc(s.name)}</td>
                    <td>${esc(s.phone)}</td>
                    <td>${esc(s.debt)}</td>
                    <td>
                        <span class="status-badge status-${s.status}">
                            ${s.status === 'new' ? '● Новая' : '✓ Обработана'}
                        </span>
                    </td>
                    ${showActions ? `<td>
                        <div style="display:flex;gap:8px;">
                            ${s.status === 'new' ? `<button class="btn btn-accent btn-sm" onclick="markSubmission(${s.id}, 'done')">Обработана</button>` : `<button class="btn btn-secondary btn-sm" onclick="markSubmission(${s.id}, 'new')">Вернуть</button>`}
                            <button class="btn btn-danger btn-sm" onclick="deleteSubmission(${s.id})">Удалить</button>
                        </div>
                    </td>` : ''}
                </tr>`).join('')}
        </tbody>
    </table>`;
}

async function markSubmission(id, status) {
    await api('PUT', `/api/submissions/${id}`, { status });
    await loadAllContent();
    renderSubmissions();
    renderDashboard();
    toast('Статус обновлён', 'success');
}

async function deleteSubmission(id) {
    if (!confirm('Удалить заявку?')) return;
    await api('DELETE', `/api/submissions/${id}`);
    await loadAllContent();
    renderSubmissions();
    renderDashboard();
    toast('Заявка удалена', 'success');
}

// ─── Top Bar ─────────────────────────────────────────────────────────────────
function renderTopBar() {
    const tb = content.topBar || {};
    setVal('tb-text', tb.text);
    setVal('tb-phone', tb.phone);
    setVal('tb-viber', tb.viber);
    setVal('tb-whatsapp', tb.whatsapp);
    setVal('tb-telegram', tb.telegram);
}

async function saveTopBar() {
    const data = {
        text: getVal('tb-text'),
        phone: getVal('tb-phone'),
        viber: getVal('tb-viber'),
        whatsapp: getVal('tb-whatsapp'),
        telegram: getVal('tb-telegram')
    };
    await api('PUT', '/api/content/topBar', data);
    content.topBar = data;
    toast('Верхняя строка сохранена', 'success');
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function renderNav() {
    const nav = content.nav || {};
    setVal('nav-logo-input', nav.logo);
    setVal('nav-cta-text', nav.ctaText);
    setVal('nav-cta-href', nav.ctaHref);
    renderNavItems(nav.items || []);
}

function renderNavItems(items) {
    const list = document.getElementById('nav-items-list');
    if (!list) return;
    list.innerHTML = items.map((item, idx) => `
        <div class="nav-item-row" data-idx="${idx}">
            <div class="nav-item-top">
                <input type="text" class="form-control" placeholder="Название" value="${esc(item.title)}" data-field="title" data-idx="${idx}">
                <input type="text" class="form-control" placeholder="Ссылка (#, /services)" value="${esc(item.href)}" data-field="href" data-idx="${idx}">
                <button class="btn btn-danger btn-icon btn-sm" onclick="removeNavItem(${idx})" title="Удалить">×</button>
            </div>
            ${(item.dropdown && item.dropdown.length) || true ? `
            <div class="nav-dropdown-list" id="nav-dd-${idx}">
                ${(item.dropdown || []).map((dd, di) => `
                    <div class="nav-dd-row">
                        <input type="text" class="form-control" placeholder="Название" value="${esc(dd.title)}" data-dd-idx="${idx}" data-dd-di="${di}" data-dd-field="title">
                        <input type="text" class="form-control" placeholder="Ссылка" value="${esc(dd.href)}" data-dd-idx="${idx}" data-dd-di="${di}" data-dd-field="href">
                        <button class="btn btn-danger btn-icon btn-sm" onclick="removeNavDropdown(${idx},${di})" title="Удалить">×</button>
                    </div>`).join('')}
                <button class="btn btn-secondary btn-sm" onclick="addNavDropdown(${idx})" style="margin-top:6px;">+ Подпункт</button>
            </div>` : ''}
        </div>`).join('');
}

function getNavItemsData() {
    const items = content.nav.items || [];
    // Read current values from form
    items.forEach((item, idx) => {
        const titleEl = document.querySelector(`[data-field="title"][data-idx="${idx}"]`);
        const hrefEl = document.querySelector(`[data-field="href"][data-idx="${idx}"]`);
        if (titleEl) item.title = titleEl.value;
        if (hrefEl) item.href = hrefEl.value;

        item.dropdown = (item.dropdown || []).map((dd, di) => {
            const ddTitle = document.querySelector(`[data-dd-idx="${idx}"][data-dd-di="${di}"][data-dd-field="title"]`);
            const ddHref = document.querySelector(`[data-dd-idx="${idx}"][data-dd-di="${di}"][data-dd-field="href"]`);
            return {
                title: ddTitle ? ddTitle.value : dd.title,
                href: ddHref ? ddHref.value : dd.href
            };
        });
    });
    return items;
}

function addNavItem() {
    const items = getNavItemsData();
    items.push({ id: Date.now(), title: 'Новый пункт', href: '#', dropdown: [] });
    content.nav.items = items;
    renderNavItems(items);
}

function removeNavItem(idx) {
    const items = getNavItemsData();
    items.splice(idx, 1);
    content.nav.items = items;
    renderNavItems(items);
}

function addNavDropdown(idx) {
    const items = getNavItemsData();
    if (!items[idx].dropdown) items[idx].dropdown = [];
    items[idx].dropdown.push({ title: 'Подпункт', href: '#' });
    content.nav.items = items;
    renderNavItems(items);
}

function removeNavDropdown(idx, di) {
    const items = getNavItemsData();
    items[idx].dropdown.splice(di, 1);
    content.nav.items = items;
    renderNavItems(items);
}

async function saveNav() {
    const items = getNavItemsData();
    const data = {
        logo: getVal('nav-logo-input'),
        ctaText: getVal('nav-cta-text'),
        ctaHref: getVal('nav-cta-href'),
        items
    };
    await api('PUT', '/api/content/nav', data);
    content.nav = data;
    toast('Навигация сохранена', 'success');
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function renderHero() {
    const h = content.hero || {};
    setVal('hero-label-input', h.label);
    setVal('hero-title-input', h.title);
    setVal('hero-subtitle-input', h.subtitle);
    setVal('hero-btn1-text', h.btnPrimary);
    setVal('hero-btn1-href', h.btnPrimaryHref);
    setVal('hero-btn2-text', h.btnSecondary);
    setVal('hero-btn2-href', h.btnSecondaryHref);
    setVal('hero-bg-image', h.backgroundImage);
    updateImagePreview('hero-bg-image', 'hero-bg-preview');
    document.getElementById('hero-bg-image').addEventListener('input', () => updateImagePreview('hero-bg-image', 'hero-bg-preview'));
}

async function saveHero() {
    const data = {
        label: getVal('hero-label-input'),
        title: getVal('hero-title-input'),
        subtitle: getVal('hero-subtitle-input'),
        btnPrimary: getVal('hero-btn1-text'),
        btnPrimaryHref: getVal('hero-btn1-href'),
        btnSecondary: getVal('hero-btn2-text'),
        btnSecondaryHref: getVal('hero-btn2-href'),
        backgroundImage: getVal('hero-bg-image')
    };
    await api('PUT', '/api/content/hero', data);
    content.hero = data;
    toast('Баннер сохранён', 'success');
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function renderStats() {
    const list = document.getElementById('stats-list');
    if (!list) return;
    const stats = content.stats || [];
    list.innerHTML = stats.map(s => `
        <div class="item-row">
            <div class="item-row-info">
                <div class="item-row-title">${esc(s.label)}</div>
                <div class="item-row-sub">${esc(s.value)} ${esc(s.unit)}${s.badge ? ' · ' + esc(s.badge) : ''}</div>
            </div>
            <div class="item-row-actions">
                <button class="btn btn-secondary btn-sm" onclick="openEditStat(${s.id})">Изменить</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStat(${s.id})">Удалить</button>
            </div>
        </div>`).join('');
}

function openAddStat() {
    openModal('Добавить карточку', statForm({}), async () => {
        const data = getStatForm();
        await api('POST', '/api/content/stats/item', data);
        await loadAllContent();
        renderStats();
        toast('Карточка добавлена', 'success');
    });
}

function openEditStat(id) {
    const stat = (content.stats || []).find(s => s.id === id);
    if (!stat) return;
    openModal('Редактировать карточку', statForm(stat), async () => {
        const data = getStatForm();
        await api('PUT', `/api/content/stats/item/${id}`, data);
        await loadAllContent();
        renderStats();
        toast('Карточка обновлена', 'success');
    });
}

async function deleteStat(id) {
    if (!confirm('Удалить карточку?')) return;
    await api('DELETE', `/api/content/stats/item/${id}`);
    await loadAllContent();
    renderStats();
    toast('Карточка удалена', 'success');
}

function statForm(s) {
    return `
        <div class="form-grid">
            <div class="form-group"><label>Значение (число)</label><input class="form-control" id="sf-value" value="${esc(s.value || '')}"></div>
            <div class="form-group"><label>Единица (K, %, Млрд ₽)</label><input class="form-control" id="sf-unit" value="${esc(s.unit || '')}"></div>
        </div>
        <div class="form-group"><label>Подпись</label><input class="form-control" id="sf-label" value="${esc(s.label || '')}"></div>
        <div class="form-group"><label>Бейдж (необязательно)</label><input class="form-control" id="sf-badge" value="${esc(s.badge || '')}"></div>`;
}

function getStatForm() {
    return { value: getVal('sf-value'), unit: getVal('sf-unit'), label: getVal('sf-label'), badge: getVal('sf-badge') };
}

// ─── Services ─────────────────────────────────────────────────────────────────
function renderServices() {
    setVal('srv-tag', (content.servicesSection || {}).tag);
    setVal('srv-title', (content.servicesSection || {}).title);
    const list = document.getElementById('services-list');
    if (!list) return;
    const services = content.services || [];
    list.innerHTML = services.map(s => `
        <div class="item-row">
            ${s.image ? `<img src="${esc(s.image)}" class="item-thumbnail">` : ''}
            <div class="item-row-info">
                <div class="item-row-title">${esc(s.title)}</div>
                <div class="item-row-sub">${esc(s.description)}</div>
            </div>
            <div class="item-row-actions">
                <button class="btn btn-secondary btn-sm" onclick="openEditService(${s.id})">Изменить</button>
                <button class="btn btn-danger btn-sm" onclick="deleteService(${s.id})">Удалить</button>
            </div>
        </div>`).join('');
}

async function saveServicesSection() {
    const data = { tag: getVal('srv-tag'), title: getVal('srv-title') };
    await api('PUT', '/api/content/servicesSection', data);
    content.servicesSection = data;
    toast('Заголовок сохранён', 'success');
}

function serviceForm(s) {
    const icons = ['shield', 'box', 'users', 'scale', 'chart', 'doc', 'star'];
    return `
        <div class="form-group"><label>Название услуги</label><input class="form-control" id="srf-title" value="${esc(s.title || '')}"></div>
        <div class="form-group"><label>Описание</label><textarea class="form-control" id="srf-desc" rows="3">${esc(s.description || '')}</textarea></div>
        <div class="form-group">
            <label>Иконка</label>
            <select class="form-control" id="srf-icon">
                ${icons.map(ic => `<option value="${ic}" ${s.icon === ic ? 'selected' : ''}>${ic}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Изображение карточки (необязательно)</label>
            <div class="image-input-group">
                <input type="text" class="form-control" id="srf-image" value="${esc(s.image || '')}" placeholder="URL или выберите">
                <img src="${esc(s.image || '')}" class="image-preview ${s.image ? 'visible' : ''}" id="srf-img-preview">
                <button class="btn btn-secondary" onclick="openImagePicker('srf-image','srf-img-preview')">Выбрать</button>
            </div>
        </div>`;
}

function getServiceForm() {
    return { title: getVal('srf-title'), description: getVal('srf-desc'), icon: getVal('srf-icon'), image: getVal('srf-image') };
}

function openAddService() {
    openModal('Добавить услугу', serviceForm({}), async () => {
        const data = getServiceForm();
        await api('POST', '/api/content/services/item', data);
        await loadAllContent();
        renderServices();
        toast('Услуга добавлена', 'success');
    });
}

function openEditService(id) {
    const srv = (content.services || []).find(s => s.id === id);
    if (!srv) return;
    openModal('Редактировать услугу', serviceForm(srv), async () => {
        const data = getServiceForm();
        await api('PUT', `/api/content/services/item/${id}`, data);
        await loadAllContent();
        renderServices();
        toast('Услуга обновлена', 'success');
    });
    // Init image preview listener after modal renders
    setTimeout(() => {
        const imgInput = document.getElementById('srf-image');
        if (imgInput) imgInput.addEventListener('input', () => updateImagePreview('srf-image', 'srf-img-preview'));
    }, 100);
}

async function deleteService(id) {
    if (!confirm('Удалить услугу?')) return;
    await api('DELETE', `/api/content/services/item/${id}`);
    await loadAllContent();
    renderServices();
    toast('Услуга удалена', 'success');
}

// ─── Cases ────────────────────────────────────────────────────────────────────
function renderCases() {
    setVal('cases-tag-input', (content.casesSection || {}).tag);
    setVal('cases-title-input', (content.casesSection || {}).title);
    const list = document.getElementById('cases-list');
    if (!list) return;
    const cases = content.cases || [];
    list.innerHTML = cases.map(c => `
        <div class="item-row">
            <div class="item-row-info">
                <div class="item-row-title">${esc(c.number)}</div>
                <div class="item-row-sub">${esc(c.amount)}${c.status ? ' · ' + esc(c.status) : ''} · ${c.size === 'large' ? 'Широкая' : 'Узкая'}</div>
            </div>
            <div class="item-row-actions">
                <button class="btn btn-secondary btn-sm" onclick="openEditCase(${c.id})">Изменить</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCase(${c.id})">Удалить</button>
            </div>
        </div>`).join('');
}

async function saveCasesSection() {
    const data = { tag: getVal('cases-tag-input'), title: getVal('cases-title-input') };
    await api('PUT', '/api/content/casesSection', data);
    content.casesSection = data;
    toast('Заголовок сохранён', 'success');
}

function caseForm(c) {
    return `
        <div class="form-group"><label>Номер дела</label><input class="form-control" id="cf-number" value="${esc(c.number || '')}"></div>
        <div class="form-group"><label>Статус (необязательно)</label><input class="form-control" id="cf-status" value="${esc(c.status || '')}" placeholder="Завершено успешно"></div>
        <div class="form-group"><label>Списанная сумма</label><input class="form-control" id="cf-amount" value="${esc(c.amount || '')}"></div>
        <div class="form-group"><label>Описание</label><textarea class="form-control" id="cf-desc" rows="3">${esc(c.description || '')}</textarea></div>
        <div class="form-grid">
            <div class="form-group">
                <label>Размер карточки</label>
                <select class="form-control" id="cf-size">
                    <option value="large" ${c.size === 'large' ? 'selected' : ''}>Широкая (8/12)</option>
                    <option value="small" ${c.size === 'small' ? 'selected' : ''}>Узкая (4/12)</option>
                </select>
            </div>
            <div class="form-group">
                <label>Акцентная подсветка</label>
                <select class="form-control" id="cf-accent">
                    <option value="false" ${!c.accent ? 'selected' : ''}>Нет</option>
                    <option value="true" ${c.accent ? 'selected' : ''}>Да (зелёная)</option>
                </select>
            </div>
        </div>`;
}

function getCaseForm() {
    return {
        number: getVal('cf-number'),
        status: getVal('cf-status'),
        amount: getVal('cf-amount'),
        description: getVal('cf-desc'),
        size: getVal('cf-size'),
        accent: getVal('cf-accent') === 'true'
    };
}

function openAddCase() {
    openModal('Добавить дело', caseForm({}), async () => {
        const data = getCaseForm();
        await api('POST', '/api/content/cases/item', data);
        await loadAllContent();
        renderCases();
        toast('Дело добавлено', 'success');
    });
}

function openEditCase(id) {
    const c = (content.cases || []).find(x => x.id === id);
    if (!c) return;
    openModal('Редактировать дело', caseForm(c), async () => {
        const data = getCaseForm();
        await api('PUT', `/api/content/cases/item/${id}`, data);
        await loadAllContent();
        renderCases();
        toast('Дело обновлено', 'success');
    });
}

async function deleteCase(id) {
    if (!confirm('Удалить это дело?')) return;
    await api('DELETE', `/api/content/cases/item/${id}`);
    await loadAllContent();
    renderCases();
    toast('Дело удалено', 'success');
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function renderContact() {
    const ct = content.contact || {};
    setVal('ct-tag', ct.tag);
    setVal('ct-title', ct.title);
    setVal('ct-subtitle', ct.subtitle);
    setVal('ct-phone', ct.phone);
    setVal('ct-email', ct.email);
    renderDebtOptions(ct.debtOptions || []);
}

function renderDebtOptions(opts) {
    const list = document.getElementById('debt-options-list');
    if (!list) return;
    list.innerHTML = opts.map((opt, i) => `
        <div class="debt-option-row">
            <input type="text" class="form-control" value="${esc(opt)}" id="debt-opt-${i}">
            <button class="btn btn-danger btn-sm btn-icon" onclick="removeDebtOption(${i})">×</button>
        </div>`).join('');
}

function addDebtOption() {
    const opts = getDebtOptions();
    opts.push('Новый вариант');
    renderDebtOptions(opts);
}

function removeDebtOption(i) {
    const opts = getDebtOptions();
    opts.splice(i, 1);
    renderDebtOptions(opts);
}

function getDebtOptions() {
    const opts = [];
    let i = 0;
    while (document.getElementById(`debt-opt-${i}`)) {
        opts.push(document.getElementById(`debt-opt-${i}`).value);
        i++;
    }
    return opts;
}

async function saveContact() {
    const data = {
        tag: getVal('ct-tag'),
        title: getVal('ct-title'),
        subtitle: getVal('ct-subtitle'),
        phone: getVal('ct-phone'),
        email: getVal('ct-email'),
        debtOptions: getDebtOptions()
    };
    await api('PUT', '/api/content/contact', data);
    content.contact = data;
    toast('Контакт сохранён', 'success');
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function renderFooter() {
    const ft = content.footer || {};
    setVal('ft-desc', ft.description);
    setVal('ft-copyright', ft.copyright);
    setVal('ft-viber', ft.viber);
    setVal('ft-whatsapp', ft.whatsapp);
    setVal('ft-telegram', ft.telegram);
}

async function saveFooter() {
    const data = {
        description: getVal('ft-desc'),
        copyright: getVal('ft-copyright'),
        viber: getVal('ft-viber'),
        whatsapp: getVal('ft-whatsapp'),
        telegram: getVal('ft-telegram')
    };
    await api('PUT', '/api/content/footer', data);
    content.footer = data;
    toast('Футер сохранён', 'success');
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
async function loadGallery() {
    const images = await api('GET', '/api/uploads');
    renderGalleryGrid('gallery-grid', images, true);
}

function renderGalleryGrid(containerId, images, allowDelete) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    if (!images.length) {
        grid.innerHTML = '<p class="gallery-no-images">Нет изображений</p>';
        return;
    }
    grid.innerHTML = images.map(img => `
        <div class="gallery-item" data-url="${esc(img.url)}">
            <img src="${esc(img.url)}" alt="${esc(img.name)}" loading="lazy">
            ${allowDelete ? `
            <div class="gallery-item-actions">
                <button class="gallery-btn gallery-btn-delete" onclick="deleteUpload(event,'${esc(img.name)}')" title="Удалить">✕</button>
            </div>` : ''}
        </div>`).join('');

    if (!allowDelete) {
        grid.querySelectorAll('.gallery-item').forEach(el => {
            el.addEventListener('click', () => {
                const url = el.dataset.url;
                if (imagePickerCallback) {
                    imagePickerCallback(url);
                    closeImagePicker();
                }
            });
        });
    }
}

async function deleteUpload(e, filename) {
    e.stopPropagation();
    if (!confirm('Удалить изображение?')) return;
    await api('DELETE', `/api/uploads/${encodeURIComponent(filename)}`);
    loadGallery();
    toast('Изображение удалено', 'success');
}

async function handleFileUpload(input) {
    if (!input.files[0]) return;
    await uploadImageFile(input.files[0]);
    input.value = '';
    loadGallery();
}

async function uploadImageFile(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/uploads', { method: 'POST', body: formData });
    const json = await res.json();
    if (!res.ok) { toast(json.error || 'Ошибка загрузки', 'error'); return null; }
    toast('Изображение загружено', 'success');
    return json.url;
}

// ─── Image Picker ─────────────────────────────────────────────────────────────
async function openImagePicker(inputId, previewId) {
    imagePickerCallback = (url) => {
        const inp = document.getElementById(inputId);
        if (inp) { inp.value = url; inp.dispatchEvent(new Event('input')); }
        if (previewId) updateImagePreview(inputId, previewId);
    };
    imagePickerPreviewId = previewId;

    const images = await api('GET', '/api/uploads');
    renderGalleryGrid('picker-gallery-grid', images, false);

    document.getElementById('image-picker-overlay').classList.add('open');
}

function closeImagePicker() {
    document.getElementById('image-picker-overlay').classList.remove('open');
    imagePickerCallback = null;
}

function closeImagePickerOnOverlay(e) {
    if (e.target === document.getElementById('image-picker-overlay')) closeImagePicker();
}

async function handlePickerUpload(input) {
    if (!input.files[0]) return;
    const url = await uploadImageFile(input.files[0]);
    input.value = '';
    if (url && imagePickerCallback) {
        imagePickerCallback(url);
        closeImagePicker();
    } else {
        const images = await api('GET', '/api/uploads');
        renderGalleryGrid('picker-gallery-grid', images, false);
    }
}

function updateImagePreview(inputId, previewId) {
    const inp = document.getElementById(inputId);
    const prev = document.getElementById(previewId);
    if (!inp || !prev) return;
    const url = inp.value.trim();
    if (url) {
        prev.src = url;
        prev.classList.add('visible');
    } else {
        prev.classList.remove('visible');
    }
}

// ─── Settings ─────────────────────────────────────────────────────────────────
async function changePassword() {
    const np = getVal('new-password');
    const cp = getVal('confirm-password');
    if (!np) { toast('Введите новый пароль', 'error'); return; }
    if (np !== cp) { toast('Пароли не совпадают', 'error'); return; }
    await api('POST', '/api/auth/change-password', { newPassword: np });
    setVal('new-password', '');
    setVal('confirm-password', '');
    toast('Пароль изменён', 'success');
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function openModal(title, bodyHtml, onSave) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('modal-footer').innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Отмена</button>
        <button class="btn btn-primary" id="modal-save-btn">Сохранить</button>`;
    document.getElementById('modal-save-btn').addEventListener('click', async () => {
        document.getElementById('modal-save-btn').disabled = true;
        try { await onSave(); closeModal(); }
        catch (e) { toast('Ошибка: ' + (e.message || 'Неизвестная ошибка'), 'error'); }
        finally { const btn = document.getElementById('modal-save-btn'); if (btn) btn.disabled = false; }
    });
    document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
}

function closeModalOnOverlay(e) {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function toast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span style="font-size:16px">${type === 'success' ? '✓' : type === 'error' ? '✕' : '!'}</span><span>${esc(message)}</span>`;
    container.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 300);
    }, 3500);
}

// ─── API helper ───────────────────────────────────────────────────────────────
async function api(method, url, body) {
    const opts = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(url, opts);
    let json;
    try { json = await res.json(); } catch { json = {}; }
    if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
    return json;
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
}

function esc(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatDate(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
               d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } catch { return iso || '—'; }
}
