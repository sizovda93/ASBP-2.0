from __future__ import annotations

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from config import Config
from keyboards.inline import platform_login_link_kb, platform_site_link_kb
from keyboards.reply import (
    BTN_BACK,
    BTN_BACK_TO_MENU,
    BTN_MENU,
    BTN_PLATFORM,
    BTN_PLATFORM_BENEFITS,
    BTN_PLATFORM_DEMO,
    BTN_PLATFORM_LOGIN,
    BTN_PLATFORM_SITE,
    cancel_kb,
    main_menu_kb,
    platform_menu_kb,
    success_kb,
)
from states.forms import DemoRequestForm
from utils.notify_admin import send_form_to_admin
from utils.texts import (
    PLATFORM_BENEFITS_TEXT,
    PLATFORM_BRANCH_TEXT,
    PLATFORM_DEMO_SUCCESS_TEXT,
    PLATFORM_LOGIN_TEXT,
    PLATFORM_SITE_TEXT,
    SOFT_FALLBACK_TEXT,
)
from utils.validators import is_nonempty, normalize_phone


router = Router(name="platform")


@router.message(F.text == BTN_PLATFORM)
async def open_platform_branch(message: Message) -> None:
    await message.answer(PLATFORM_BRANCH_TEXT, reply_markup=platform_menu_kb())


@router.message(F.text == BTN_PLATFORM_BENEFITS)
async def platform_benefits(message: Message) -> None:
    await message.answer(PLATFORM_BENEFITS_TEXT, reply_markup=platform_menu_kb())


@router.message(F.text == BTN_PLATFORM_SITE)
async def platform_site(message: Message, config: Config) -> None:
    await message.answer(PLATFORM_SITE_TEXT, reply_markup=platform_site_link_kb(config.platform_site_url))
    await message.answer("Выберите следующее действие:", reply_markup=platform_menu_kb())


@router.message(F.text == BTN_PLATFORM_LOGIN)
async def platform_login(message: Message, config: Config) -> None:
    await message.answer(PLATFORM_LOGIN_TEXT, reply_markup=platform_login_link_kb(config.platform_url))
    await message.answer("Выберите следующее действие:", reply_markup=platform_menu_kb())


async def start_demo_form(message: Message, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(DemoRequestForm.name)
    await message.answer("Укажите ваше имя:", reply_markup=cancel_kb())


@router.message(F.text == BTN_PLATFORM_DEMO)
async def platform_demo(message: Message, state: FSMContext) -> None:
    await start_demo_form(message, state)


@router.message(DemoRequestForm.name)
async def demo_name(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите имя текстом.")
        return
    await state.update_data(name=message.text.strip())
    await state.set_state(DemoRequestForm.city)
    await message.answer("Укажите ваш город:")


@router.message(DemoRequestForm.city)
async def demo_city(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите город текстом.")
        return
    await state.update_data(city=message.text.strip())
    await state.set_state(DemoRequestForm.phone)
    await message.answer("Укажите телефон (пример: +79991234567):")


@router.message(DemoRequestForm.phone)
async def demo_phone(message: Message, state: FSMContext) -> None:
    phone = normalize_phone(message.text)
    if not phone:
        await message.answer("Проверьте формат телефона. Пример: +79991234567")
        return
    await state.update_data(phone=phone)
    await state.set_state(DemoRequestForm.contact_method)
    await message.answer("Укажите удобный способ связи:")


@router.message(DemoRequestForm.contact_method)
async def demo_contact_method(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Укажите удобный способ связи текстом.")
        return
    await state.update_data(contact_method=message.text.strip())
    await state.set_state(DemoRequestForm.comment)
    await message.answer("Комментарий:")


@router.message(DemoRequestForm.comment)
async def demo_comment(message: Message, state: FSMContext, config: Config) -> None:
    if not is_nonempty(message.text):
        await message.answer("Добавьте короткий комментарий.")
        return

    await state.update_data(comment=message.text.strip())
    data = await state.get_data()

    await send_form_to_admin(
        bot=message.bot,
        admin_chat_id=config.admin_chat_id,
        title="Новая заявка: Демо платформы",
        fields=[
            ("Имя", data["name"]),
            ("Город", data["city"]),
            ("Телефон", data["phone"]),
            ("Удобный способ связи", data["contact_method"]),
            ("Комментарий", data["comment"]),
        ],
    )

    await state.clear()
    await message.answer(PLATFORM_DEMO_SUCCESS_TEXT, reply_markup=success_kb())


@router.message(F.text == BTN_BACK)
async def platform_back(message: Message) -> None:
    await message.answer(SOFT_FALLBACK_TEXT, reply_markup=platform_menu_kb())


@router.message(F.text.in_({BTN_BACK_TO_MENU, BTN_MENU}))
async def platform_to_main(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(SOFT_FALLBACK_TEXT, reply_markup=main_menu_kb())
