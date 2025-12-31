// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    // Toggle the active class on nav links
    const isExpanded = navLinks.classList.toggle('active');
    
    // Update aria-expanded attribute for accessibility
    navToggle.setAttribute('aria-expanded', isExpanded);
    
    // Focus management: when menu opens, focus first link
    if (isExpanded) {
      const firstLink = navLinks.querySelector('.nav-link');
      if (firstLink) {
        firstLink.focus();
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus(); // Return focus to toggle button
    }
  });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#" (empty anchor)
    if (href === '#') {
      return;
    }
    
    const target = document.querySelector(href);
    
    // Only prevent default and scroll if target exists
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  });
});
