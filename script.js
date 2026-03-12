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
    initGeometricGrid();
    initFloatingCircles();
    initStatsCounter();
    initFormValidation();
    initHexagonEffect();
    initParallax();
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
        updateBackgroundEffects();
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
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

    // Update parallax
    updateParallax();
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
                top: section.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Advanced Animations
function initAnimations() {
    // Add hover effects to competence cards
    const competenceCards = document.querySelectorAll('.competence-card, .soft-skill, .language-card');
    competenceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.classList.contains('language-card') ?
                'translateX(10px) scale(1.02)' :
                'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) translateX(0) scale(1)';
        });
    });

    // Project card 3D animations
    const projetCards = document.querySelectorAll('.projet-card');
    projetCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });

    // Tech bubble animations
    const techBubbles = document.querySelectorAll('.tech-bubble');
    techBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', () => {
            bubble.style.animation = 'none';
            bubble.style.transform = 'scale(1.3) rotate(180deg)';
            setTimeout(() => {
                bubble.style.animation = 'orbit 20s linear infinite';
            }, 300);
        });

        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Hexagon Effect
function initHexagonEffect() {
    const hexagon = document.querySelector('.hexagon');
    const hexagonBorder = document.querySelector('.hexagon-border');

    if (!hexagon || !hexagonBorder) return;

    hexagon.addEventListener('mouseenter', () => {
        hexagonBorder.style.animation = 'borderPulse 1s infinite';
        hexagonBorder.style.opacity = '1';
    });

    hexagon.addEventListener('mouseleave', () => {
        hexagonBorder.style.animation = 'borderPulse 3s infinite';
        hexagonBorder.style.opacity = '0.7';
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

                // Add bounce animation for cards
                if (entry.target.classList.contains('animate-on-scroll')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
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
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(container));
    }

    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            if (particle) {
                const currentLeft = parseFloat(particle.style.left);
                const currentTop = parseFloat(particle.style.top);

                particle.style.left = (currentLeft + particle.speedX) + 'px';
                particle.style.top = (currentTop + particle.speedY) + 'px';

                // Bounce off edges
                if (currentLeft > window.innerWidth || currentLeft < 0) {
                    particle.speedX *= -1;
                }
                if (currentTop > window.innerHeight || currentTop < 0) {
                    particle.speedY *= -1;
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;

    // Random size
    const size = Math.random() * 3 + 1;

    // Random speed
    particle.speedX = (Math.random() - 0.5) * 0.5;
    particle.speedY = (Math.random() - 0.5) * 0.5;

    // Random color
    const colors = ['#9C27B0', '#FF5722', '#4CAF50'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Set styles
    particle.style.cssText = `
        position: absolute;
        top: ${posY}px;
        left: ${posX}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${Math.random() * 0.3 + 0.1};
        filter: blur(1px);
        pointer-events: none;
    `;

    container.appendChild(particle);
    return particle;
}

// Geometric Grid Animation
function initGeometricGrid() {
    const grid = document.querySelector('.geometric-grid');
    if (!grid) return;

    let angle = 0;

    function animateGrid() {
        angle = (angle + 0.2) % 360;
        const scale = 1 + Math.sin(angle * Math.PI / 180) * 0.1;

        grid.style.transform = `scale(${scale}) rotate(${angle}deg)`;
        requestAnimationFrame(animateGrid);
    }

    animateGrid();
}

// Floating Circles Animation
function initFloatingCircles() {
    const circles = document.querySelectorAll('.floating-circles::before, .floating-circles::after, .floating-circles .circle-3');

    circles.forEach((circle, index) => {
        if (circle.style) {
            circle.style.animationDuration = `${20 + index * 5}s`;
            circle.style.animationDelay = `${index * 2}s`;
        }
    });
}

// Update Background Effects on Theme Change
function updateBackgroundEffects() {
    const isDark = document.body.classList.contains('dark-theme');
    const shapes = document.querySelector('.floating-shapes');

    if (shapes) {
        if (isDark) {
            shapes.style.filter = 'blur(40px) brightness(0.8)';
        } else {
            shapes.style.filter = 'blur(40px) brightness(1)';
        }
    }
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
            // Simulate form submission with animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;

            // Add sending animation
            const formElements = contactForm.querySelectorAll('input, select, textarea');
            formElements.forEach(el => {
                el.style.transition = 'all 0.3s ease';
                el.style.opacity = '0.7';
                el.style.transform = 'translateY(-5px)';
            });

            setTimeout(() => {
                // Success animation
                formElements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });

                // Success message with animation
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.</span>
                `;
                successMsg.style.cssText = `
                    background: linear-gradient(135deg, #4CAF50, #388E3C);
                    color: white;
                    padding: 20px;
                    border-radius: var(--border-radius-md);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: 20px;
                    animation: slideInUp 0.5s ease;
                `;

                contactForm.appendChild(successMsg);

                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    // Remove success message
                    setTimeout(() => {
                        successMsg.style.animation = 'slideOutDown 0.5s ease';
                        setTimeout(() => successMsg.remove(), 500);
                    }, 3000);
                }, 1000);
            }, 2000);
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error';
    error.style.cssText = `
        color: var(--secondary-color);
        font-size: 14px;
        margin-top: 5px;
        animation: shake 0.5s ease;
    `;
    error.textContent = message;

    field.parentNode.appendChild(error);

    // Add error class to input
    field.style.borderBottomColor = 'var(--secondary-color)';

    // Shake animation
    field.style.animation = 'shake 0.5s ease';
    setTimeout(() => field.style.animation = '', 500);

    // Remove error on input
    field.addEventListener('input', () => {
        error.remove();
        field.style.borderBottomColor = '';
        field.style.animation = '';
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
            tag.style.transform = 'translateY(-2px) scale(1.05)';
            tag.style.boxShadow = '0 4px 12px rgba(156, 39, 176, 0.2)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.boxShadow = 'none';
        });
    });
}

// Initialize tag interactions
document.addEventListener('DOMContentLoaded', initTagInteractions);

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

// Parallax Effect for Background
function initParallax() {
    window.addEventListener('scroll', updateParallax);
}

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes, .gradient-overlay, .geometric-grid');

    parallaxElements.forEach((el, index) => {
        const speed = 0.3 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
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

                // Add staggered animation for child elements
                const content = entry.target.querySelector('.timeline-content');
                if (content) {
                    content.style.animation = 'slideInRight 0.5s ease 0.2s both';
                }
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

// Initialize timeline animations
document.addEventListener('DOMContentLoaded', initTimelineAnimations);

// Additional CSS animations for success messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(20px);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(-20px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);