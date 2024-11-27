
// Functie om de padding onder de navigatiebalk aan te passen op basis van de hoogte
function adjustContentPadding() {
    const navbar = document.querySelector('.navigatie');
    const mainContent = document.querySelector('.main'); 
    const navbarHeight = navbar.offsetHeight; 
    mainContent.style.paddingTop = navbarHeight + 'px'; 
}

// Voer de padding-aanpassing uit bij het laden van de pagina en bij het wijzigen van het vensterformaat
window.addEventListener('load', adjustContentPadding);
window.addEventListener('resize', adjustContentPadding);
