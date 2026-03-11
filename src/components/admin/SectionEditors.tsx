import { useState, useEffect } from 'react';
import { api, type SiteSettings } from '../../lib/api';
import { toast } from './shared';

interface Props {
  settings: SiteSettings;
  onRefresh: () => void;
}

export default function SectionEditors({ settings, onRefresh }: Props) {
  return null; // This is used as a namespace, actual editors are below
}

// ─── Top Bar Editor ───────────────────────────────────────
export function TopBarEditor({ settings, onRefresh }: Props) {
  const [text, setText] = useState(settings.topbar_text || '');
  const [phone, setPhone] = useState(settings.topbar_phone || '');
  const [viber, setViber] = useState(settings.topbar_viber || '');
  const [whatsapp, setWhatsapp] = useState(settings.topbar_whatsapp || '');
  const [telegram, setTelegram] = useState(settings.topbar_telegram || '');

  useEffect(() => {
    setText(settings.topbar_text || '');
    setPhone(settings.topbar_phone || '');
    setViber(settings.topbar_viber || '');
    setWhatsapp(settings.topbar_whatsapp || '');
    setTelegram(settings.topbar_telegram || '');
  }, [settings]);

  async function save() {
    await api.settings.bulkUpdate({
      topbar_text: text, topbar_phone: phone,
      topbar_viber: viber, topbar_whatsapp: whatsapp, topbar_telegram: telegram,
    });
    onRefresh();
    toast('Верхняя строка сохранена');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Верхняя строка</div></div>
      <div className="card">
        <div className="card-title">Настройки верхней строки</div>
        <div className="form-group">
          <label>Текст-слоган</label>
          <input className="form-control" value={text} onChange={e => setText(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Телефон горячей линии</label>
          <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Ссылка Viber</label>
            <input className="form-control" value={viber} onChange={e => setViber(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Ссылка WhatsApp</label>
            <input className="form-control" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Ссылка Telegram</label>
          <input className="form-control" value={telegram} onChange={e => setTelegram(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={save}>Сохранить</button>
      </div>
    </div>
  );
}

// ─── Nav Editor ───────────────────────────────────────────
export function NavEditor({ settings, onRefresh }: Props) {
  const [logo, setLogo] = useState(settings.nav_logo || '');
  const [ctaText, setCtaText] = useState(settings.nav_cta_text || '');
  const [ctaHref, setCtaHref] = useState(settings.nav_cta_href || '');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setLogo(settings.nav_logo || '');
    setCtaText(settings.nav_cta_text || '');
    setCtaHref(settings.nav_cta_href || '');
    try { setItems(JSON.parse(settings.nav_items || '[]')); } catch { setItems([]); }
  }, [settings]);

  function updateItem(idx: number, field: string, value: string) {
    const copy = [...items];
    copy[idx] = { ...copy[idx], [field]: value };
    setItems(copy);
  }

  function updateDropdown(idx: number, di: number, field: string, value: string) {
    const copy = [...items];
    const dd = [...(copy[idx].dropdown || [])];
    dd[di] = { ...dd[di], [field]: value };
    copy[idx] = { ...copy[idx], dropdown: dd };
    setItems(copy);
  }

  function addItem() {
    setItems([...items, { id: Date.now(), title: 'Новый пункт', href: '#', dropdown: [] }]);
  }

  function removeItem(idx: number) {
    setItems(items.filter((_, i) => i !== idx));
  }

  function addDropdown(idx: number) {
    const copy = [...items];
    copy[idx] = { ...copy[idx], dropdown: [...(copy[idx].dropdown || []), { title: 'Подпункт', href: '#' }] };
    setItems(copy);
  }

  function removeDropdown(idx: number, di: number) {
    const copy = [...items];
    copy[idx] = { ...copy[idx], dropdown: copy[idx].dropdown.filter((_: any, i: number) => i !== di) };
    setItems(copy);
  }

  async function save() {
    await api.settings.bulkUpdate({
      nav_logo: logo, nav_cta_text: ctaText, nav_cta_href: ctaHref,
      nav_items: JSON.stringify(items),
    });
    onRefresh();
    toast('Навигация сохранена');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Навигация</div></div>
      <div className="card">
        <div className="card-title">Шапка сайта</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Логотип (текст)</label>
            <input className="form-control" value={logo} onChange={e => setLogo(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Кнопка CTA (текст)</label>
            <input className="form-control" value={ctaText} onChange={e => setCtaText(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Кнопка CTA (ссылка)</label>
          <input className="form-control" value={ctaHref} onChange={e => setCtaHref(e.target.value)} />
        </div>
      </div>
      <div className="card">
        <div className="card-title">
          Пункты меню
          <button className="btn btn-accent btn-sm" onClick={addItem}>+ Добавить</button>
        </div>
        <div className="nav-items-list">
          {items.map((item, idx) => (
            <div key={idx} className="nav-item-row">
              <div className="nav-item-top">
                <input className="form-control" value={item.title} onChange={e => updateItem(idx, 'title', e.target.value)} placeholder="Название" />
                <input className="form-control" value={item.href} onChange={e => updateItem(idx, 'href', e.target.value)} placeholder="Ссылка" />
                <button className="btn btn-danger btn-icon btn-sm" onClick={() => removeItem(idx)}>×</button>
              </div>
              <div className="nav-dropdown-list">
                {(item.dropdown || []).map((dd: any, di: number) => (
                  <div key={di} className="nav-dd-row">
                    <input className="form-control" value={dd.title} onChange={e => updateDropdown(idx, di, 'title', e.target.value)} placeholder="Название" />
                    <input className="form-control" value={dd.href} onChange={e => updateDropdown(idx, di, 'href', e.target.value)} placeholder="Ссылка" />
                    <button className="btn btn-danger btn-icon btn-sm" onClick={() => removeDropdown(idx, di)}>×</button>
                  </div>
                ))}
                <button className="btn btn-secondary btn-sm" onClick={() => addDropdown(idx)} style={{ marginTop: '6px' }}>+ Подпункт</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={save}>Сохранить навигацию</button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Editor ──────────────────────────────────────────
interface HeroProps extends Props {
  onPickImage: (callback: (url: string) => void) => void;
}

export function HeroEditor({ settings, onRefresh, onPickImage }: HeroProps) {
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [btn1Text, setBtn1Text] = useState('');
  const [btn1Href, setBtn1Href] = useState('');
  const [btn2Text, setBtn2Text] = useState('');
  const [btn2Href, setBtn2Href] = useState('');
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    setLabel(settings.hero_label || '');
    setTitle(settings.hero_title || '');
    setSubtitle(settings.hero_subtitle || '');
    setBtn1Text(settings.hero_btn_primary || '');
    setBtn1Href(settings.hero_btn_primary_href || '');
    setBtn2Text(settings.hero_btn_secondary || '');
    setBtn2Href(settings.hero_btn_secondary_href || '');
    setBgImage(settings.hero_background_image || '');
  }, [settings]);

  async function save() {
    await api.settings.bulkUpdate({
      hero_label: label, hero_title: title, hero_subtitle: subtitle,
      hero_btn_primary: btn1Text, hero_btn_primary_href: btn1Href,
      hero_btn_secondary: btn2Text, hero_btn_secondary_href: btn2Href,
      hero_background_image: bgImage,
    });
    onRefresh();
    toast('Баннер сохранён');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Герой (баннер)</div></div>
      <div className="card">
        <div className="card-title">Основной баннер</div>
        <div className="form-group">
          <label>Подпись над заголовком</label>
          <input className="form-control" value={label} onChange={e => setLabel(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Заголовок (Enter для переноса строки)</label>
          <textarea className="form-control" rows={3} value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Подзаголовок</label>
          <textarea className="form-control" rows={3} value={subtitle} onChange={e => setSubtitle(e.target.value)} />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Кнопка 1 (текст)</label>
            <input className="form-control" value={btn1Text} onChange={e => setBtn1Text(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Кнопка 1 (ссылка)</label>
            <input className="form-control" value={btn1Href} onChange={e => setBtn1Href(e.target.value)} />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Кнопка 2 (текст)</label>
            <input className="form-control" value={btn2Text} onChange={e => setBtn2Text(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Кнопка 2 (ссылка)</label>
            <input className="form-control" value={btn2Href} onChange={e => setBtn2Href(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Фоновое изображение</label>
          <div className="image-input-group">
            <input className="form-control" value={bgImage} onChange={e => setBgImage(e.target.value)} placeholder="URL или выберите из галереи" />
            {bgImage && <img src={bgImage} alt="" className="image-preview visible" />}
            <button className="btn btn-secondary" onClick={() => onPickImage(setBgImage)}>Выбрать</button>
          </div>
        </div>
        <button className="btn btn-primary" onClick={save}>Сохранить</button>
      </div>
    </div>
  );
}

// ─── Contact Editor ───────────────────────────────────────
export function ContactEditor({ settings, onRefresh }: Props) {
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [debtOptions, setDebtOptions] = useState<string[]>([]);

  useEffect(() => {
    setTag(settings.contact_tag || '');
    setTitle(settings.contact_title || '');
    setSubtitle(settings.contact_subtitle || '');
    setPhone(settings.contact_phone || '');
    setEmail(settings.contact_email || '');
    try { setDebtOptions(JSON.parse(settings.contact_debt_options || '[]')); } catch { setDebtOptions([]); }
  }, [settings]);

  async function save() {
    await api.settings.bulkUpdate({
      contact_tag: tag, contact_title: title, contact_subtitle: subtitle,
      contact_phone: phone, contact_email: email,
      contact_debt_options: JSON.stringify(debtOptions),
    });
    onRefresh();
    toast('Контакт сохранён');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Форма обратной связи</div></div>
      <div className="card">
        <div className="card-title">Контактная секция</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Тег</label>
            <input className="form-control" value={tag} onChange={e => setTag(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Заголовок</label>
            <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Описание</label>
          <textarea className="form-control" rows={2} value={subtitle} onChange={e => setSubtitle(e.target.value)} />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Телефон</label>
            <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Варианты суммы долга в форме</label>
          {debtOptions.map((opt, i) => (
            <div key={i} className="debt-option-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input className="form-control" value={opt} onChange={e => {
                const copy = [...debtOptions]; copy[i] = e.target.value; setDebtOptions(copy);
              }} />
              <button className="btn btn-danger btn-sm btn-icon" onClick={() => setDebtOptions(debtOptions.filter((_, j) => j !== i))}>×</button>
            </div>
          ))}
          <button className="btn btn-secondary btn-sm" onClick={() => setDebtOptions([...debtOptions, 'Новый вариант'])}>+ Вариант</button>
        </div>
        <button className="btn btn-primary" onClick={save}>Сохранить</button>
      </div>
    </div>
  );
}

// ─── Footer Editor ────────────────────────────────────────
export function FooterEditor({ settings, onRefresh }: Props) {
  const [desc, setDesc] = useState('');
  const [copyright, setCopyright] = useState('');
  const [viber, setViber] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');

  useEffect(() => {
    setDesc(settings.footer_description || '');
    setCopyright(settings.footer_copyright || '');
    setViber(settings.footer_viber || '');
    setWhatsapp(settings.footer_whatsapp || '');
    setTelegram(settings.footer_telegram || '');
  }, [settings]);

  async function save() {
    await api.settings.bulkUpdate({
      footer_description: desc, footer_copyright: copyright,
      footer_viber: viber, footer_whatsapp: whatsapp, footer_telegram: telegram,
    });
    onRefresh();
    toast('Футер сохранён');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Футер</div></div>
      <div className="card">
        <div className="card-title">Нижняя часть сайта</div>
        <div className="form-group">
          <label>Описание компании</label>
          <textarea className="form-control" rows={2} value={desc} onChange={e => setDesc(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Строка копирайта</label>
          <input className="form-control" value={copyright} onChange={e => setCopyright(e.target.value)} />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Ссылка Viber</label>
            <input className="form-control" value={viber} onChange={e => setViber(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Ссылка WhatsApp</label>
            <input className="form-control" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Ссылка Telegram</label>
          <input className="form-control" value={telegram} onChange={e => setTelegram(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={save}>Сохранить</button>
      </div>
    </div>
  );
}
