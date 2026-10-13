
const params = new URLSearchParams(window.location.search);
const requestedSection = params.get("section");

const sections = {
    "Douches": [
        ["/images/douches/douche-en-verre-1.jpg", "Douche en verre"],
        ["/images/douches/douche-en-verre-2.jpg", "Douche en verre"],
        ["/images/douches/douche-en-verre-3.jpg", "Douche en verre"],
        ["/images/douches/douche-en-verre-4.jpg", "Douche en verre"],
        ["/images/douches/douche-en-verre-5.jpg", "Douche en verre"]
    ],
    "Fenêtres": [
        ["/images/fenetres/fenetre-1.jpg", "Fenêtre"],
        ["/images/fenetres/fenetre-2.jpg", "Fenêtre"]
    ],
    "Portes": [
        ["/images/portes/porte-en-verre-1.jpg", "Porte en verre"]
    ]
};

const buttonsContainer = document.getElementById("buttons");
const imagesGrid = document.getElementById("images-grid");
const overlay = document.getElementById("image-overlay");

let fullscreenImage = null;

// 1. Create the category buttons
function createButtons() {
    const allButton = document.createElement("button");

    allButton.id = "all-button";
    allButton.textContent = "Toutes nos réalisations";

    buttonsContainer.appendChild(allButton);

    Object.keys(sections).forEach(sectionName => {
        const button = document.createElement("button");

        button.id = `section-${sectionName}`;
        button.textContent = sectionName;

        buttonsContainer.appendChild(button);
    });
}

// 2. Display the images for a category
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

// 3. Select a category
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

// 4. Open an image in fullscreen
function openFullscreen(img) {
    if (fullscreenImage) return;

    fullscreenImage = img;
    img.classList.add("fullscreen");
    overlay.classList.add("active");
}

// 5. Close the fullscreen preview
function closeFullscreen() {
    if (!fullscreenImage) return;

    fullscreenImage.classList.remove("fullscreen");
    fullscreenImage = null;
    overlay.classList.remove("active");
}

// 6. Handle category button clicks
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

// 7. Handle image clicks
imagesGrid.addEventListener("click", event => {
    const img = event.target.closest("img");

    if (!img) return;

    if (fullscreenImage) {
        closeFullscreen();
    } else {
        openFullscreen(img);
    }
});

// 8. Close when clicking outside the image
overlay.addEventListener("click", closeFullscreen);

// Also close with Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeFullscreen();
    }
});

// 9. Initialize the page
createButtons();

if (requestedSection && Object.hasOwn(sections, requestedSection)) {
    selectSection(requestedSection);
} else {
    selectSection();
}
