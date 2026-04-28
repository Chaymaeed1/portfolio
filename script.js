/**
 * Portfolio Script - Chaymae ED_DRYAF
 * Features: Cursor, Loader, Reveal, Typed, Counter, Form, Magnetic, Tilt, Parallax, Spotlight
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initTextSplitting();
    initReveal();
    initTyped();
    initHeader();
    initStats();
    initContactForm();
    initSmoothScroll();
    initMagnetic();
    initTilt();
    initScrollProgress();
    initParallax();
    initLighting();
    initBackToTop();
    initTechBackground();
    initMobileMenu();
    initTyped();
    initCodeFragments();
});

/* ── LOADER ── */
function initLoader() {
    const loader = document.getElementById('js-loader');
    const progressBar = document.getElementById('js-loader-bar');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('loader--hidden');
                document.body.style.cursor = 'auto';
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
}

/* ── CUSTOM CURSOR ── */
function initCursor() {
    const cursor = document.getElementById('js-cursor');
    const ring = document.getElementById('js-cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isSnapped = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        
        // Update lighting CSS variables
        document.documentElement.style.setProperty('--x', `${mouseX}px`);
        document.documentElement.style.setProperty('--y', `${mouseY}px`);
    });

    function animate() {
        if (!isSnapped) {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
        }
        requestAnimationFrame(animate);
    }
    animate();

    const interactables = document.querySelectorAll('a, button, .tag, .project-card, .contact-link');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--clr-primary)';
            
            // Snap effect for buttons
            if (el.classList.contains('btn') || el.classList.contains('nav__link') || el.classList.contains('contact-link')) {
                isSnapped = true;
                const rect = el.getBoundingClientRect();
                ring.classList.add('cursor-ring--snap');
                ring.style.width = `${rect.width + 10}px`;
                ring.style.height = `${rect.height + 10}px`;
                ring.style.left = `${rect.left + rect.width / 2}px`;
                ring.style.top = `${rect.top + rect.height / 2}px`;
            } else {
                ring.style.width = '60px';
                ring.style.height = '60px';
                ring.style.borderColor = 'var(--clr-secondary)';
            }
        });

        el.addEventListener('mouseleave', () => {
            isSnapped = false;
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.backgroundColor = 'var(--clr-primary)';
            cursor.style.border = 'none';
            
            ring.classList.remove('cursor-ring--snap');
            ring.style.width = '40px';
            ring.style.height = '40px';
            ring.style.borderColor = 'var(--clr-primary)';
        });
    });
}

/* ── LIGHTING EFFECT ── */
function initLighting() {
    // Already handled in cursor mousemove for performance
}

/* ── TEXT SPLITTING ── */
function initTextSplitting() {
    const targets = document.querySelectorAll('.section-title, .hero__title');
    targets.forEach(target => {
        const text = target.innerText;
        target.innerHTML = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.className = 'char';
            span.style.transitionDelay = `${i * 30}ms`;
            target.appendChild(span);
        });
    });
}

/* ── REVEAL ON SCROLL ── */
function initReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    const chars = entry.target.querySelectorAll('.char');
                    chars.forEach(c => c.classList.add('revealed'));
                }, delay * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
}

/* ── MAGNETIC EFFECT ── */
function initMagnetic() {
    const magneticElements = document.querySelectorAll('.btn--primary, .btn--ghost, .nav__logo');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
        });
    });
}

/* ── 3D TILT EFFECT ── */
function initTilt() {
    const tiltElements = document.querySelectorAll('.project-card, .photo-frame');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        });
    });
}

/* ── SCROLL PROGRESS ── */
function initScrollProgress() {
    const progress = document.getElementById('js-scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progress) progress.style.width = scrolled + "%";
    });
}

/* ── PARALLAX EFFECT ── */
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        const elements = document.querySelectorAll('.bg-shape, .floating-icon');
        elements.forEach((el, index) => {
            const factor = (index % 5 + 1) * 2;
            el.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });
}

/* ── TYPED EFFECT ── */
function initTyped() {
    const target = document.getElementById('js-typed');
    if (!target) return;

    const phrases = [
        'Développeuse Full Stack',
        'Créatrice de solutions web',
        'Experte Spring Boot & Angular',
        'Passionnée par l\'innovation'
    ];
    let i = 0;
    let j = 0;
    let currentPhrase = [];
    let isDeleting = false;
    let speed = 100;

    function loop() {
        target.innerText = currentPhrase.join('');
        if (i < phrases.length) {
            if (!isDeleting && j <= phrases[i].length) {
                currentPhrase.push(phrases[i][j]);
                j++;
                speed = 100;
            }

            if (isDeleting && j <= phrases[i].length) {
                currentPhrase.pop();
                j--;
                speed = 50;
            }

            if (j === phrases[i].length) {
                isDeleting = true;
                speed = 2000;
            }

            if (isDeleting && j === 0) {
                currentPhrase = [];
                isDeleting = false;
                i++;
                if (i === phrases.length) i = 0;
            }
        }
        setTimeout(loop, speed);
    }
    loop();
}

/* ── CODE FRAGMENTS ── */
function initCodeFragments() {
    const layer = document.getElementById('js-tech-layer');
    if (!layer) return;

    const codes = ['const x = 1;', 'function()', '<div>', 'npm i', 'git push', 'API.get()', 'return true;', 'import React'];
    
    setInterval(() => {
        const frag = document.createElement('div');
        frag.className = 'code-fragment';
        frag.innerText = codes[Math.floor(Math.random() * codes.length)];
        frag.style.left = `${Math.random() * 100}%`;
        frag.style.top = `${Math.random() * 100}%`;
        frag.style.fontSize = `${0.5 + Math.random() * 0.4}rem`;
        layer.appendChild(frag);

        setTimeout(() => frag.remove(), 20000);
    }, 4000);
}

/* ── TECH BACKGROUND ── */
function initTechBackground() {
    const layer = document.getElementById('js-tech-layer');
    if (!layer) return;

    const dataContents = ['<CODE>', '{JSON}', '0101', 'HEX', 'JAVA', 'SPRING', 'UI/UX', 'API'];
    const count = 20;

    for (let i = 0; i < count; i++) {
        const bit = document.createElement('div');
        bit.className = 'data-bit';
        bit.innerText = dataContents[Math.floor(Math.random() * dataContents.length)];
        bit.style.left = `${Math.random() * 100}%`;
        bit.style.top = `${Math.random() * 100}%`;
        bit.style.animationDelay = `${Math.random() * 5}s`;
        bit.style.fontSize = `${0.5 + Math.random() * 0.5}rem`;
        layer.appendChild(bit);

        if (i % 2 === 0) {
            const glow = document.createElement('div');
            glow.className = 'glow-point';
            glow.style.left = `${Math.random() * 100}%`;
            glow.style.top = `${Math.random() * 100}%`;
            glow.style.animationDelay = `${Math.random() * 4}s`;
            layer.appendChild(glow);
        }
    }
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
    const toggle = document.getElementById('js-nav-toggle');
    const menu = document.getElementById('js-nav-links');
    const links = document.querySelectorAll('.nav__link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('nav__list--active');
        toggle.classList.toggle('nav__toggle--active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';

        if (isActive) {
            links.forEach((link, i) => {
                link.style.transitionDelay = `${0.2 + i * 0.1}s`;
            });
        } else {
            links.forEach(link => {
                link.style.transitionDelay = '0s';
            });
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('nav__list--active');
            toggle.classList.remove('nav__toggle--active');
            document.body.style.overflow = 'auto';
        });
    });
}

/* ── BACK TO TOP ── */
function initBackToTop() {
    const btn = document.getElementById('js-back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ── TYPED EFFECT ── */
function initTyped() {
    const target = document.getElementById('js-typed');
    if (!target) return;
    const words = [
        'Spécialiste Java Spring Boot',
        'Experte Angular & Frontend',
        'Passionnée d\'Architectures Web',
        'Créatrice de Solutions Innovantes'
    ];
    let wordIdx = 0, charIdx = 0, isDeleting = false, speed = 100;
    function type() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
            target.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            speed = 50;
        } else {
            target.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            speed = 100;
        }
        if (!isDeleting && charIdx === currentWord.length) {
            isDeleting = true;
            speed = 2000;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    type();
}

/* ── HEADER SCROLL ── */
function initHeader() {
    const header = document.getElementById('js-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
}

/* ── STATS COUNTER ── */
function initStats() {
    const stats = document.querySelectorAll('.stat__num');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetNum = parseInt(entry.target.getAttribute('data-count'));
                let current = 0;
                const duration = 2000;
                const increment = targetNum / (duration / 16);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetNum) {
                        entry.target.textContent = targetNum;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(s => observer.observe(s));
}

/* ── CONTACT FORM ── */
function initContactForm() {
    const form = document.getElementById('js-contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('js-submit-btn');
        const success = document.getElementById('js-form-success');
        btn.querySelector('.btn__text').hidden = true;
        btn.querySelector('.btn__icon').hidden = true;
        btn.querySelector('.btn__loading').hidden = false;
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                form.reset();
                success.hidden = false;
                btn.hidden = true;
            } else {
                alert('Oups ! Un problème est survenu lors de l\'envoi.');
            }
        } catch (error) {
            alert('Erreur réseau. Veuillez réessayer plus tard.');
        } finally {
            btn.querySelector('.btn__text').hidden = false;
            btn.querySelector('.btn__icon').hidden = false;
            btn.querySelector('.btn__loading').hidden = true;
        }
    });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}