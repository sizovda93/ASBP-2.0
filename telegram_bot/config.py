from __future__ import annotations

import os
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass(slots=True)
class Config:
    bot_token: str
    admin_chat_id: int
    academy_url: str
    platform_url: str
    platform_site_url: str
    webhook_base_url: str | None
    webhook_path: str
    webhook_host: str
    webhook_port: int



def load_config() -> Config:
    load_dotenv()

    bot_token = os.getenv("BOT_TOKEN", "").strip()
    admin_chat_id_raw = os.getenv("ADMIN_CHAT_ID", "").strip()
    academy_url = os.getenv("ACADEMY_URL", "http://bankrot.academy/").strip()
    platform_url = os.getenv("PLATFORM_URL", "https://sau.pro/").strip()
    platform_site_url = os.getenv("PLATFORM_SITE_URL", "#").strip()

    webhook_base_url = os.getenv("WEBHOOK_BASE_URL", "").strip() or None
    webhook_path = os.getenv("WEBHOOK_PATH", "/webhook").strip() or "/webhook"
    webhook_host = os.getenv("WEBHOOK_HOST", "0.0.0.0").strip() or "0.0.0.0"
    webhook_port = int(os.getenv("WEBHOOK_PORT", "8088").strip())

    if not bot_token:
        raise ValueError("BOT_TOKEN is required")
    if not admin_chat_id_raw:
        raise ValueError("ADMIN_CHAT_ID is required")

    try:
        admin_chat_id = int(admin_chat_id_raw)
    except ValueError as exc:
        raise ValueError("ADMIN_CHAT_ID must be an integer") from exc

    return Config(
        bot_token=bot_token,
        admin_chat_id=admin_chat_id,
        academy_url=academy_url,
        platform_url=platform_url,
        platform_site_url=platform_site_url,
        webhook_base_url=webhook_base_url,
        webhook_path=webhook_path,
        webhook_host=webhook_host,
        webhook_port=webhook_port,
    )
