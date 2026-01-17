// ========================================
// Netflix Clone - JavaScript
// ========================================

// ========== FAQ Accordion Functionality ==========
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// ========== Navbar Scroll Effect ==========
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== Scroll Animation for Feature Sections ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all feature sections
document.addEventListener('DOMContentLoaded', function () {
    const featureSections = document.querySelectorAll('.feature-section');

    featureSections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// ========== Email Form Validation ==========
const emailForms = document.querySelectorAll('.email-signup');

emailForms.forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('.email-input');
        const email = emailInput.value.trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            // Success - In a real app, this would submit to a server
            alert(`Thank you! We'll send information to ${email}`);
            emailInput.value = '';
        } else {
            // Error
            alert('Please enter a valid email address');
            emailInput.focus();
        }
    });
});

// ========== Video Autoplay on Scroll ==========
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(error => {
                    console.log('Video autoplay prevented:', error);
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
});

// ========== Smooth Scroll Enhancement ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== Download Animation ==========
document.addEventListener('DOMContentLoaded', function () {
    const downloadCard = document.querySelector('.download-card');

    if (downloadCard) {
        // Add entrance animation when scrolled into view
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.8s ease-out';
                }
            });
        }, {
            threshold: 0.5
        });

        cardObserver.observe(downloadCard);
    }
});

// ========== Keyboard Accessibility for FAQ ==========
document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ========== Console Welcome Message ==========
console.log('%c🎬 Netflix Clone', 'color: #E50914; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #fff; font-size: 14px;');
console.log('%cEnjoy exploring! 🍿', 'color: #808080; font-size: 12px;');
