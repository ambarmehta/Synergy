// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
  }
});

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbw3attGkrqIqcKnsNc7iYwG8BqVRQWp74Tb9R9rWdI7uVMmaa4CKhJAijl-QP8prHFFQQ/exec', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          country: formData.get('country'),
          message: formData.get('message')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (result.status === 'success' || response.ok) {
        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
      // Reset button
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  });
}

// Notification function
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    max-width: 400px;
    font-weight: 500;
    animation: slideInRight 0.3s ease-out;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add CSS for notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyles);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }
  });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.feature-card, .service-card, .case-study-card, .resource-card, .process-step');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
});

// Progress bar animation for hero cards
document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width = bar.style.width || '0%';
    }, index * 200);
  });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('.stat-number');
      if (statNumber && !statNumber.classList.contains('animated')) {
        const text = statNumber.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        statNumber.classList.add('animated');
        animateCounter(statNumber, number);
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const stats = document.querySelectorAll('.stat');
  stats.forEach(stat => statsObserver.observe(stat));
});

// Add loading state to resource download links
document.querySelectorAll('.resource-download').forEach(link => {
  link.addEventListener('click', function(e) {
    const originalText = this.innerHTML;
    this.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="m8 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Downloading...
    `;
    
    setTimeout(() => {
      this.innerHTML = originalText;
    }, 2000);
  });
});

// Enhanced hover effects for cards
document.querySelectorAll('.feature-card, .service-card, .case-study-card, .resource-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});