// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const floatingBtns = document.querySelectorAll('.floating-btn');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAnimations();
    initScrollAnimations();
    initTypingEffect();
    initParticles();
    initStatsCounter();
    initFormValidation();
    initParallax();
    initTimelineAnimations();
    initTagInteractions();
});

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark ? 'dark' : 'light');

        // Show theme change notification
        showNotification(`Thème ${isDark ? 'sombre' : 'clair'} activé`);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 15px 25px;
        border-radius: var(--border-radius-md);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        box-shadow: var(--shadow-lg);
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile Menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').className =
        navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active section
    updateActiveSection();
});

// Floating Navigation
function updateActiveSection() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update floating buttons
            floatingBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.section === sectionId) {
                    btn.classList.add('active');
                }
            });

            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Floating Button Click
floatingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const sectionId = btn.dataset.section;
        const section = document.getElementById(sectionId);

        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });

            // Show active feedback
            btn.classList.add('clicked');
            setTimeout(() => btn.classList.remove('clicked'), 300);
        }
    });
});

// Animations
function initAnimations() {
    // Add hover effects to competence cards
    const competenceCards = document.querySelectorAll('.competence-card, .soft-skill, .language-card');
    competenceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.classList.contains('language-card') ?
                'translateX(10px)' :
                'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) translateX(0)';
        });
    });

    // Project card animations
    const projetCards = document.querySelectorAll('.projet-card');
    projetCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px)';
            card.style.boxShadow = '0 20px 60px rgba(26, 32, 44, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });

    // Tech bubble animations
    const techBubbles = document.querySelectorAll('.tech-bubble');
    techBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', () => {
            bubble.style.animation = 'none';
            bubble.style.transform = 'scale(1.2)';
            setTimeout(() => {
                bubble.style.animation = 'orbit 20s linear infinite';
                bubble.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // Button click animations
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add special effect for some elements
                if (entry.target.classList.contains('stat')) {
                    entry.target.classList.add('counted');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Typing Effect
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const texts = [
        'Développeuse Full Stack',
        'Java Spring Boot Expert',
        'Spécialiste Bases de Données',
        'Passionnée d\'Innovation'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        if (isPaused) return;

        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed = 50;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, 2000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// Particles Background
function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    // Random size
    const size = Math.random() * 3 + 1;

    // Random animation
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    // Random color from theme
    const colors = [
        'var(--primary-color)',
        'var(--accent-color)',
        'var(--secondary-color)',
        'var(--color-teal)',
        'var(--color-purple)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Set styles
    particle.style.cssText = `
        position: absolute;
        top: ${posY}vh;
        left: ${posX}vw;
        width: ${size}px;
        height: ${size}px;
        background: ${randomColor};
        border-radius: 50%;
        opacity: ${Math.random() * 0.2 + 0.1};
        animation: float ${duration}s infinite ease-in-out ${delay}s;
        box-shadow: 0 0 ${size * 2}px ${randomColor};
    `;

    container.appendChild(particle);

    // Remove and recreate after animation
    setTimeout(() => {
        if (particle.parentNode === container) {
            particle.remove();
            createParticle(container);
        }
    }, duration * 1000);
}

// Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                const duration = 1500;
                const increment = count / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= count) {
                        current = count;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(current);
                }, 16);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => observer.observe(number));
}

// Form Validation
function initFormValidation() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value;
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Reset errors
        document.querySelectorAll('.error').forEach(el => el.remove());

        // Validate name
        if (!name) {
            showError('name', 'Le nom est requis');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Le nom doit contenir au moins 2 caractères');
            isValid = false;
        }

        // Validate email
        if (!email) {
            showError('email', 'L\'email est requis');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Format d\'email invalide');
            isValid = false;
        }

        // Validate sujet
        if (!sujet) {
            showError('sujet', 'Veuillez sélectionner un sujet');
            isValid = false;
        }

        // Validate message
        if (!message) {
            showError('message', 'Le message est requis');
            isValid = false;
        } else if (message.length < 20) {
            showError('message', 'Le message doit contenir au moins 20 caractères');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showNotification('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Animate success
                const contactCard = document.querySelector('.contact-card');
                contactCard.classList.add('success-animation');
                setTimeout(() => contactCard.classList.remove('success-animation'), 1000);
            }, 2000);
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error';
    error.style.cssText = `
        color: var(--color-red);
        font-size: 14px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

    field.parentNode.appendChild(error);

    // Add error class to input
    field.style.borderBottomColor = 'var(--color-red)';

    // Remove error on input
    field.addEventListener('input', () => {
        error.remove();
        field.style.borderBottomColor = '';
    }, { once: true });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Tag hover effects
function initTagInteractions() {
    const tags = document.querySelectorAll('.tag, .tech-tag');

    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
            tag.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
            tag.style.boxShadow = 'none';
        });

        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
        });
    });
}

// Parallax Effect for Background
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes, .gradient-overlay');

        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });
}

// Timeline item animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// Contact link animations
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const icon = link.querySelector('.link-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });

    link.addEventListener('mouseleave', () => {
        const icon = link.querySelector('.link-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Social icon animations
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) rotate(5deg)';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Logo animation
const logoContainer = document.querySelector('.logo-container');
if (logoContainer) {
    logoContainer.addEventListener('mouseenter', () => {
        const logoDot = logoContainer.querySelector('.logo-dot');
        logoDot.style.transform = 'scale(1.5)';
        setTimeout(() => logoDot.style.transform = 'scale(1)', 300);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .btn.clicked {
        transform: scale(0.95);
    }
    
    .floating-btn.clicked {
        transform: translateY(-5px) scale(0.95);
    }
    
    .tag.selected {
        background: var(--primary-color) !important;
        color: white !important;
    }
    
    .contact-card.success-animation {
        animation: successPulse 1s ease;
    }
    
    @keyframes successPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .stat.counted .stat-number {
        animation: countPop 0.3s ease;
    }
    
    @keyframes countPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .nav-link.active {
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Toggle theme with Ctrl+T
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }

    // Toggle menu with Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    }
});

// Load animations when images are loaded
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'scale(1)';
    }
});

// Add loading animation to body
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px 0px' });

// Observe images for lazy loading
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
// Advanced Background Animations
function initAdvancedBackground() {
    // 1. Particules JS (si vous voulez une bibliothèque externe)
    initParticlesJS();

    // 2. Floating Shapes
    createFloatingShapes();

    // 3. Animated Gradients
    animateGradients();

    // 4. Interactive Background
    initInteractiveBackground();
}

// Option 1: Particules JS (Bibliothèque externe - optionnel)
function initParticlesJS() {
    // Si vous voulez utiliser particles.js, incluez cette bibliothèque
    // Sinon, utilisez notre système de particules personnalisé
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6C63FF" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6C63FF",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    } else {
        // Notre système de particules personnalisé
        createCustomParticles();
    }
}

// Système de particules personnalisé
function createCustomParticles() {
    const particlesContainer = document.querySelector('.floating-shapes');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'custom-particle';

    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    // Taille aléatoire
    const size = Math.random() * 5 + 1;

    // Animation aléatoire
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    // Couleur aléatoire du thème
    const colors = [
        'rgba(108, 99, 255, 0.3)',
        'rgba(255, 101, 132, 0.3)',
        'rgba(78, 205, 196, 0.3)',
        'rgba(255, 153, 102, 0.3)',
        'rgba(159, 122, 234, 0.3)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        position: absolute;
        top: ${posY}vh;
        left: ${posX}vw;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.1};
        animation: particleFloat ${duration}s infinite ease-in-out ${delay}s;
        box-shadow: 0 0 ${size * 2}px ${color};
        pointer-events: none;
    `;

    container.appendChild(particle);

    // Recréer après animation
    setTimeout(() => {
        if (particle.parentNode === container) {
            particle.remove();
            createParticle(container, index);
        }
    }, duration * 1000);
}

// Créer des formes flottantes
function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    if (!shapesContainer) return;

    // On utilise les formes CSS statiques
    // Pour des formes dynamiques :
    const shapeCount = 8;

    for (let i = 0; i < shapeCount; i++) {
        createDynamicShape(shapesContainer, i);
    }
}

function createDynamicShape(container, index) {
    const shape = document.createElement('div');
    shape.className = 'dynamic-shape';

    // Taille aléatoire
    const size = Math.random() * 200 + 100;

    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    // Couleur dégradée aléatoire
    const gradients = [
        'linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(78, 205, 196, 0.1))',
        'linear-gradient(135deg, rgba(255, 101, 132, 0.1), rgba(255, 153, 102, 0.1))',
        'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(108, 99, 255, 0.1))',
        'linear-gradient(135deg, rgba(159, 122, 234, 0.1), rgba(255, 101, 132, 0.1))'
    ];
    const gradient = gradients[Math.floor(Math.random() * gradients.length)];

    // Animation aléatoire
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 10;

    shape.style.cssText = `
        position: absolute;
        top: ${posY}vh;
        left: ${posX}vw;
        width: ${size}px;
        height: ${size}px;
        background: ${gradient};
        border-radius: ${Math.random() > 0.5 ? '50%' : '30%'};
        opacity: ${Math.random() * 0.2 + 0.05};
        filter: blur(${size / 4}px);
        animation: dynamicFloat ${duration}s infinite ease-in-out ${delay}s;
        pointer-events: none;
    `;

    container.appendChild(shape);
}

// Animation des dégradés
function animateGradients() {
    const mesh = document.querySelector('.gradient-mesh');
    if (mesh) {
        mesh.style.animation = 'pulseMesh 10s infinite ease-in-out';
    }

    // Animation des couleurs
    animateMeshColors();
}

function animateMeshColors() {
    const mesh = document.querySelector('.gradient-mesh');
    if (!mesh) return;

    let hue = 0;

    setInterval(() => {
        hue = (hue + 0.1) % 360;

        // Créer un effet de changement de couleur subtil
        mesh.style.background = `
            radial-gradient(circle at 20% 80%, hsla(${hue}, 70%, 60%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsla(${(hue + 120) % 360}, 70%, 60%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, hsla(${(hue + 240) % 360}, 70%, 60%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, hsla(${(hue + 180) % 360}, 70%, 60%, 0.1) 0%, transparent 50%)
        `;
    }, 50);
}

// Background interactif
function initInteractiveBackground() {
    const background = document.querySelector('.animated-background');
    if (!background) return;

    // Réagir au défilement
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        background.style.transform = `translateY(${scrolled * 0.1}px)`;
    });

    // Réagir au mouvement de la souris
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;

        background.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Effet de vague au clic
    document.addEventListener('click', (e) => {
        createRippleEffect(e.clientX, e.clientY);
    });
}

// Effet de vague au clic
function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';

    ripple.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(108, 99, 255, 0.2) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9998;
        animation: rippleExpand 1.5s ease-out;
    `;

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 1500);
}

// Ajouter les animations CSS
function addBackgroundAnimationsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
            }
            25% {
                transform: translate(50px, -30px) scale(1.1);
            }
            50% {
                transform: translate(20px, 50px) scale(0.9);
            }
            75% {
                transform: translate(-30px, 20px) scale(1.05);
            }
        }
        
        @keyframes dynamicFloat {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            33% {
                transform: translate(100px, -50px) rotate(120deg);
            }
            66% {
                transform: translate(-50px, 100px) rotate(240deg);
            }
        }
        
        @keyframes rippleExpand {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 500px;
                height: 500px;
                opacity: 0;
            }
        }
        
        /* Effet de parallaxe pour les sections */
        .section {
            position: relative;
            z-index: 1;
        }
        
        /* Assurer que le contenu est au-dessus du background */
        .header, .section > .container, .footer {
            position: relative;
            z-index: 2;
        }
    `;
    document.head.appendChild(style);
}

// Initialiser quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    addBackgroundAnimationsCSS();
    initAdvancedBackground();
});