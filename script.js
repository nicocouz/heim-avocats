// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar enhancement on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 150) {
        nav.style.padding = '1rem 0';
        nav.style.boxShadow = '0 4px 20px rgba(44, 44, 44, 0.08)';
    } else {
        nav.style.padding = '1.5rem 0';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in
document.querySelectorAll('.section-intro, .contact-info, .contact-form-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// Form submission handler
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Create mailto link
    const subject = encodeURIComponent(`Demande de contact - ${data.subject}`);
    const body = encodeURIComponent(
        `Nom: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Téléphone: ${data.phone || 'Non fourni'}\n` +
        `Domaine: ${data.subject}\n\n` +
        `Message:\n${data.message}`
    );

    window.location.href = `mailto:info@heimavocats.ch?subject=${subject}&body=${body}`;

    // Visual feedback
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Message envoyé';
    submitButton.style.background = 'var(--burgundy-dark)';
    submitButton.disabled = true;

    setTimeout(() => {
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.style.background = 'var(--burgundy)';
        submitButton.disabled = false;
    }, 3000);
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--charcoal)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--burgundy)';
        }
    });
});

// Parallax effect on hero image
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.pageYOffset < 800) {
        const scrolled = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// Add hover effect to expertise cards
document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--white)';
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.backgroundColor = 'var(--cream)';
        }
    });
});

// Preload critical fonts
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('700 48px "Playfair Display"'),
        document.fonts.load('400 16px "Inter"')
    ]).then(() => {
        document.body.classList.add('fonts-loaded');
    });
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in';
        document.body.style.opacity = '1';
    }, 50);
});

// Smooth reveal for contact grid items
const contactInfoItems = document.querySelectorAll('.contact-info');
contactInfoItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    item.style.transitionDelay = `${index * 0.1}s`;

    observer.observe(item);
});
