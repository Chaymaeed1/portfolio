/**
 * CHAYMAE ED_DRYAF — Portfolio
 * script.js  |  Modules: Loader, Cursor, Nav, Typed, Counter, Reveal, Form
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   LOADER
═══════════════════════════════════════════════════════════════ */
class Loader {
    constructor() {
        this.el = document.getElementById('js-loader');
        this.progress = document.getElementById('js-loader-bar');
        if (!this.el) return;
        this.init();
    }

    init() {
        // Block scroll during load
        document.body.style.overflow = 'hidden';

        // Animate progress bar to 100% then hide
        requestAnimationFrame(() => {
            this.progress.style.width = '100%';
        });

        setTimeout(() => {
            this.el.classList.add('is-done');
            document.body.style.overflow = '';
            // Fire reveal for hero elements
            document.querySelectorAll('#home [data-reveal]').forEach(el => {
                el.classList.add('is-visible');
            });
        }, 1800);
    }
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════ */
class Cursor {
    constructor() {
        this.dot = document.getElementById('js-cursor');
        this.ring = document.getElementById('js-cursor-ring');
        if (!this.dot || !this.ring || window.matchMedia('(pointer:coarse)').matches) return;

        this.mx = 0;
        this.my = 0;
        this.rx = 0;
        this.ry = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', e => {
            this.mx = e.clientX;
            this.my = e.clientY;
            this.dot.style.transform = `translate(${this.mx}px, ${this.my}px) translate(-50%,-50%)`;
        });

        document.addEventListener('mousedown', () => this.dot.classList.add('cursor--click'));
        document.addEventListener('mouseup', () => this.dot.classList.remove('cursor--click'));

        // Hover state on interactive elements
        const hoverEls = 'a, button, .tag, .tech-pill, .project-card, .soft-item, .lang-card, .contact-link, .timeline__entry';
        document.querySelectorAll(hoverEls).forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.dot.classList.add('cursor--hover');
                this.ring.classList.add('cursor--hover');
            });
            el.addEventListener('mouseleave', () => {
                this.dot.classList.remove('cursor--hover');
                this.ring.classList.remove('cursor--hover');
            });
        });

        this.animateRing();
    }

    animateRing() {
        this.rx += (this.mx - this.rx - 19) * 0.13;
        this.ry += (this.my - this.ry - 19) * 0.13;
        this.ring.style.transform = `translate(${this.rx}px, ${this.ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(() => this.animateRing());
    }
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════ */
class Navigation {
    constructor() {
        this.header = document.getElementById('js-header');
        this.hamburger = document.getElementById('js-hamburger');
        this.navLinks = document.getElementById('js-nav-links');
        this.links = document.querySelectorAll('.nav__link');
        this.sections = document.querySelectorAll('section[id]');
        this.isOpen = false;

        this.init();
    }

    init() {
        // Scroll: header style + active link
        window.addEventListener('scroll', () => {
            this.onScroll();
        }, { passive: true });

        // Hamburger toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        // Smooth scroll on all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (id === '#') return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                this.closeMenu();
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            });
        });
    }

    onScroll() {
        // Header background
        this.header.classList.toggle('is-scrolled', window.scrollY > 80);

        // Active section highlight
        const scrollPos = window.scrollY + 120;
        this.sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                this.links.forEach(link => {
                    link.classList.toggle('is-active', link.dataset.section === id);
                });
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.hamburger.classList.toggle('is-open', this.isOpen);
        this.hamburger.setAttribute('aria-expanded', this.isOpen);
        this.navLinks.classList.toggle('nav__links--mobile-open', this.isOpen);
    }

    closeMenu() {
        this.isOpen = false;
        this.hamburger ? .classList.remove('is-open');
        this.hamburger ? .setAttribute('aria-expanded', 'false');
        this.navLinks ? .classList.remove('nav__links--mobile-open');
    }
}

/* ═══════════════════════════════════════════════════════════════
   TYPED TEXT EFFECT
═══════════════════════════════════════════════════════════════ */
class TypeWriter {
    constructor(el, phrases, options = {}) {
        this.el = el;
        this.phrases = phrases;
        this.typeSpeed = options.typeSpeed || 85;
        this.deleteSpeed = options.deleteSpeed || 45;
        this.pauseTime = options.pauseTime || 2200;
        this.startDelay = options.startDelay || 1900;

        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;

        if (this.el) setTimeout(() => this.tick(), this.startDelay);
    }

    tick() {
        if (this.isPaused) return;

        const current = this.phrases[this.phraseIndex];

        if (this.isDeleting) {
            this.el.textContent = current.slice(0, --this.charIndex);
        } else {
            this.el.textContent = current.slice(0, ++this.charIndex);
        }

        // Reached end of phrase → pause then delete
        if (!this.isDeleting && this.charIndex === current.length) {
            this.isPaused = true;
            setTimeout(() => {
                this.isPaused = false;
                this.isDeleting = true;
                this.tick();
            }, this.pauseTime);
            return;
        }

        // Finished deleting → move to next phrase
        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        }

        setTimeout(() => this.tick(), this.isDeleting ? this.deleteSpeed : this.typeSpeed);
    }
}

/* ═══════════════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════════════ */
class Counter {
    constructor() {
        this.els = document.querySelectorAll('.stat__num[data-count]');
        if (!this.els.length) return;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                this.animate(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.6 });

        this.els.forEach(el => observer.observe(el));
    }

    animate(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const fps = 60;
        const frames = (duration / 1000) * fps;
        const step = target / frames;
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 1000 / fps);
    }
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════════ */
class ScrollReveal {
    constructor() {
        this.els = document.querySelectorAll('[data-reveal]');
        if (!this.els.length) return;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                // Don't unobserve — keeps state if scrolled back
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -56px 0px'
        });

        this.els.forEach(el => {
            // Skip hero elements (handled by loader)
            if (el.closest('#home')) return;
            observer.observe(el);
        });
    }
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════════════ */
class ContactForm {
    constructor() {
        this.form = document.getElementById('js-contact-form');
        this.submitBtn = document.getElementById('js-submit-btn');
        this.success = document.getElementById('js-form-success');
        if (!this.form) return;

        this.validators = {
            'cf-name': { required: true, message: 'Le nom est requis.' },
            'cf-email': { required: true, isEmail: true, message: 'Email invalide.' },
            'cf-sujet': { required: true, message: 'Veuillez sélectionner un sujet.' },
            'cf-message': { required: true, minLength: 20, message: 'Le message doit contenir au moins 20 caractères.' },
        };

        this.init();
    }

    init() {
        this.form.addEventListener('submit', e => this.onSubmit(e));

        // Live validation on blur
        Object.keys(this.validators).forEach(id => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('blur', () => this.validateField(id));
                field.addEventListener('input', () => this.clearError(id));
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.validateAll()) return;
        this.setLoading(true);

        // Submit via fetch to Formspree (AJAX)
        fetch(this.form.action, {
                method: 'POST',
                body: new FormData(this.form),
                headers: { 'Accept': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    this.onSuccess();
                } else {
                    this.onError();
                }
            })
            .catch(() => this.onError())
            .finally(() => this.setLoading(false));
    }

    validateAll() {
        let valid = true;
        Object.keys(this.validators).forEach(id => {
            if (!this.validateField(id)) valid = false;
        });
        return valid;
    }

    validateField(id) {
        const field = document.getElementById(id);
        const rules = this.validators[id];
        const value = field ? .value ? .trim() || '';
        let message = '';

        if (rules.required && !value) {
            message = rules.message;
        } else if (rules.isEmail && value && !this.isEmail(value)) {
            message = rules.message;
        } else if (rules.minLength && value.length < rules.minLength) {
            message = rules.message;
        }

        this.setError(id, message);
        return !message;
    }

    setError(id, message) {
        const field = document.getElementById(id);
        const error = field?.parentElement?.querySelector('.form-error');
        if (error) error.textContent = message;
        field?.classList.toggle('is-invalid', !!message);
    }

    clearError(id) {
        this.setError(id, '');
    }

    isEmail(value) {
        return /^[^\s@]+@[^\s@]+(?:\.[^\s@]+)+$/.test(value);
    }

    setLoading(state) {
        const text = this.submitBtn.querySelector('.btn__text');
        const icon = this.submitBtn.querySelector('.btn__icon');
        const spinner = this.submitBtn.querySelector('.btn__loading');

        this.submitBtn.disabled = state;
        if (text) text.hidden = state;
        if (icon) icon.hidden = state;
        if (spinner) spinner.hidden = !state;
    }

    onSuccess() {
        this.form.reset();
        if (this.success) this.success.hidden = false;
        setTimeout(() => {
            if (this.success) this.success.hidden = true;
        }, 6000);
    }

    onError() {
        // Surface a generic error in the first error span
        const first = this.form.querySelector('.form-error');
        if (first) {
            first.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            setTimeout(() => { first.textContent = ''; }, 5000);
        }
    }
}

/* ═══════════════════════════════════════════════════════════════
   INIT — DOMContentLoaded
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    new Loader();
    new Cursor();
    new Navigation();

    new TypeWriter(
        document.getElementById('js-typed'), [
            'Java Spring Boot Expert',
            'Développeuse Full Stack',
            'Spécialiste Bases de Données',
            'Passionnée d\'Innovation',
        ]
    );

    new Counter();
    new ScrollReveal();
    new ContactForm();
});