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

// Logic for managing active state on subnav buttons
document.querySelectorAll('.subnavbtn').forEach(btn => {
    btn.addEventListener('click', function () {
        if (isVerticalMode()) return; // Do nothing if in vertical mode

        const isActive = this.classList.contains('active'); // Check if the button is already active
        document.querySelectorAll('.subnavbtn').forEach(b => b.classList.remove('active')); // Remove the active class from all buttons
        if (!isActive) {
            this.classList.add('active'); // Add the active class to the clicked button
        }
    });
});
