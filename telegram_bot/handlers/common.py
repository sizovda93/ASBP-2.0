from aiogram import F, Router
from aiogram.filters import StateFilter
from aiogram.types import Message

from keyboards.reply import main_menu_kb
from utils.texts import SOFT_FALLBACK_TEXT


router = Router(name="common")


@router.message(StateFilter(None), F.text)
async def unknown_message(message: Message) -> None:
    if (message.text or "").startswith("/"):
        return
    await message.answer(SOFT_FALLBACK_TEXT, reply_markup=main_menu_kb())
