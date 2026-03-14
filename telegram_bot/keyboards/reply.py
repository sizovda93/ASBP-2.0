from aiogram.types import KeyboardButton, ReplyKeyboardMarkup

BTN_PARTNERSHIP = "Хочу стать партнером"
BTN_EDUCATION = "Обучение"
BTN_PLATFORM = "Платформа"
BTN_ASK_QUESTION = "Задать вопрос"
BTN_MENU = "Вернуться в меню"
BTN_CANCEL = "Отмена"

BTN_PARTNERSHIP_LEAVE = "Оставить заявку"
BTN_PARTNERSHIP_TRANSFER_CASE = "Передать дело"
BTN_PARTNERSHIP_CALL = "Записаться на звонок"
BTN_BACK_TO_MENU = "Назад в меню"

BTN_EDU_DIRECTIONS = "Направления обучения"
BTN_EDU_LEAVE = "Оставить заявку на обучение"
BTN_EDU_OPEN_ACADEMY = "Перейти в Академию"

BTN_PLATFORM_BENEFITS = "Преимущества платформы"
BTN_PLATFORM_DEMO = "Запросить демо"
BTN_PLATFORM_SITE = "Сайт платформы"
BTN_PLATFORM_LOGIN = "Войти в платформу"

BTN_Q_PARTNERSHIP = "Партнерство"
BTN_Q_EDUCATION = "Обучение"
BTN_Q_PLATFORM = "Платформа"
BTN_Q_CALLBACK = "Обратный звонок"

BTN_BACK = "Назад"

DIRECTION_LABELS = [
    "Оспаривание сделок",
    "Неосвобождение от обязательств",
    "Юридические аспекты БФЛ",
    "Продажи юридических услуг",
    "Эффективная команда",
]


def _kb(rows: list[list[str]]) -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text=t) for t in row] for row in rows],
        resize_keyboard=True,
        input_field_placeholder="Выберите действие",
    )


def main_menu_kb() -> ReplyKeyboardMarkup:
    return _kb([
        [BTN_PARTNERSHIP, BTN_EDUCATION],
        [BTN_PLATFORM, BTN_ASK_QUESTION],
    ])


def partner_menu_kb() -> ReplyKeyboardMarkup:
    return _kb([
        [BTN_PARTNERSHIP_LEAVE],
        [BTN_PARTNERSHIP_TRANSFER_CASE],
        [BTN_PARTNERSHIP_CALL],
        [BTN_BACK_TO_MENU],
    ])


def education_menu_kb() -> ReplyKeyboardMarkup:
    return _kb([
        [BTN_EDU_DIRECTIONS],
        [BTN_EDU_LEAVE],
        [BTN_EDU_OPEN_ACADEMY],
        [BTN_BACK_TO_MENU],
    ])


def platform_menu_kb() -> ReplyKeyboardMarkup:
    return _kb([
        [BTN_PLATFORM_BENEFITS],
        [BTN_PLATFORM_DEMO],
        [BTN_PLATFORM_SITE],
        [BTN_PLATFORM_LOGIN],
        [BTN_BACK_TO_MENU],
    ])


def ask_question_menu_kb() -> ReplyKeyboardMarkup:
    return _kb([
        [BTN_Q_PARTNERSHIP, BTN_Q_EDUCATION],
        [BTN_Q_PLATFORM, BTN_Q_CALLBACK],
        [BTN_BACK_TO_MENU],
    ])


def back_kb() -> ReplyKeyboardMarkup:
    return _kb([[BTN_BACK]])


def cancel_kb() -> ReplyKeyboardMarkup:
    return _kb([
        [BTN_CANCEL],
        [BTN_MENU],
    ])


def directions_kb() -> ReplyKeyboardMarkup:
    return _kb([
        [DIRECTION_LABELS[0]],
        [DIRECTION_LABELS[1]],
        [DIRECTION_LABELS[2]],
        [DIRECTION_LABELS[3]],
        [DIRECTION_LABELS[4]],
        [BTN_BACK],
    ])


def success_kb() -> ReplyKeyboardMarkup:
    return _kb([
        [BTN_MENU],
        [BTN_PARTNERSHIP_CALL],
    ])
