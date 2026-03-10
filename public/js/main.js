// ─── Legal modals ─────────────────────────────────────────────────────────────
const LEGAL_CONTENT = {
    privacy: {
        title: 'Политика конфиденциальности',
        body: `
<h3>1. Общие положения</h3>
<p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о физических лицах, пользующихся услугами сайта АСПБ (далее — «Сайт»). Использование Сайта означает безоговорочное согласие пользователя с настоящей Политикой.</p>

<h3>2. Состав собираемой информации</h3>
<p>В рамках работы Сайта могут собираться следующие данные:</p>
<ul>
    <li>Имя и контактный телефон, указанные в форме обратной связи;</li>
    <li>Сведения о сумме задолженности (в обезличенном формате);</li>
    <li>Технические данные: IP-адрес, тип браузера, реферальный URL (cookies).</li>
</ul>

<h3>3. Цели обработки информации</h3>
<p>Собранные данные используются исключительно для:</p>
<ul>
    <li>Обработки заявок и связи с пользователем;</li>
    <li>Улучшения качества работы Сайта;</li>
    <li>Аналитики посещаемости (в агрегированном, обезличенном виде).</li>
</ul>

<h3>4. Защита информации</h3>
<p>Компания принимает необходимые технические и организационные меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>

<h3>5. Передача данных третьим лицам</h3>
<p>Персональные данные пользователей не передаются третьим лицам, за исключением случаев, прямо предусмотренных законодательством Российской Федерации.</p>

<h3>6. Изменение политики</h3>
<p>Компания оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на данной странице.</p>

<h3>7. Контакты</h3>
<p>По вопросам, связанным с обработкой персональных данных, обращайтесь по адресу: <a href="mailto:info@aspb.pro">info@aspb.pro</a></p>`
    },
    pd: {
        title: 'Обработка персональных данных',
        body: `
<h3>1. Оператор персональных данных</h3>
<p>Оператором персональных данных является АСПБ. Настоящее уведомление составлено в соответствии с требованиями Федерального закона № 152-ФЗ «О персональных данных».</p>

<h3>2. Правовые основания обработки</h3>
<p>Обработка персональных данных осуществляется на основании:</p>
<ul>
    <li>Согласия субъекта персональных данных (ст. 9 ФЗ-152);</li>
    <li>Исполнения договора, стороной которого является субъект ПД;</li>
    <li>Законных интересов оператора, не нарушающих права субъекта ПД.</li>
</ul>

<h3>3. Перечень обрабатываемых данных</h3>
<ul>
    <li>Фамилия, имя (при указании в форме);</li>
    <li>Номер телефона;</li>
    <li>Иные данные, добровольно предоставленные пользователем.</li>
</ul>

<h3>4. Сроки обработки</h3>
<p>Персональные данные обрабатываются в течение срока, необходимого для достижения целей обработки, либо до момента отзыва согласия субъектом ПД.</p>

<h3>5. Права субъекта персональных данных</h3>
<p>Пользователь имеет право:</p>
<ul>
    <li>Получить доступ к своим персональным данным;</li>
    <li>Потребовать уточнения, блокирования или уничтожения ПД;</li>
    <li>Отозвать своё согласие на обработку ПД в любой момент;</li>
    <li>Обратиться с жалобой в Роскомнадзор.</li>
</ul>

<h3>6. Отзыв согласия</h3>
<p>Для отзыва согласия на обработку персональных данных направьте письменное заявление на адрес: <a href="mailto:info@aspb.pro">info@aspb.pro</a></p>`
    },
    cookies: {
        title: 'Политика использования Cookies',
        body: `
<h3>Что такое cookies?</h3>
<p>Cookies — это небольшие текстовые файлы, которые сохраняются в браузере при посещении сайта. Они помогают Сайту запоминать ваши предпочтения и улучшать работу сервиса.</p>

<h3>Какие cookies мы используем?</h3>
<ul>
    <li><strong>Технические (необходимые)</strong> — обеспечивают базовое функционирование Сайта: навигацию и доступ к защищённым разделам. Без них Сайт не сможет работать корректно.</li>
    <li><strong>Аналитические</strong> — позволяют нам понять, как посетители взаимодействуют с Сайтом: какие страницы просматриваются и откуда пришёл пользователь. Данные собираются в анонимном виде.</li>
    <li><strong>Функциональные</strong> — запоминают ваши предпочтения для улучшения удобства использования.</li>
</ul>

<h3>Как управлять cookies?</h3>
<p>Вы можете отключить cookies в настройках вашего браузера. Обратите внимание, что отключение технических cookies может повлиять на работу некоторых функций Сайта.</p>
<p>Большинство браузеров предлагают инструменты для управления cookies в меню «Настройки» → «Конфиденциальность».</p>

<h3>Согласие</h3>
<p>Продолжая использовать наш Сайт, вы соглашаетесь с использованием cookies в соответствии с настоящей Политикой. Если вы не согласны — пожалуйста, отключите cookies в браузере или покиньте Сайт.</p>

<h3>Контакты</h3>
<p>По вопросам использования cookies обращайтесь: <a href="mailto:info@aspb.pro">info@aspb.pro</a></p>`
    }
};

function openLegal(type) {
    const doc = LEGAL_CONTENT[type];
    if (!doc) return;
    document.getElementById('legal-modal-title').textContent = doc.title;
    document.getElementById('legal-modal-body').innerHTML = doc.body;
    document.getElementById('legal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLegal(e) {
    if (e && e.target !== document.getElementById('legal-overlay')) return;
    document.getElementById('legal-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('legal-overlay').classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ─── Icon SVGs ───────────────────────────────────────────────────────────────
const ICONS = {
    shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    box:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`,
    users:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    scale:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    chart:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    doc:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
    star:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
};

function getIcon(name) {
    return ICONS[name] || ICONS.shield;
}

// ─── Render page ─────────────────────────────────────────────────────────────
function renderPage(c) {
    // Top bar
    setText('topbar-text', c.topBar.text);
    const phone = c.topBar.phone;
    const phoneEl = document.getElementById('topbar-phone');
    if (phoneEl) { phoneEl.textContent = phone; phoneEl.href = 'tel:' + phone.replace(/\D/g, ''); }
    setHref('topbar-viber', c.topBar.viber);
    setHref('topbar-whatsapp', c.topBar.whatsapp);
    setHref('topbar-telegram', c.topBar.telegram);

    // Nav
    setText('nav-logo', c.nav.logo);
    const cta = document.getElementById('nav-cta');
    if (cta) { cta.textContent = c.nav.ctaText || 'Связаться'; cta.href = c.nav.ctaHref || '#contact'; }
    renderNav(c.nav.items || []);

    // Hero
    setText('hero-label', c.hero.label);
    const titleEl = document.getElementById('hero-title');
    if (titleEl) titleEl.innerHTML = escapeHtml(c.hero.title).replace(/\n/g, '<br>');
    setText('hero-subtitle', c.hero.subtitle);
    setLink('hero-btn-primary', c.hero.btnPrimary, c.hero.btnPrimaryHref || '#contact');
    setLink('hero-btn-secondary', c.hero.btnSecondary, c.hero.btnSecondaryHref || '#cases');

    const heroInner = document.getElementById('hero-inner');
    if (heroInner && c.hero.backgroundImage) {
        heroInner.style.backgroundImage = `url(${c.hero.backgroundImage})`;
        heroInner.classList.add('has-bg');
    }

    // Stats
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = (c.stats || []).map(s => `
            <div class="stat-card">
                <span class="stat-label">${escapeHtml(s.label)}</span>
                <div class="stat-value">${escapeHtml(s.value)}<span class="stat-unit">${escapeHtml(s.unit)}</span></div>
                ${s.badge ? `<div class="badge" style="margin-top:16px;">${escapeHtml(s.badge)}</div>` : ''}
            </div>`).join('');
    }

    // Services section header
    setText('services-tag', (c.servicesSection || {}).tag || 'Экспертиза');
    setText('services-title', (c.servicesSection || {}).title || 'Чем мы занимаемся?');

    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        servicesGrid.innerHTML = (c.services || []).map(s => `
            <div class="service-card">
                ${s.image ? `<img src="${s.image}" alt="${escapeHtml(s.title)}" class="service-card-img">` : ''}
                <div class="service-icon">${getIcon(s.icon)}</div>
                <h3 class="service-title">${escapeHtml(s.title)}</h3>
                <p class="service-desc">${escapeHtml(s.description)}</p>
            </div>`).join('');
    }

    // Cases section header
    setText('cases-tag', (c.casesSection || {}).tag || 'Судебная практика');
    setText('cases-title', (c.casesSection || {}).title || 'Выигранные дела');

    const casesGrid = document.getElementById('cases-grid');
    if (casesGrid) {
        casesGrid.innerHTML = (c.cases || []).map(ca => `
            <div class="case-card ${ca.size}${ca.accent ? ' accent' : ''}">
                <div class="case-meta">
                    <span class="case-number">${escapeHtml(ca.number)}</span>
                    ${ca.status ? `<span class="case-status">${escapeHtml(ca.status)}</span>` : ''}
                </div>
                <div>
                    ${ca.size === 'large' ? '<span class="stat-label">Списана сумма</span>' : ''}
                    <div class="case-amount" style="${ca.size === 'small' ? 'font-size:24px;' : ''}">${escapeHtml(ca.amount)}</div>
                    <p class="case-desc">${escapeHtml(ca.description)}</p>
                </div>
            </div>`).join('');
    }

    // Contact
    setText('contact-tag', c.contact.tag);
    setText('contact-title', c.contact.title);
    setText('contact-subtitle', c.contact.subtitle);
    setText('contact-phone-display', c.contact.phone);
    setText('contact-email-display', c.contact.email);

    const debtSelect = document.getElementById('contact-debt-select');
    if (debtSelect) {
        debtSelect.innerHTML = (c.contact.debtOptions || []).map(o => `<option>${escapeHtml(o)}</option>`).join('');
    }

    // Footer
    setText('footer-logo-text', c.nav.logo);
    setText('footer-desc', c.footer.description);
    setText('footer-copyright', c.footer.copyright);
    setText('footer-phone', c.contact.phone);
    setText('footer-email', c.contact.email);
    setHref('footer-viber', c.footer.viber);
    setHref('footer-whatsapp', c.footer.whatsapp);
    setHref('footer-telegram', c.footer.telegram);
}

function renderNav(items) {
    const nav = document.getElementById('primary-nav');
    if (!nav) return;
    nav.innerHTML = items.map(item => {
        if (item.dropdown && item.dropdown.length) {
            return `<div class="nav-item">${escapeHtml(item.title)}<div class="dropdown">${item.dropdown.map(d => `<a href="${d.href}">${escapeHtml(d.title)}</a>`).join('')}</div></div>`;
        }
        return `<a href="${item.href}" class="nav-item">${escapeHtml(item.title)}</a>`;
    }).join('');
}

// ─── Contact form ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const phone = document.getElementById('contact-phone-input').value.trim();
            const debt = document.getElementById('contact-debt-select').value;

            if (!name || !phone) return;

            const btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Отправка...';

            try {
                const res = await fetch('/api/submissions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, debt })
                });
                if (res.ok) {
                    form.innerHTML = `<div class="form-success">✓ Заявка принята! Мы свяжемся с вами в ближайшее время.</div>`;
                } else {
                    btn.disabled = false;
                    btn.textContent = 'Оставить заявку';
                    alert('Ошибка при отправке. Попробуйте ещё раз.');
                }
            } catch {
                btn.disabled = false;
                btn.textContent = 'Оставить заявку';
                alert('Ошибка соединения. Попробуйте ещё раз.');
            }
        });
    }
});

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text || '';
}

function setLink(id, text, href) {
    const el = document.getElementById(id);
    if (el) { el.textContent = text || ''; el.href = href || '#'; }
}

function setHref(id, href) {
    const el = document.getElementById(id);
    if (el) el.href = href || '#';
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ─── Init ─────────────────────────────────────────────────────────────────────
(async () => {
    try {
        const res = await fetch('/api/content');
        const content = await res.json();
        renderPage(content);
    } catch (err) {
        console.error('Не удалось загрузить контент:', err);
    }
    initReveal();
})();
