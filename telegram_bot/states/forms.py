from aiogram.fsm.state import State, StatesGroup


class PartnerLeadForm(StatesGroup):
    name = State()
    city = State()
    phone = State()
    contact_method = State()
    deals_per_month = State()
    has_practice = State()
    interest = State()


class CaseTransferForm(StatesGroup):
    name = State()
    city = State()
    phone = State()
    contact_method = State()
    case_comment = State()
    cooperation_format = State()


class CallRequestForm(StatesGroup):
    name = State()
    phone = State()
    city = State()
    contact_method = State()
    call_time = State()


class EducationLeadForm(StatesGroup):
    name = State()
    city = State()
    phone = State()
    contact_method = State()
    education_interest = State()


class DemoRequestForm(StatesGroup):
    name = State()
    city = State()
    phone = State()
    contact_method = State()
    comment = State()
