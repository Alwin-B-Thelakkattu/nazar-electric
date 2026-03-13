// ========================
// MOBILE MENU TOGGLE
// ========================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickingInsideNav = navMenu.contains(event.target);
    const isClickingMenuToggle = menuToggle.contains(event.target);
    
    if (!isClickingInsideNav && !isClickingMenuToggle && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================
// CONTACT FORM HANDLING
// ========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !phone || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Validate phone number (basic validation)
    if (!isValidPhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `*New Service Request from ${name}*\n\nPhone: ${phone}\n\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/916282272900?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    showNotification('Message sent! WhatsApp will open with your details.');
});

// ========================
// PHONE VALIDATION
// ========================

function isValidPhone(phone) {
    // Remove non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Accept phone numbers with 10 or more digits
    return cleaned.length >= 10;
}

// ========================
// NOTIFICATION SYSTEM
// ========================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #25D366;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-in-out;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================
// SMOOTH SCROLL FOR BUTTONS
// ========================

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================
// ADD SCROLL EFFECT TO HEADER
// ========================

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
    } else {
        // Scrolling up
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ========================
// FLOATING BUTTON ANIMATIONS
// ========================

const floatingButtons = document.querySelectorAll('.float-btn');

floatingButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ========================
// LAZY LOADING & PERFORMANCE
// ========================

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply to service cards and review cards
const cards = document.querySelectorAll('.service-card, .review-card, .why-us-card, .area-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========================
// PREVENT MULTIPLE FORM SUBMISSIONS
// ========================

contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    submitBtn.style.cursor = 'not-allowed';
    
    // Re-enable after 2 seconds
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }, 2000);
});

// ========================
// ANALYTICS & TRACKING
// ========================

// Track button clicks
function trackButtonClick(buttonName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'button_click', {
            'button_name': buttonName
        });
    }
}

// Add tracking to CTA buttons
const ctaButtons = document.querySelectorAll('.cta-buttons a');
ctaButtons.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        const isWhatsApp = this.href.includes('wa.me');
        const isTel = this.href.startsWith('tel:');
        
        if (isWhatsApp) {
            trackButtonClick('whatsapp_cta');
        } else if (isTel) {
            trackButtonClick('call_cta');
        }
    });
});

// ========================
// RESPONSIVE UTILITIES
// ========================

function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

function isMobileView() {
    return getViewportWidth() < 768;
}

// ========================
// KEYBOARD NAVIGATION
// ========================

document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================
// INITIALIZE ON LOAD
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Preload critical images if needed (optional optimization)
    // This is a placeholder for image optimization
    
    // Initialize all tooltips or other enhancements
    console.log('Website loaded successfully!');
});

// ========================
// PERFORMANCE MONITORING
// ========================

// Log performance metrics (optional)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time: ' + pageLoadTime + 'ms');
        }, 0);
    });
}
