export function verifyEmail(email) {
    let isValid = true;

    if (!/^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+$/.test(email.split("@")[0])) {
        isValid = false;
    }

    if (email.split("@").length !== 2) {
        isValid = false;
    }

    if (email.includes("..")) {
        isValid = false;
    }

    if (email.startsWith(".") || email.endsWith(".")) {
        isValid = false;
    }

    const domain = email.split("@")[1];

    if (!domain || !domain.includes(".")) {
        isValid = false;
    }

    if (domain && !/^[a-zA-Z0-9.-]+$/.test(domain)) {
        isValid = false;
    }

    if (
        domain &&
        (domain.startsWith(".") ||
         domain.endsWith(".") ||
         domain.startsWith("-") ||
         domain.endsWith("-"))
    ) {
        isValid = false;
    }

    if (domain && domain.split(".").some(part =>
        part.startsWith("-") || part.endsWith("-")
    )) {
        isValid = false;
    }

    if (domain && !/[a-zA-Z]{2,}$/.test(domain)) {
        isValid = false;
    }

    return isValid;
}

export function verifyName(name) {
    return /^[\p{L}\p{M}'’ -]+$/u.test(name.trim())
        && name.trim().length >= 2;
}

export function verifyPhone(phone) {
    phone = phone.replaceAll("-", "");
    phone = phone.replaceAll("+", "");
    phone = phone.repalceAll(" ", "");

    if (/^[0-9]+$/.test(phone) && phone.length == 10) {
        return true;
    } else {
        return false;
    }
}