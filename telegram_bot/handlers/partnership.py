from __future__ import annotations

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from config import Config
from keyboards.reply import (
    BTN_ASK_QUESTION,
    BTN_BACK_TO_MENU,
    BTN_CANCEL,
    BTN_EDUCATION,
    BTN_MENU,
    BTN_PARTNERSHIP,
    BTN_PARTNERSHIP_CALL,
    BTN_PARTNERSHIP_LEAVE,
    BTN_PARTNERSHIP_TRANSFER_CASE,
    BTN_PLATFORM,
    cancel_kb,
    main_menu_kb,
    partner_menu_kb,
    success_kb,
)
from states.forms import CallRequestForm, CaseTransferForm, PartnerLeadForm
from utils.notify_admin import send_form_to_admin
from utils.texts import (
    CALL_SUCCESS_TEXT,
    PARTNER_BRANCH_TEXT,
    PARTNER_SUCCESS_TEXT,
    SOFT_FALLBACK_TEXT,
    TRANSFER_SUCCESS_TEXT,
)
from utils.validators import is_nonempty, normalize_phone


router = Router(name="partnership")


def _is_menu_button(text: str | None) -> bool:
    return text in {BTN_PARTNERSHIP, BTN_EDUCATION, BTN_PLATFORM, BTN_ASK_QUESTION, BTN_MENU, BTN_BACK_TO_MENU}


@router.message(F.text == BTN_PARTNERSHIP)
async def open_partnership_branch(message: Message) -> None:
    await message.answer(PARTNER_BRANCH_TEXT, reply_markup=partner_menu_kb())


@router.message(F.text == BTN_BACK_TO_MENU)
@router.message(F.text == BTN_MENU)
async def to_main_menu(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(SOFT_FALLBACK_TEXT, reply_markup=main_menu_kb())


async def start_partner_form(message: Message, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(PartnerLeadForm.name)
    await message.answer("Укажите ваше имя:", reply_markup=cancel_kb())


@router.message(F.text == BTN_PARTNERSHIP_LEAVE)
async def partnership_leave_lead(message: Message, state: FSMContext) -> None:
    await start_partner_form(message, state)


@router.message(PartnerLeadForm.name)
async def partner_name(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите имя текстом.")
        return
    await state.update_data(name=message.text.strip())
    await state.set_state(PartnerLeadForm.city)
    await message.answer("Укажите ваш город:")


@router.message(PartnerLeadForm.city)
async def partner_city(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите город текстом.")
        return
    await state.update_data(city=message.text.strip())
    await state.set_state(PartnerLeadForm.phone)
    await message.answer("Укажите телефон (пример: +79991234567):")


@router.message(PartnerLeadForm.phone)
async def partner_phone(message: Message, state: FSMContext) -> None:
    phone = normalize_phone(message.text)
    if not phone:
        await message.answer("Проверьте формат телефона. Пример: +79991234567")
        return
    await state.update_data(phone=phone)
    await state.set_state(PartnerLeadForm.contact_method)
    await message.answer("Укажите удобный способ связи:")


@router.message(PartnerLeadForm.contact_method)
async def partner_contact_method(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Укажите удобный способ связи текстом.")
        return
    await state.update_data(contact_method=message.text.strip())
    await state.set_state(PartnerLeadForm.deals_per_month)
    await message.answer("Сколько дел в месяц?")


@router.message(PartnerLeadForm.deals_per_month)
async def partner_deals_per_month(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Укажите количество дел в месяц.")
        return
    await state.update_data(deals_per_month=message.text.strip())
    await state.set_state(PartnerLeadForm.has_practice)
    await message.answer("Есть ли действующая практика?")


@router.message(PartnerLeadForm.has_practice)
async def partner_has_practice(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Ответьте текстом: есть ли действующая практика.")
        return
    await state.update_data(has_practice=message.text.strip())
    await state.set_state(PartnerLeadForm.interest)
    await message.answer("Интересует обучение или только передача дел?")


@router.message(PartnerLeadForm.interest)
async def partner_interest(message: Message, state: FSMContext, config: Config) -> None:
    if not is_nonempty(message.text):
        await message.answer("Ответьте текстом, что вас интересует.")
        return

    await state.update_data(interest=message.text.strip())
    data = await state.get_data()

    await send_form_to_admin(
        bot=message.bot,
        admin_chat_id=config.admin_chat_id,
        title="Новая заявка: Партнерство",
        fields=[
            ("Имя", data["name"]),
            ("Город", data["city"]),
            ("Телефон", data["phone"]),
            ("Удобный способ связи", data["contact_method"]),
            ("Сколько дел в месяц", data["deals_per_month"]),
            ("Есть ли действующая практика", data["has_practice"]),
            ("Интересует", data["interest"]),
        ],
    )

    await state.clear()
    await message.answer(PARTNER_SUCCESS_TEXT, reply_markup=success_kb())


async def start_case_transfer_form(message: Message, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(CaseTransferForm.name)
    await message.answer("Укажите ваше имя:", reply_markup=cancel_kb())


@router.message(F.text == BTN_PARTNERSHIP_TRANSFER_CASE)
async def partnership_transfer_case(message: Message, state: FSMContext) -> None:
    await start_case_transfer_form(message, state)


@router.message(CaseTransferForm.name)
async def transfer_name(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите имя текстом.")
        return
    await state.update_data(name=message.text.strip())
    await state.set_state(CaseTransferForm.city)
    await message.answer("Укажите город:")


@router.message(CaseTransferForm.city)
async def transfer_city(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите город текстом.")
        return
    await state.update_data(city=message.text.strip())
    await state.set_state(CaseTransferForm.phone)
    await message.answer("Укажите телефон (пример: +79991234567):")


@router.message(CaseTransferForm.phone)
async def transfer_phone(message: Message, state: FSMContext) -> None:
    phone = normalize_phone(message.text)
    if not phone:
        await message.answer("Проверьте формат телефона. Пример: +79991234567")
        return
    await state.update_data(phone=phone)
    await state.set_state(CaseTransferForm.contact_method)
    await message.answer("Укажите удобный способ связи:")


@router.message(CaseTransferForm.contact_method)
async def transfer_contact_method(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Укажите удобный способ связи текстом.")
        return
    await state.update_data(contact_method=message.text.strip())
    await state.set_state(CaseTransferForm.case_comment)
    await message.answer("Краткий комментарий по делу:")


@router.message(CaseTransferForm.case_comment)
async def transfer_case_comment(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Добавьте комментарий по делу.")
        return
    await state.update_data(case_comment=message.text.strip())
    await state.set_state(CaseTransferForm.cooperation_format)
    await message.answer("Это разовое дело или планируете постоянное сотрудничество?")


@router.message(CaseTransferForm.cooperation_format)
async def transfer_cooperation_format(message: Message, state: FSMContext, config: Config) -> None:
    if not is_nonempty(message.text):
        await message.answer("Укажите формат сотрудничества текстом.")
        return

    await state.update_data(cooperation_format=message.text.strip())
    data = await state.get_data()

    await send_form_to_admin(
        bot=message.bot,
        admin_chat_id=config.admin_chat_id,
        title="Новая заявка: Передача дела",
        fields=[
            ("Имя", data["name"]),
            ("Город", data["city"]),
            ("Телефон", data["phone"]),
            ("Удобный способ связи", data["contact_method"]),
            ("Комментарий по делу", data["case_comment"]),
            ("Формат сотрудничества", data["cooperation_format"]),
        ],
    )

    await state.clear()
    await message.answer(TRANSFER_SUCCESS_TEXT, reply_markup=success_kb())


async def start_call_form(message: Message, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(CallRequestForm.name)
    await message.answer("Укажите ваше имя:", reply_markup=cancel_kb())


@router.message(F.text == BTN_PARTNERSHIP_CALL)
async def partnership_call(message: Message, state: FSMContext) -> None:
    await start_call_form(message, state)


@router.message(CallRequestForm.name)
async def call_name(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите имя текстом.")
        return
    await state.update_data(name=message.text.strip())
    await state.set_state(CallRequestForm.phone)
    await message.answer("Укажите телефон (пример: +79991234567):")


@router.message(CallRequestForm.phone)
async def call_phone(message: Message, state: FSMContext) -> None:
    phone = normalize_phone(message.text)
    if not phone:
        await message.answer("Проверьте формат телефона. Пример: +79991234567")
        return
    await state.update_data(phone=phone)
    await state.set_state(CallRequestForm.city)
    await message.answer("Укажите город:")


@router.message(CallRequestForm.city)
async def call_city(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Введите город текстом.")
        return
    await state.update_data(city=message.text.strip())
    await state.set_state(CallRequestForm.contact_method)
    await message.answer("Укажите удобный способ связи:")


@router.message(CallRequestForm.contact_method)
async def call_contact_method(message: Message, state: FSMContext) -> None:
    if not is_nonempty(message.text):
        await message.answer("Укажите удобный способ связи текстом.")
        return
    await state.update_data(contact_method=message.text.strip())
    await state.set_state(CallRequestForm.call_time)
    await message.answer("Удобное время для звонка:")


@router.message(CallRequestForm.call_time)
async def call_time(message: Message, state: FSMContext, config: Config) -> None:
    if not is_nonempty(message.text):
        await message.answer("Укажите удобное время для звонка текстом.")
        return

    await state.update_data(call_time=message.text.strip())
    data = await state.get_data()

    await send_form_to_admin(
        bot=message.bot,
        admin_chat_id=config.admin_chat_id,
        title="Новая заявка: Звонок",
        fields=[
            ("Имя", data["name"]),
            ("Телефон", data["phone"]),
            ("Город", data["city"]),
            ("Удобный способ связи", data["contact_method"]),
            ("Удобное время для звонка", data["call_time"]),
        ],
    )

    await state.clear()
    await message.answer(CALL_SUCCESS_TEXT, reply_markup=success_kb())
