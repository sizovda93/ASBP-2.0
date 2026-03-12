-- ==========================================
-- ASPB Site Seed Data
-- ==========================================

-- Top Bar settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('topbar_text', 'Банкротство физических и юридических лиц в любом городе России с гарантией результата'),
  ('topbar_phone', '8 800 222 33 64'),
  ('topbar_viber', '#'),
  ('topbar_whatsapp', '#'),
  ('topbar_telegram', '#')
ON CONFLICT (setting_key) DO NOTHING;

-- Navigation settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('nav_logo', 'АСПБ'),
  ('nav_cta_text', 'Связаться'),
  ('nav_cta_href', '#contact'),
  ('nav_items', '[{"id":1,"title":"Услуги для партнёров","href":"#","dropdown":[{"title":"Помощь партнёрам","href":"#"},{"title":"Обучение для партнёров","href":"#"}]},{"id":2,"title":"У Вас долги?","href":"#","dropdown":[]},{"id":3,"title":"О нас","href":"#","dropdown":[{"title":"Истории клиентов","href":"#"},{"title":"Вопросы - ответы","href":"#"}]},{"id":4,"title":"Выигранные дела","href":"#cases","dropdown":[]},{"id":5,"title":"Стоимость","href":"#","dropdown":[]},{"id":6,"title":"Отзывы","href":"#","dropdown":[]}]')
ON CONFLICT (setting_key) DO NOTHING;

-- Hero settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('hero_label', 'Система управления делами'),
  ('hero_title', E'Нужен арбитражный\nуправляющий\nдля банкротства?'),
  ('hero_subtitle', 'Мы помогаем юристам заключать больше договоров по банкротству физических лиц и предоставляем лучшие условия по арбитражному управлению клиентов.'),
  ('hero_btn_primary', 'Узнать условия партнерства'),
  ('hero_btn_primary_href', '#contact'),
  ('hero_btn_secondary', 'Смотреть практику'),
  ('hero_btn_secondary_href', '#cases'),
  ('hero_background_image', '')
ON CONFLICT (setting_key) DO NOTHING;

-- Sections headers
INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('services_tag', 'Экспертиза'),
  ('services_title', 'Чем мы занимаемся?'),
  ('cases_tag', 'Судебная практика'),
  ('cases_title', 'Выигранные дела')
ON CONFLICT (setting_key) DO NOTHING;

-- Contact settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('contact_tag', 'Инициация процесса'),
  ('contact_title', 'Начните работу с нами'),
  ('contact_subtitle', 'Оставьте заявку, и наш ведущий арбитражный управляющий свяжется с вами для первичного анализа ситуации.'),
  ('contact_phone', '8 800 222 33 64'),
  ('contact_email', 'info@aspb.pro'),
  ('contact_debt_options', '["От 500 тыс. до 1 млн руб.","От 1 млн до 5 млн руб.","Более 5 млн руб."]')
ON CONFLICT (setting_key) DO NOTHING;

-- Footer settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('footer_description', 'Банкротство физических и юридических лиц в любом городе России с гарантией результата.'),
  ('footer_copyright', '© 2026 АСПБ. Все права защищены.'),
  ('footer_viber', '#'),
  ('footer_whatsapp', '#'),
  ('footer_telegram', '#')
ON CONFLICT (setting_key) DO NOTHING;

-- Stats
INSERT INTO stats (label, value, unit, badge, display_order) VALUES
  ('Успешно завершено дел', '12.7', 'K', '+850 в этом году', 1),
  ('Списано долгов', '4.5', 'Млрд ₽', 'Подтверждено судом', 2),
  ('Регионов присутствия', '85', 'РФ', 'По всей России', 3),
  ('Гарантия результата', '100', '%', 'Системный контроль', 4);

-- Services
INSERT INTO services (title, description, icon, image_url, display_order) VALUES
  ('Банкротство физ. лиц', 'Полное сопровождение процедуры списания долгов граждан с защитой имущества от взыскания.', 'shield', '', 1),
  ('Для юридических лиц', 'Законная ликвидация предприятий с долгами, защита субсидиарной ответственности руководителей.', 'box', '', 2),
  ('Партнерская программа', 'Специальные условия для юристов: передайте арбитражное управление нам и зарабатывайте больше.', 'users', '', 3);

-- Cases
INSERT INTO cases (case_number, status, amount, description, card_size, accent, display_order) VALUES
  ('Дело № А40-123456/2023', 'Завершено успешно', '14 500 000 ₽', 'Сложное дело с ипотечным жильем. Удалось сохранить единственное жилье и списать все потребительские кредиты.', 'large', false, 1),
  ('№ А56-7890/22', '', '3 200 000 ₽', 'Освобождение от долгов физического лица за 6 месяцев.', 'small', false, 2),
  ('№ А33-1122/23', '', '8 900 000 ₽', 'Банкротство ИП с защитой личного имущества.', 'small', false, 3),
  ('Дело № А12-334455/2023', 'Завершено успешно', '45 000 000 ₽', 'Защита от субсидиарной ответственности директора компании при банкротстве юридического лица.', 'large', true, 4);
