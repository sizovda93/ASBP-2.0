from __future__ import annotations

from html import escape

from aiogram import Bot


async def send_form_to_admin(
    bot: Bot,
    admin_chat_id: int,
    title: str,
    fields: list[tuple[str, str]],
) -> None:
    lines = [f"<b>{escape(title)}</b>", ""]

    for key, value in fields:
        lines.append(f"<b>{escape(key)}:</b> {escape(value)}")

    lines.extend(["", "Источник: Telegram-бот АСПБ"])

    await bot.send_message(
        chat_id=admin_chat_id,
        text="\n".join(lines),
        disable_web_page_preview=True,
    )
