const params = new URLSearchParams(window.location.search);
const requestedSection = params.get("section");

const allButtonName = "Toutes nos réalisations";

const imagesFolder = '/images/realisations/';

let touchStartX = 0;
let touchStartY = 0;

const sections = {
    "Douches": [
        [`${imagesFolder}douches/douche-en-verre-1.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-2.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-3.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-4.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-5.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-6.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-7.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-8.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-9.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-10.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-11.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-12.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-13.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-14.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-15.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-16.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-17.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-18.jpg`, "Douche en verre"],
        [`${imagesFolder}douches/douche-en-verre-19.jpg`, "Douche en verre"]
    ],

    "Portes": [
        [`${imagesFolder}portes/porte-en-verre-1.jpg`, "Porte en verre"],
        [`${imagesFolder}portes/porte-en-verre-2.jpg`, "Porte en verre"],
        [`${imagesFolder}portes/porte-en-verre-3.jpg`, "Porte en verre"],
        [`${imagesFolder}portes/porte-en-verre-4.jpg`, "Porte en verre"],
        [`${imagesFolder}portes/porte-en-verre-5.jpg`, "Porte en verre"],
        [`${imagesFolder}portes/porte-en-verre-6.jpg`, "Porte en verre"],
        [`${imagesFolder}portes/porte-en-verre-7.jpg`, "Porte en verre"]
    ],

    "Fenêtres": [
        [`${imagesFolder}fenetres/fenetre-1.jpg`, "Fenêtre"],
        [`${imagesFolder}fenetres/fenetre-2.jpg`, "Fenêtre"],
        [`${imagesFolder}fenetres/fenetre-3.jpg`, "Fenêtre"]
    ],

    "Cloisons": [
        [`${imagesFolder}cloisons/cloison-en-verre-1.jpg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-2.jpg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-3.jpg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-4.jpg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-5.jpg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-6.jpg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-7.jpg`, "Cloison en verre"],
        [`${imagesFolder}cloisons/cloison-en-verre-8.jpg`, "Cloison en verre"]
    ],

    "Celliers": [
        [`${imagesFolder}celliers/cellier-1.jpg`, "Cellier en verre"],
        [`${imagesFolder}celliers/cellier-2.jpg`, "Cellier en verre"],
        [`${imagesFolder}celliers/cellier-3.jpg`, "Cellier en verre"],
        [`${imagesFolder}celliers/cellier-4.jpg`, "Cellier en verre"],
        [`${imagesFolder}celliers/cellier-5.jpg`, "Cellier en verre"]

    ],

    "Rampes et Garde-corps": [
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-1.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-2.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-3.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-5.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-6.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-7.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-8.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-9.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-10.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-11.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-12.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-13.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-14.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-15.jpg`, "Garde corps en verre"],
        [`${imagesFolder}rampes-et-garde-corps/rampe-et-garde-corps-16.jpg`, "Garde corps en verre"],


    ],

    "Commercial": [
        [`${imagesFolder}commercial/commercial-1.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-2.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-3.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-4.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-5.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-6.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-7.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-8.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-9.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-10.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-11.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-12.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-13.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-14.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-15.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-16.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-17.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-18.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-19.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-20.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-21.jpg`, "Commercial"],
        [`${imagesFolder}commercial/commercial-22.jpg`, "Commercial"]
    ],

    "Miroirs": [
        [`${imagesFolder}miroirs/miroir-1.jpg`, "Miroir"],
        [`${imagesFolder}miroirs/miroir-2.jpg`, "Miroir"],
        [`${imagesFolder}miroirs/miroir-3.jpg`, "Miroir"],
        [`${imagesFolder}miroirs/miroir-4.jpg`, "Miroir"],
        [`${imagesFolder}miroirs/miroir-5.jpg`, "Miroir"],
        [`${imagesFolder}miroirs/miroir-6.jpg`, "Miroir"]
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
            
            img.loading = "lazy";
            img.src = src;
            img.alt = alt;

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


/* Navigate between fullscreen images on mobile */


let isAnimating = false;

function changeFullscreenImage(direction) {
    if (!fullscreenImage || isAnimating) return;

    const images = [...imagesGrid.querySelectorAll("img")];
    const currentIndex = images.indexOf(fullscreenImage);
    const nextIndex = currentIndex + direction;

    // Don't go beyond the first or last image
    if (nextIndex < 0 || nextIndex >= images.length) return;

    isAnimating = true;

    const currentImage = fullscreenImage;
    const nextImage = images[nextIndex];

    // Animate the current image out
    currentImage.classList.add(
        direction > 0 ? "swipe-out-left" : "swipe-out-right"
    );

    currentImage.addEventListener("animationend", function handleExit() {
        currentImage.removeEventListener("animationend", handleExit);

        currentImage.classList.remove(
            "fullscreen",
            "swipe-out-left",
            "swipe-out-right"
        );

        // Position the next image fullscreen
        fullscreenImage = nextImage;
        nextImage.classList.add("fullscreen");

        // Animate it in from the opposite side
        nextImage.classList.add(
            direction > 0 ? "swipe-in-left" : "swipe-in-right"
        );

        nextImage.addEventListener("animationend", function handleEnter() {
            nextImage.removeEventListener("animationend", handleEnter);

            nextImage.classList.remove(
                "swipe-in-left",
                "swipe-in-right"
            );

            isAnimating = false;
        });
    });
}


document.addEventListener("touchstart", event => {
    if (!fullscreenImage) return;

    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", event => {
    if (!fullscreenImage) return;

    // Only enable swiping on touch devices
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Require a clear horizontal swipe
    if (
        Math.abs(deltaX) < 50 ||
        Math.abs(deltaX) < Math.abs(deltaY)
    ) {
        return;
    }

    event.preventDefault();

    if (deltaX < 0) {
        // Swipe left: next image
        changeFullscreenImage(1);
    } else {
        // Swipe right: previous image
        changeFullscreenImage(-1);
    }
}, { passive: false });
