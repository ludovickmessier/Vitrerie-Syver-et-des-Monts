import * as verify from "../utilities/verification.js";

const messages = {
    "wrongEmailMessage": "Veuillez entrer un courriel valide.",
    "wrongNameMessage": "Est-ce vraiment votre nom?",
}

/* Textarea auto resize */

document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = `${this.scrollHeight}px`;
    });
});

/* Form */

const form = document.getElementById("contact-form");

/* Email verification */

let isEmailValid = false;

const emailInputContainer = form.querySelector("div:has(#email)");
const emailInput = document.getElementById("email");

let emailTimeout;

emailInput.addEventListener('input', function () {
    clearTimeout(emailTimeout);

    emailTimeout = setTimeout(() => {
        const existingMessage = emailInputContainer.querySelector("p.message");

        if (this.value == "") {
            this.classList.remove("wrong");

            if (existingMessage) {
                existingMessage.remove();
            }
            return;
        }

        if (!verify.verifyEmail(this.value)) {
            this.classList.add("wrong");
            isEmailValid = false;

            if (!existingMessage) {
                const messageP = document.createElement("p");
                messageP.textContent = messages.wrongEmailMessage;
                messageP.classList.add("message");

                emailInputContainer.appendChild(messageP);
            }
        } else {
            this.classList.remove("wrong");
            isEmailValid = true;

            if (existingMessage) {
                existingMessage.remove();
            }
        }

        verifyForm();

    }, 1000);
});

/* Name verification */

let isNameValid = false;

const nameInputContainer = form.querySelector("div:has(#name)");
const nameInput = document.getElementById("name");

let nameTimeout;

nameInput.addEventListener('input', function () {
    clearTimeout(nameTimeout);

    nameTimeout = setTimeout(() => {
        const existingMessage = nameInputContainer.querySelector("p.message");

        if (this.value == "") {
            this.classList.remove("wrong");

            if (existingMessage) {
                existingMessage.remove();
            }
            return;
        }

        if (!verify.verifyName(this.value)) {
            this.classList.add("wrong");
            isNameValid = false;

            if (!existingMessage) {
                const messageP = document.createElement("p");
                messageP.textContent = messages.wrongNameMessage;
                messageP.classList.add("message");

                nameInputContainer.appendChild(messageP);
            }
        } else {
            this.classList.remove("wrong");
            isNameValid = true;

            if (existingMessage) {
                existingMessage.remove();
            }
        }

        verifyForm();

    }, 1000);
});

function verifyForm() {
    const button = form.querySelector('input[type="submit"]');

    if (isEmailValid && isNameValid && emailInput.value.trim().length > 0 && nameInput.value.trim().length > 0) {
        button.classList.remove('disabled');
        button.disabled = false;

        return true;
    } else {
        button.classList.add('disabled');
        button.disabled = true;
    }

    return false;
}

/* Formatting to send */

const API_URL = "https://api.syverdesmonts.com";

function formatData() {
    const formatted = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: document.getElementById("message").value.trim(),
    };

    return formatted;
}

async function sendData() {
    if (!verifyForm()) return;

    const data = formatData();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        if (!result.success) {
            confirmSend(nameInput.value, false);
            throw new Error(result.error || "The message wasn't sent.");
        }

        confirmSend(nameInput.value, true)
        console.log(result);
    } catch (error) {
        console.error("Error while sending :", error);
        confirmSend(nameInput.value, false);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await sendData();
});

function confirmSend(name, success) {
    const params = new URLSearchParams({
        nom: name,
        type: "message",
        success: success
    });

    window.location.replace(`/contact/confirmation/?${params}`);
}