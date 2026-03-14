from aiogram import F, Router
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from keyboards.reply import BTN_BACK_TO_MENU, BTN_CANCEL, BTN_MENU, main_menu_kb
from utils.texts import CANCELLED_TEXT, WELCOME_TEXT


router = Router(name="forms_control")


@router.message(Command("cancel"), StateFilter("*"))
@router.message(F.text == BTN_CANCEL, StateFilter("*"))
async def cancel_any_form(message: Message, state: FSMContext) -> None:
    current_state = await state.get_state()
    await state.clear()
    if current_state:
        await message.answer(CANCELLED_TEXT, reply_markup=main_menu_kb())
    else:
        await message.answer(WELCOME_TEXT, reply_markup=main_menu_kb())


@router.message(F.text.in_({BTN_MENU, BTN_BACK_TO_MENU}), StateFilter("*"))
async def return_to_menu(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(WELCOME_TEXT, reply_markup=main_menu_kb())
