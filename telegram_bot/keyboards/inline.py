from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup


def academy_link_kb(url: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="Открыть Академию", url=url)]],
    )


def platform_site_link_kb(url: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="Перейти на сайт платформы", url=url)]],
    )


def platform_login_link_kb(url: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="Войти в платформу", url=url)]],
    )
