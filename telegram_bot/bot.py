from __future__ import annotations

import asyncio
import logging

from aiohttp import web
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application

from config import load_config
from handlers import setup_routers


async def run_polling(bot: Bot, dp: Dispatcher, config) -> None:
    await dp.start_polling(bot, config=config)


async def run_webhook(bot: Bot, dp: Dispatcher, config) -> None:
    webhook_url = f"{config.webhook_base_url.rstrip('/')}{config.webhook_path}"

    await bot.set_webhook(webhook_url, drop_pending_updates=True)

    app = web.Application()
    app["bot"] = bot
    app["dp"] = dp

    webhook_requests_handler = SimpleRequestHandler(
        dispatcher=dp,
        bot=bot,
    )
    webhook_requests_handler.register(app, path=config.webhook_path)
    setup_application(app, dp, bot=bot, config=config)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, host=config.webhook_host, port=config.webhook_port)
    await site.start()

    logging.info("Webhook started on %s:%s%s", config.webhook_host, config.webhook_port, config.webhook_path)

    try:
        while True:
            await asyncio.sleep(3600)
    finally:
        await bot.delete_webhook(drop_pending_updates=False)
        await runner.cleanup()


async def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )

    config = load_config()

    bot = Bot(
        token=config.bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    dp = Dispatcher(storage=MemoryStorage())
    setup_routers(dp)

    if config.webhook_base_url:
        await run_webhook(bot, dp, config)
    else:
        await run_polling(bot, dp, config)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logging.info("Bot stopped")
