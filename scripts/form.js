import * as verify from "./utilities/verification.js";

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

const form = document.getElementById("soumission-form");

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

const cityInput = document.getElementById("city");

cityInput.addEventListener('input', function () { verifyForm(); });

function verifyForm() {
    const validCity = cityInput.value.trim().length > 2;
    const button = form.querySelector('input[type="submit"]');

    if (validCity && isEmailValid && isNameValid && emailInput.value.trim().length > 0 && nameInput.value.trim().length > 0) {
        button.classList.remove('disabled');
        button.disabled = false;

        return true;
    } else {
        button.classList.add('disabled');
        button.disabled = true;
    }

    return false;
}

/* Form file input */

/* Form file input */

const dropZone = document.getElementById("drop-zone");
const preview = document.getElementById("preview");
const fileInput = document.getElementById("file-input");

let selectedImages = [];

const MAX_FILES = 5;
const MAX_FILE_SIZE = 4 * 1024 * 1024;

function addImages(files) {
    for (const file of files) {
        if (!file.type.startsWith("image/")) continue;

        if (file.size > MAX_FILE_SIZE) {
            console.warn(`${file.name} dépasse la limite de 4 Mo.`);
            continue;
        }

        if (selectedImages.length >= MAX_FILES) {
            console.warn("Maximum de 5 images.");
            break;
        }

        if (selectedImages.some(image =>
            image.name === file.name &&
            image.size === file.size &&
            image.lastModified === file.lastModified
        )) continue;

        selectedImages.push(file);
    }

    renderImages();
}

function renderImages() {
    preview.replaceChildren();

    selectedImages.forEach((file, index) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const removeButton = document.createElement("button");

        img.src = URL.createObjectURL(file);
        img.alt = file.name;

        img.addEventListener("load", () => {
            URL.revokeObjectURL(img.src);
        });

        removeButton.type = "button";
        removeButton.textContent = "Supprimer";
        removeButton.addEventListener("click", () => {
            selectedImages.splice(index, 1);
            renderImages();
        });

        li.append(img, document.createTextNode(file.name), removeButton);
        preview.appendChild(li);
    });
}

dropZone.addEventListener("dragover", event => {
    event.preventDefault();
    dropZone.classList.add("dragging");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragging");
});

dropZone.addEventListener("drop", event => {
    event.preventDefault();
    dropZone.classList.remove("dragging");

    addImages(event.dataTransfer.files);
});

fileInput.addEventListener("change", event => {
    addImages(event.target.files);

    // Permet de sélectionner à nouveau le même fichier.
    fileInput.value = "";
});

window.addEventListener("dragover", event => {
    if (event.dataTransfer.types.includes("Files")) {
        event.preventDefault();
    }
});

window.addEventListener("drop", event => {
    if (!dropZone.contains(event.target) &&
        event.dataTransfer.types.includes("Files")) {
        event.preventDefault();
    }
});

/* Formatting to send */

const API_URL = "https://www.api.syverdesmonts.com"

function formatData() {
    const formatted = {
        city: cityInput.value.trim(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        descriptionProjet: document.getElementById("project-description").value.trim(),
        dimensions: document.getElementById("dimensions").value.trim(),
        images: [...selectedImages]
    };

    return formatted;
}





async function sendData() {
    if (!verifyForm()) return;

    const data = formatData();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("city", data.city);
    formData.append("descriptionProjet", data.descriptionProjet);
    formData.append("dimensions", data.dimensions);

    data.images.forEach(image => {
        formData.append("images", image);
    });

    try {
        const response = await fetch(`${API_URL}/soumission`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error || "L'envoi a échoué.");
        }

        console.log("Soumission envoyée avec succès.");
        console.log(result);
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await sendData();
});
