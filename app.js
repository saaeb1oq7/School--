/**
 * Mobile Navigation Menu Toggle Functionality
 * Handles hamburger menu interactions for responsive design
 */

// Get references to the menu toggle button and navigation menu
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation a');

/**
 * Toggle the mobile menu visibility and hamburger icon animation
 * Adds/removes 'active' class to both menu toggle and navigation elements
 */
function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

/**
 * Close the mobile menu when a navigation link is clicked
 * Improves user experience by automatically closing menu after selection
 */
function closeMenuOnLinkClick() {
    menuToggle.classList.remove('active');
    navigation.classList.remove('active');
}

/**
 * Close menu when clicking outside the navigation area
 * Provides better UX by closing menu on document clicks outside navigation/toggle
 */
function handleOutsideClick(event) {
    const isMenuOpen = navigation.classList.contains('active');
    const isClickOnMenu = navigation.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (isMenuOpen && !isClickOnMenu && !isClickOnToggle) {
        closeMenuOnLinkClick();
    }
}

// Add event listener for hamburger menu button click
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

// Add event listeners to close menu when navigation links are clicked
navLinks.forEach(link => {
    link.addEventListener('click', closeMenuOnLinkClick);
});

// Add event listener to close menu when clicking outside
document.addEventListener('click', handleOutsideClick);

// Close menu on Escape key press for better accessibility
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('active')) {
        closeMenuOnLinkClick();
    }
});
