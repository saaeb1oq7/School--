/**
 * Mobile navigation menu toggle functionality
 * - Toggles classes and ARIA attributes for accessibility
 * - Closes menu on link click, outside click, or Escape key
 */

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav') || document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation a');

function setAriaExpanded(value){
    if(menuToggle) menuToggle.setAttribute('aria-expanded', String(value));
}

function closeMenu(){
    if(!menuToggle || !navigation) return;
    menuToggle.classList.remove('active');
    navigation.classList.remove('active');
    setAriaExpanded(false);
}

function openMenu(){
    if(!menuToggle || !navigation) return;
    menuToggle.classList.add('active');
    navigation.classList.add('active');
    setAriaExpanded(true);
}

function toggleMenu(){
    if(!menuToggle || !navigation) return;
    if(navigation.classList.contains('active')) closeMenu(); else openMenu();
}

// Close when clicking outside the navigation/toggle
function handleOutsideClick(e){
    if(!navigation || !menuToggle) return;
    const isOpen = navigation.classList.contains('active');
    if(!isOpen) return;
    if(navigation.contains(e.target) || menuToggle.contains(e.target)) return;
    closeMenu();
}

// Event binding
if(menuToggle){
    menuToggle.addEventListener('click', toggleMenu);
    if(!menuToggle.hasAttribute('aria-expanded')) setAriaExpanded(false);
}

// Close menu when a link is clicked
navLinks.forEach(link => link.addEventListener('click', closeMenu));

// Close menu when clicking outside
document.addEventListener('click', handleOutsideClick);

// Close menu on Escape key
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMenu(); });

// Reset menu state on page load
window.addEventListener('load', closeMenu);
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', closeMenu);
} else {
    closeMenu();
}
