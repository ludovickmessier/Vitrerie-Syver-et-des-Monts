const params = new URLSearchParams(window.location.search);
const requestedSection = params.get("section");

const allButtonName = "Toutes nos réalisations";

const imagesFolder = '/images/realisations/';

const sections = {
    "Douches": [
        [`${imagesFolder}douches/douche-en-verre-1.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-2.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-3.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-4.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-5.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-6.jpeg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-7.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-8.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-9.jpg`, "Douche en verre"]
    ],

    "Portes": [
        [`${imagesFolder}portes/porte-en-verre-1.jpg`, "Porte en verre"]
    ],

    "Fenêtres": [
        [`${imagesFolder}fenetres/fenetre-1.jpg`, "Fenêtre"],
        [`${imagesFolder}fenetres/fenetre-2.jpg`, "Fenêtre"],
        [`${imagesFolder}fenetres/fenetre-3.jpg`, "Fenêtre"]
    ],

    "Cloisons": [
        [`${imagesFolder}cloisons/cloison-en-verre-1.jpg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-2.jpeg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-3.jpeg`, "Cloison en verre"]
    ],

    "Celliers": [
        [`${imagesFolder}celliers/cellier-1.jpeg`, "Cellier en verre"],
        [`${imagesFolder}celliers/cellier-2.jpg`, "Cellier en verre"],
        [`${imagesFolder}celliers/cellier-3.jpg`, "Cellier en verre"]
    ],

    "Garde-corps": [
        [`${imagesFolder}garde-corps/garde-corps-1.jpg`, "Garde corps en verre"],
        [`${imagesFolder}garde-corps/garde-corps-2.jpg`, "Garde corps en verre"],
        [`${imagesFolder}garde-corps/garde-corps-3.jpg`, "Garde corps en verre"]

    ],

    "Rampes": [
        [`${imagesFolder}rampes/rampe-en-verre-1.jpg`, "Rampe en verre"],
        [`${imagesFolder}rampes/rampe-en-verre-2.jpeg`, "Rampe en verre"],
        [`${imagesFolder}rampes/rampe-en-verre-3.jpeg`, "Rampe en verre"],
        [`${imagesFolder}rampes/rampe-en-verre-4.jpeg`, "Rampe en verre"],
        [`${imagesFolder}rampes/rampe-en-verre-5.jpeg`, "Rampe en verre"],
        [`${imagesFolder}rampes/rampe-en-verre-6.jpg`, "Rampe en verre"],
        [`${imagesFolder}rampes/rampe-en-verre-7.jpg`, "Rampe en verre"],
        [`${imagesFolder}rampes/rampe-en-verre-8.jpg`, "Rampe en verre"]
    ],

    "Commercial": [
        [`${imagesFolder}commercial/commercial-1.jpg`, "Commercial"]
    ]
};

const buttonsContainer = document.getElementById("buttons");

const imagesGrid = document.getElementById("images-grid");

const imageOverlay = document.getElementById("image-overlay");
let fullscreenImage = null;

/* Create the category buttons */

function createButtons() {
    const allButton = document.createElement("button");

    allButton.id = "all-button";
    allButton.textContent = allButtonName;

    buttonsContainer.appendChild(allButton);

    Object.keys(sections).forEach(sectionName => {
        const button = document.createElement("button");

        button.id = `section-${sectionName}`;
        button.textContent = sectionName;

        buttonsContainer.appendChild(button);
    });
}

/* Display the images for a category */

function displayImages(sectionName = null) {
    imagesGrid.innerHTML = "";

    const selectedSections = sectionName
        ? { [sectionName]: sections[sectionName] }
        : sections;

    Object.values(selectedSections).forEach(images => {
        images.forEach(([src, alt]) => {
            const img = document.createElement("img");

            img.src = src;
            img.alt = alt;
            img.loading = "lazy";

            imagesGrid.appendChild(img);
        });
    });
}

/* Select a category */

function selectSection(sectionName = null) {
    const buttons = buttonsContainer.querySelectorAll("button");

    buttons.forEach(button => {
        button.classList.toggle(
            "active",
            button.id === (
                sectionName
                    ? `section-${sectionName}`
                    : "all-button"
            )
        );
    });

    closeFullscreen();
    displayImages(sectionName);
}

/* Open an image in fullscreen */

function openFullscreen(img) {
    if (fullscreenImage) return;

    fullscreenImage = img;
    img.classList.add("fullscreen");
    imageOverlay.classList.add("active");
}

/* Close the fullscreen preview */

function closeFullscreen() {
    if (!fullscreenImage) return;

    fullscreenImage.classList.remove("fullscreen");
    imageOverlay.classList.remove("active");
    fullscreenImage = null;
}

/* Handle category button clicks */

buttonsContainer.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) return;

    if (button.id === "all-button") {
        selectSection();
    } else {
        const sectionName = button.textContent;

        if (Object.hasOwn(sections, sectionName)) {
            selectSection(sectionName);
        }
    }
});

/* Handle image clicks */

imagesGrid.addEventListener("click", event => {
    const img = event.target.closest("img");

    if (!img) return;

    if (fullscreenImage) {
        closeFullscreen();
    } else {
        openFullscreen(img);
    }
});

/* Close when clicking outside the image */

imageOverlay.addEventListener("click", closeFullscreen);

/* Also close with Escape */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeFullscreen();
    }
});

/* Initialize the page */

createButtons();

if (requestedSection && Object.hasOwn(sections, requestedSection)) {
    selectSection(requestedSection);
} else {
    selectSection();
}