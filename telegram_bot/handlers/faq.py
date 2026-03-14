from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from config import Config
from handlers.education import start_education_lead
from handlers.partnership import start_call_form, start_partner_form
from handlers.platform import start_demo_form
from keyboards.inline import academy_link_kb, platform_login_link_kb, platform_site_link_kb
from keyboards.reply import (
    BTN_ASK_QUESTION,
    BTN_BACK,
    BTN_BACK_TO_MENU,
    BTN_EDU_LEAVE,
    BTN_EDU_OPEN_ACADEMY,
    BTN_MENU,
    BTN_PARTNERSHIP_CALL,
    BTN_PARTNERSHIP_LEAVE,
    BTN_PLATFORM_DEMO,
    BTN_PLATFORM_LOGIN,
    BTN_PLATFORM_SITE,
    BTN_Q_CALLBACK,
    BTN_Q_EDUCATION,
    BTN_Q_PARTNERSHIP,
    BTN_Q_PLATFORM,
    ask_question_menu_kb,
)
from utils.texts import ASK_EDU_TEXT, ASK_PARTNER_TEXT, ASK_PLATFORM_TEXT, ASK_TOPIC_TEXT


router = Router(name="faq")


@router.message(F.text == BTN_ASK_QUESTION)
async def open_faq_topics(message: Message) -> None:
    await message.answer(ASK_TOPIC_TEXT, reply_markup=ask_question_menu_kb())


@router.message(F.text == BTN_Q_PARTNERSHIP)
async def faq_partnership(message: Message) -> None:
    await message.answer(
        ASK_PARTNER_TEXT,
        reply_markup=ask_question_menu_kb(),
    )


@router.message(F.text == BTN_Q_EDUCATION)
async def faq_education(message: Message) -> None:
    await message.answer(
        ASK_EDU_TEXT,
        reply_markup=ask_question_menu_kb(),
    )


@router.message(F.text == BTN_Q_PLATFORM)
async def faq_platform(message: Message) -> None:
    await message.answer(
        ASK_PLATFORM_TEXT,
        reply_markup=ask_question_menu_kb(),
    )


@router.message(F.text == BTN_Q_CALLBACK)
async def faq_callback(message: Message, state: FSMContext) -> None:
    await start_call_form(message, state)


@router.message(F.text == BTN_PARTNERSHIP_LEAVE)
async def faq_to_partner_form(message: Message, state: FSMContext) -> None:
    await start_partner_form(message, state)


@router.message(F.text == BTN_PARTNERSHIP_CALL)
async def faq_to_call_form(message: Message, state: FSMContext) -> None:
    await start_call_form(message, state)


@router.message(F.text == BTN_EDU_LEAVE)
async def faq_to_education_form(message: Message, state: FSMContext) -> None:
    await start_education_lead(message, state)


@router.message(F.text == BTN_PLATFORM_DEMO)
async def faq_to_demo_form(message: Message, state: FSMContext) -> None:
    await start_demo_form(message, state)


@router.message(F.text == BTN_EDU_OPEN_ACADEMY)
async def faq_open_academy(message: Message, config: Config) -> None:
    await message.answer("Ознакомиться со всеми программами обучения можно в Академии АСПБ.", reply_markup=academy_link_kb(config.academy_url))


@router.message(F.text == BTN_PLATFORM_SITE)
async def faq_platform_site(message: Message, config: Config) -> None:
    await message.answer("Перейти на сайт платформы:", reply_markup=platform_site_link_kb(config.platform_site_url))


@router.message(F.text == BTN_PLATFORM_LOGIN)
async def faq_platform_login(message: Message, config: Config) -> None:
    await message.answer("Открыть платформу:", reply_markup=platform_login_link_kb(config.platform_url))


@router.message(F.text.in_({BTN_BACK_TO_MENU, BTN_MENU, BTN_BACK}))
async def faq_back(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(ASK_TOPIC_TEXT, reply_markup=ask_question_menu_kb())
