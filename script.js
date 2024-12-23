// Functie om de padding onder de navigatiebalk aan te passen op basis van de hoogte
function adjustContentPadding() {
    const navbar = document.querySelector('.navigatie'); // Selecteer de navigatiebalk
    const mainContent = document.querySelector('.main'); // Selecteer de main-content
    const navbarHeight = navbar.offsetHeight; // Haal de hoogte van de navigatiebalk op
    mainContent.style.paddingTop = navbarHeight + 'px'; // Pas de padding-top van de main-content aan
}

// Voer de padding-aanpassing uit bij het laden van de pagina en bij het wijzigen van het vensterformaat
window.addEventListener('load', adjustContentPadding); // Bij het laden van de pagina
window.addEventListener('resize', adjustContentPadding); // Bij het aanpassen van het vensterformaat

// Subnav-button active class logic
document.querySelectorAll('.subnavbtn').forEach(btn => {
    btn.addEventListener('click', function () {
        const isActive = this.classList.contains('active'); // Controleer of de knop al actief is
        document.querySelectorAll('.subnavbtn').forEach(b => b.classList.remove('active')); // Verwijder de active-class van alle knoppen
        if (!isActive) {
            this.classList.add('active'); // Voeg de active-class toe aan de geklikte knop als deze niet actief was
        }
    });
});
