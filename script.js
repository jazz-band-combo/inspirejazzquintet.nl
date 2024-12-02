
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

document.querySelectorAll('.subnav').forEach(subnav => {
  let isClicked = false;

  subnav.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click from bubbling up
    const content = subnav.querySelector('.subnav-content');
    isClicked = !isClicked;

    if (isClicked) {
      content.style.display = 'block';
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    } else {
      content.style.display = '';
      content.style.opacity = '';
      content.style.transform = '';
    }
  });

  // Reset on hover (optional, ensures hover behaves as expected)
  subnav.addEventListener('mouseenter', () => {
    if (!isClicked) {
      const content = subnav.querySelector('.subnav-content');
      content.style.display = '';
      content.style.opacity = '';
      content.style.transform = '';
    }
  });
});

// Close subnav content when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.subnav-content').forEach(content => {
    content.style.display = '';
    content.style.opacity = '';
    content.style.transform = '';
  });
  document.querySelectorAll('.subnav').forEach(subnav => {
    subnav.isClicked = false;
  });
});
