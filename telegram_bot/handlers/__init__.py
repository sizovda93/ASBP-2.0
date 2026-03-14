from aiogram import Dispatcher

from . import common, education, faq, forms_control, partnership, platform, start


def setup_routers(dp: Dispatcher) -> None:
    dp.include_router(forms_control.router)
    dp.include_router(start.router)
    dp.include_router(partnership.router)
    dp.include_router(education.router)
    dp.include_router(platform.router)
    dp.include_router(faq.router)
    dp.include_router(common.router)
