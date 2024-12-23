// Function to check if the navbar is in vertical mode
function isVerticalMode() {
    return window.innerWidth <= 768; // Adjust the width threshold to match your CSS media query
}

// Function to adjust content padding based on navbar height
function adjustContentPadding() {
    if (isVerticalMode()) return; // Do nothing if in vertical mode

    const navbar = document.querySelector('.navigatie'); // Select the navigation bar
    const mainContent = document.querySelector('.main'); // Select the main content
    const navbarHeight = navbar.offsetHeight; // Get the height of the navigation bar
    mainContent.style.paddingTop = navbarHeight + 'px'; // Adjust the top padding of the main content
}

// Event listeners for adjusting content padding on load and resize
window.addEventListener('load', adjustContentPadding);
window.addEventListener('resize', adjustContentPadding);
