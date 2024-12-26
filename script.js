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

document.addEventListener("DOMContentLoaded", function () {
    const subnavBtn = document.querySelector(".subnavbtn");
    const subnavContent = document.querySelector(".subnav-content");

    // Voeg een click event listener toe aan de subnavbtn
    subnavBtn.addEventListener("click", function () {
        // Wissel de 'active' class om de subnavigatie te tonen/verbergen
        subnavContent.classList.toggle("active");
    });

    // Optioneel: Sluit de subnavigatie als je ergens anders klikt
    document.addEventListener("click", function (event) {
        if (!subnavBtn.contains(event.target) && !subnavContent.contains(event.target)) {
            subnavContent.classList.remove("active");
        }
    });
});

window.onload = function() {
  const audio = document.getElementById("video-fragment");
  audio.volume = 0.5; // Stel het volume in op 50%
};
