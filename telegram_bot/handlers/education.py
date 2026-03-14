from __future__ import annotations

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from config import Config
from keyboards.inline import academy_link_kb
from keyboards.reply import (
    BTN_BACK,
    BTN_BACK_TO_MENU,
    BTN_EDU_DIRECTIONS,
    BTN_EDU_LEAVE,
    BTN_EDU_OPEN_ACADEMY,
    BTN_EDUCATION,
    BTN_PARTNERSHIP_CALL,
    BTN_PLATFORM,
    BTN_ASK_QUESTION,
    BTN_PARTNERSHIP,
    BTN_MENU,
    cancel_kb,
    directions_kb,
    education_menu_kb,
    main_menu_kb,
    success_kb,
)
from states.forms import EducationLeadForm
from utils.notify_admin import send_form_to_admin
from utils.texts import (
    ACADEMY_TEXT,
    DIRECTION_DESCRIPTIONS,
    EDU_BRANCH_TEXT,
    EDU_SUCCESS_TEXT,
    SOFT_FALLBACK_TEXT,
)
from utils.validators import is_nonempty, normalize_phone


router = Router(name="education")


@router.message(F.text == BTN_EDUCATION)
async def open_education_branch(message: Message) -> None:
    await message.answer(EDU_BRANCH_TEXT, reply_markup=education_menu_kb())


@router.message(F.text == BTN_EDU_DIRECTIONS)
async def show_directions(message: Message) -> None:
    await message.answer("Выберите направление:", reply_markup=directions_kb())


@router.message(F.text.in_(list(DIRECTION_DESCRIPTIONS.keys())))
async def show_direction_details(message: Message) -> None:
    title = message.text or ""
    description = DIRECTION_DESCRIPTIONS[title]
    await message.answer(
        f"{title}\n\n{description}",
        reply_markup=education_menu_kb(),
    )


@router.message(F.text == BTN_EDU_OPEN_ACADEMY)
async def open_academy(message: Message, config: Config) -> None:
    await message.answer(ACADEMY_TEXT, reply_markup=academy_link_kb(config.academy_url))
    await message.answer("Выберите следующее действие:", reply_markup=education_menu_kb())


@router.message(F.text == BTN_EDU_LEAVE)
async def start_education_lead(message: Message, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(EducationLeadForm.name)
    await message.answer("Укажите ваше имя:", reply_markup=cancel_kb())


@router.message(EducationLeadForm.name)
async def edu_name(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите имя текстом.")
        return
    await state.update_data(name=message.text.strip())
    await state.set_state(EducationLeadForm.city)
    await message.answer("Укажите ваш город:")


@router.message(EducationLeadForm.city)
async def edu_city(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите город текстом.")
        return
    await state.update_data(city=message.text.strip())
    await state.set_state(EducationLeadForm.phone)
    await message.answer("Укажите телефон (пример: +79991234567):")


@router.message(EducationLeadForm.phone)
async def edu_phone(message: Message, state: FSMContext) -> None:
    phone = normalize_phone(message.text)
    if not phone:
        await message.answer("Проверьте формат телефона. Пример: +79991234567")
        return
    await state.update_data(phone=phone)
    await state.set_state(EducationLeadForm.contact_method)
    await message.answer("Укажите удобный способ связи:")


@router.message(EducationLeadForm.contact_method)
async def edu_contact(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Укажите удобный способ связи текстом.")
        return
    await state.update_data(contact_method=message.text.strip())
    await state.set_state(EducationLeadForm.education_interest)
    await message.answer("Что интересует в обучении?")


@router.message(EducationLeadForm.education_interest)
async def edu_interest(message: Message, state: FSMContext, config: Config) -> None:
    if not is_nonempty(message.text):
        await message.answer("Опишите, что интересует в обучении.")
        return

    await state.update_data(education_interest=message.text.strip())
    data = await state.get_data()

    await send_form_to_admin(
        bot=message.bot,
        admin_chat_id=config.admin_chat_id,
        title="Новая заявка: Обучение",
        fields=[
            ("Имя", data["name"]),
            ("Город", data["city"]),
            ("Телефон", data["phone"]),
            ("Удобный способ связи", data["contact_method"]),
            ("Что интересует в обучении", data["education_interest"]),
        ],
    )

    await state.clear()
    await message.answer(EDU_SUCCESS_TEXT, reply_markup=success_kb())


@router.message(F.text == BTN_BACK)
async def go_back(message: Message) -> None:
    await message.answer(SOFT_FALLBACK_TEXT, reply_markup=education_menu_kb())


@router.message(F.text.in_({BTN_BACK_TO_MENU, BTN_MENU}))
async def education_to_main(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(SOFT_FALLBACK_TEXT, reply_markup=main_menu_kb())
