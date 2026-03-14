import re


PHONE_RE = re.compile(r"^\+?\d{10,15}$")


def is_nonempty(text: str | None) -> bool:
    return bool(text and text.strip())


def normalize_phone(text: str | None) -> str | None:
    if not text:
        return None

    value = text.strip().replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
    if PHONE_RE.match(value):
        return value
    return None
