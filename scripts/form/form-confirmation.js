const params = new URLSearchParams(window.location.search);

const name = params.get("nom") || "";
const type = params.get("type") || "message";
const success = params.get("success") === "true";

const h1 = document.querySelector("body>header div.title>h1");
const h2 = document.querySelector("body>header div.title>h2");

const messages = {
    "sucess": [`Votre ${type} a bien été envoyée.`, `Merci ${name}, un membre de notre équipe vous contactera sous peu.`],
    "error": [`Un problème s'est produit`, `Un problème s'est produit de notre côté. Votre ${type} n'a pas pu être envoyée. Veuillez réessayer plus tard.`],
}

if (success) {
    h1.textContent = messages.sucess[0];
    h2.textContent = messages.sucess[1];
} else {
    h1.textContent = messages.error[0];
    h2.textContent = messages.error[1];
}