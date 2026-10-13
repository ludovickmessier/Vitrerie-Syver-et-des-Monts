/* Mobile menu */

const navigationList = document.querySelector("body>header nav ul");
const menuButton = document.getElementById("menu-button");
const closeMenuButton = document.getElementById("close-menu-button");

function openMenu() {
    navigationList.classList.remove("menu-closing");
    navigationList.classList.add("menu-open");
}

function closeMenu() {
    if (!navigationList.classList.contains("menu-open")) return;

    navigationList.classList.remove("menu-open");
    navigationList.classList.add("menu-closing");

    navigationList.addEventListener("animationend", function handler(event) {
        if (event.target !== navigationList) return;
        if (event.animationName !== "mobile-menu-close-animation") return;

        navigationList.classList.remove("menu-closing");
        navigationList.removeEventListener("animationend", handler);
    });
}

navigationList.addEventListener("animationend", function handler(event) {
    if (event.target !== navigationList) return;
    if (event.animationName !== "mobile-menu-close-animation") return;

    navigationList.classList.remove("menu-closing");
    navigationList.removeEventListener("animationend", handler);

    // Fade the menu button and submission button back in
    menuButton.classList.add("fade-in");
    document.querySelector("li.soumission").classList.add("fade-in");
});

/* Open menu */

menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openMenu();
});

/* Close button */

closeMenuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeMenu();
});

/* Clicking outside closes the menu */

document.addEventListener("click", (event) => {
    const clickedInsideMenu = navigationList.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenu();
    }
});

navigationList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", event => {
        // Only animate on mobile when the menu is open
        if (
            window.innerWidth > 900 ||
            !navigationList.classList.contains("menu-open")
        ) {
            return;
        }

        // Prevent immediate navigation
        event.preventDefault();

        const destination = link.href;

        closeMenu();

        // Wait for the closing animation to finish
        navigationList.addEventListener("animationend", function handler(event) {
            if (
                event.target !== navigationList ||
                event.animationName !== "mobile-menu-close-animation"
            ) {
                return;
            }

            navigationList.removeEventListener("animationend", handler);

            // Navigate to the clicked page
            window.location.href = destination;
        });
    });
});