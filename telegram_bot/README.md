# Telegram Bot ASPB (aiogram 3)

## Возможности
- Кнопочное главное меню: партнерство, обучение, платформа, задать вопрос.
- FSM-анкеты:
  - Партнерство
  - Передача дела
  - Обратный звонок
  - Обучение
  - Демо платформы
- Команды: `/start`, `/menu`, `/help`, `/cancel`.
- Отправка всех заявок админу в Telegram (`ADMIN_CHAT_ID`) без БД.
- Поддержка `webhook` (рекомендуется для сервера) и fallback в `polling`.

## Быстрый старт
1. Установите Python 3.11+
2. Создайте виртуальное окружение:
   ```bash
   cd telegram_bot
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Установите зависимости:
   ```bash
   pip install -r requirements.txt
   ```
4. Создайте `.env`:
   ```bash
   cp .env.example .env
   ```
5. Заполните `.env`:
   - `BOT_TOKEN`
   - `ADMIN_CHAT_ID`
   - `ACADEMY_URL`
   - `PLATFORM_URL`
   - `PLATFORM_SITE_URL`
   - для webhook: `WEBHOOK_BASE_URL`, `WEBHOOK_PATH`, `WEBHOOK_HOST`, `WEBHOOK_PORT`

## Запуск
### Webhook (рекомендуется)
В `.env` задайте:
- `WEBHOOK_BASE_URL=https://your-domain.com`
- `WEBHOOK_PATH=/webhook`
- `WEBHOOK_HOST=0.0.0.0`
- `WEBHOOK_PORT=8088`

Запуск:
```bash
python bot.py
```

### Polling (если webhook не настроен)
Просто не указывайте `WEBHOOK_BASE_URL` в `.env`:
```bash
python bot.py
```

## Пример systemd сервиса
```ini
[Unit]
Description=ASPB Telegram Bot
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/asbp/telegram_bot
ExecStart=/opt/asbp/telegram_bot/.venv/bin/python /opt/asbp/telegram_bot/bot.py
Restart=always
RestartSec=3
User=root
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```

## Nginx для webhook
```nginx
location /webhook {
    proxy_pass http://127.0.0.1:8088/webhook;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

После настройки Nginx и SSL перезапустите бота.
