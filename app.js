/**
 * Improved mobile navigation handling
 * - Toggles classes and ARIA attributes
 * - Keeps page content from being hidden under the fixed header and the open menu
 */

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav') || document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation a');

function setAriaExpanded(value){
    if(menuToggle) menuToggle.setAttribute('aria-expanded', String(value));
}

function openMenu(){
    if(!menuToggle || !navigation) return;
    menuToggle.classList.add('active');
    navigation.classList.add('active');
    setAriaExpanded(true);
    // allow layout to settle then update padding
    setTimeout(updateBodyTopPadding, 120);
}

function closeMenu(){
    if(!menuToggle || !navigation) return;
    menuToggle.classList.remove('active');
    navigation.classList.remove('active');
    setAriaExpanded(false);
    setTimeout(updateBodyTopPadding, 120);
}

function toggleMenu(){
    if(!menuToggle || !navigation) return;
    if(navigation.classList.contains('active')) closeMenu(); else openMenu();
}

// Close when clicking outside
function handleOutsideClick(e){
    if(!navigation || !menuToggle) return;
    const isOpen = navigation.classList.contains('active');
    if(!isOpen) return;
    if(navigation.contains(e.target) || menuToggle.contains(e.target)) return;
    closeMenu();
}

// Update body top padding to include header and opened nav height (so content not hidden)
function updateBodyTopPadding(){
    const header = document.querySelector('header');
    if(!header) return;
    const headerH = header.getBoundingClientRect().height || 0;
    let extra = 0;
    if(navigation && navigation.classList.contains('active')){
        // navigation is positioned absolute; include its visible height so content sits below it
        extra = navigation.getBoundingClientRect().height || 0;
    }
    document.body.style.paddingTop = (headerH + extra) + 'px';
}

// Event binding
if(menuToggle){
    menuToggle.addEventListener('click', toggleMenu);
    // ensure proper ARIA defaults
    if(!menuToggle.hasAttribute('aria-expanded')) setAriaExpanded(false);
}

navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', handleOutsideClick);
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMenu(); });

window.addEventListener('load', updateBodyTopPadding);
window.addEventListener('resize', updateBodyTopPadding);
