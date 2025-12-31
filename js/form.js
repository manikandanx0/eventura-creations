// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.textContent = 'Thank you! Your message has been received.';
      
      contactForm.appendChild(successMessage);
      
      // Reset form
      contactForm.reset();
      
      // Remove message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }
});
