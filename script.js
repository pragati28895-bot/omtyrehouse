// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #0d1b4a, #1a365d)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1a2a6c, #2a4d69)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Service cards animation
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cardObserver.observe(card);
});

// Product cards animation
document.querySelectorAll('.product-category').forEach((product, index) => {
    product.style.opacity = '0';
    product.style.transform = 'translateY(20px)';
    product.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    product.style.transitionDelay = `${index * 0.1}s`;
    
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    productObserver.observe(product);
});

// Contact items animation
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    contactObserver.observe(item);
});

// Stats counter animation with Intersection Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h4');
            statItems.forEach(item => {
                const target = parseInt(item.getAttribute('data-target'));
                const suffix = item.textContent.includes('+') ? '+' : '';
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        item.textContent = Math.ceil(count) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        item.textContent = target + suffix;
                    }
                };
                
                updateCount();
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Auto-scroll to top button (hidden feature)
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top functionality to logo
const logo = document.querySelector('.logo');
if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', (e) => {
        if (e.target.tagName !== 'H1') {
            scrollToTop();
        }
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    }
});

// Form-like interaction for contact section
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        contactItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
        
        // Visual feedback
        this.style.background = '#e3f2fd';
        this.style.borderLeft = '4px solid #1a2a6c';
        
        // Remove feedback after 2 seconds
        setTimeout(() => {
            this.style.background = '#f8f9fa';
            this.style.borderLeft = 'none';
            this.classList.remove('active');
        }, 2000);
    });
});

// Add hover effects to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic year in footer
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    yearSpan.innerHTML = `&copy; ${new Date().getFullYear()} Om Tyre House. All Rights Reserved.`;
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation and additional effects
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .contact-item.active {
        box-shadow: 0 5px 15px rgba(26, 42, 108, 0.2);
    }
    
    /* Floating Animation for Hero Elements */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Ripple Effect on Click */
    .btn:active {
        transform: scale(0.95);
    }
    
    /* Smooth Scroll Behavior */
    html {
        scroll-behavior: smooth;
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
        width: 12px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #1a2a6c, #2a4d69);
        border-radius: 6px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #ffd700, #ff9800);
    }
`;
document.head.appendChild(style);

console.log('Om Tyre House website loaded successfully!');
console.log('Business Name: Om Tyre House');
console.log('Owner: Om Prakash Sharma');
console.log('Contact: +91 9651969213, +91 9794129065');
console.log('Address: Dhanghata (Petrol Pump ke samne), Sant Kabir Nagar (UP)');
console.log('Established: 2010');