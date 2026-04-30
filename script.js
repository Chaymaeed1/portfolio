/**
 * Portfolio Script - Chaymae ED_DRYAF
 * Features: Cursor, Loader, Reveal, Typed, Counter, Form, Magnetic, Tilt, Parallax, Spotlight
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initTheme();
    initI18n();
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
        const text = target.getAttribute('data-original-text') || target.innerText;
        if (!target.hasAttribute('data-original-text')) {
            target.setAttribute('data-original-text', text);
        }
        target.innerHTML = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.className = 'char';
            span.style.transitionDelay = `${i * 30}ms`;
            // Add animation delay for wave effect if it's the hero title
            if (target.classList.contains('hero__title')) {
                span.style.animationDelay = `${i * 0.1}s`;
            }
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
            
            // Pause animation if it's the photo frame to avoid conflicts
            if (el.classList.contains('photo-frame')) {
                el.style.animation = 'none';
            }
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            
            // Resume animation if it's the photo frame
            if (el.classList.contains('photo-frame')) {
                el.style.animation = 'float 8s ease-in-out infinite';
            }
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

/* ── THEME SYSTEM ── */
function initTheme() {
    const toggle = document.getElementById('js-theme-toggle');
    const body = document.body;
    const icon = toggle.querySelector('i');

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    toggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

/* ── I18N SYSTEM ── */
const translations = {
    fr: {
        nav_home: "Accueil",
        nav_skills: "Compétences",
        nav_projects: "Projets",
        nav_path: "Parcours",
        nav_contact: "Contact",
        nav_cv: "CV",
        hero_eyebrow_1: "Développeuse Full Stack",
        hero_eyebrow_2: "Disponible",
        hero_bio: "<strong>Développeuse Full Stack</strong> spécialisée dans la création d’applications web performantes et intelligentes. J’accompagne entreprises et porteurs de projets dans la conception de solutions digitales modernes, en combinant développement full stack, architecture évolutive et intégration de fonctionnalités basées sur <strong>L’Intelligence Artificielle</strong>. Orientée résultats et innovation, je transforme des idées en produits digitaux à forte valeur ajoutée.",
        hero_cta_contact: "Me contacter",
        hero_cta_projects: "Voir les projets",
        hero_stat_projects: "Projets clés",
        hero_stat_exp: "Expériences",
        hero_stat_lang: "Langues",
        hero_status: "<span class='status-dot'></span>Disponible · Tétouan, Maroc",
        section_skills_title: "Mes <em>Expertises</em>",
        section_skills_subtitle: "Un profil technique complet alliant maîtrise du code, des bases de données et des soft skills essentiels.",
        skill_group_1: "Langages & Frameworks",
        skill_group_2: "Bases de Données",
        skill_group_3: "Outils & DevOps",
        skill_group_4: "Modélisation & Analyse",
        skill_group_soft: "Soft Skills",
        skill_lang: "Langues",
        section_projects_title: "Projets <em>Clés</em>",
        section_projects_subtitle: "Réalisations concrètes démontrant mes compétences en développement",
        project_features: "Fonctionnalités",
        project_1_title: "Système de Gestion d'Usine",
        project_1_desc: "Application complète pour la gestion des produits finis, matières premières et stocks. Suivi de production et rapports analytiques en temps réel.",
        project_1_f1: "Gestion des stocks automatisée",
        project_1_f2: "Suivi de production en temps réel",
        project_1_f3: "Rapports analytiques",
        project_1_f4: "Interface administrateur complète",
        project_2_title: "Application Fitness",
        project_2_desc: "Plateforme interactive pour le suivi des entraînements et objectifs. Système personnalisé avec notifications et historique des performances.",
        project_2_f1: "Programmes d'entraînement personnalisés",
        project_2_f2: "Suivi des performances",
        project_2_f3: "Notifications et rappels",
        project_2_f4: "Historique complet",
        project_3_title: "Plateforme E-commerce",
        project_3_desc: "Site e-commerce complet avec gestion des produits, utilisateurs et commandes. Interface intuitive et système de paiement sécurisé.",
        project_3_f1: "Catalogue produits dynamique",
        project_3_f2: "Panier d'achat",
        project_3_f3: "Système de paiement",
        project_3_f4: "Gestion des commandes",
        project_4_title: "AI Personal Growth Hub",
        project_4_desc: "Système d’agent IA modulaire évolutif combinant coaching de carrière, aide à l’apprentissage, génération de startups et gestion de productivité avec mémoire long terme.",
        project_4_f1: "Agent IA avec routage intelligent",
        project_4_f2: "Analyse de carrière & CV",
        project_4_f3: "Générateur & Validateur d'idées",
        project_4_f4: "Système de mémoire long terme (RAG)",
        section_exp_title: "Parcours <em>Professionnel</em>",
        section_exp_subtitle: "Expériences et formations qui ont forgé mon expertise",
        exp_col_1: "Expériences Professionnelles",
        exp_col_2: "Formations & Certifications",
        exp_1_t1: "Conception et développement de solutions Full Stack",
        exp_1_t2: "Participation à l'architecture applicative",
        exp_1_t3: "Optimisation et maintenance du code",
        exp_1_t4: "Travail collaboratif en environnement technique",
        exp_2_t1: "Développement d'une application web de lavage automobile",
        exp_2_t2: "Travail en équipe agile",
        exp_2_t3: "Intégration d'interfaces utilisateur",
        exp_2_t4: "Contribution à la gestion de la base de données",
        exp_3_t1: "Développement d'un site web interne pour la gestion des services",
        exp_3_t2: "Mise à jour des procédures IT",
        exp_3_t3: "Optimisation des processus numériques",
        exp_4_t1: "Organisation des archives via Excel",
        exp_4_t2: "Installation et mise à jour d'applications internes",
        exp_4_t3: "Support technique aux utilisateurs",
        section_contact_title: "Travaillons <em>Ensemble</em>",
        section_contact_subtitle: "À la recherche active d'une alternance ou d'un stage en développement.",
        contact_avail: "Disponible immédiatement",
        contact_pitch: "Je suis ouverte à toute opportunité d'alternance, de stage ou de collaboration sur des projets ambitieux. Contactez-moi par le formulaire ou via mes réseaux.",
        form_name: "Nom Complet",
        form_email: "Adresse Email",
        form_subject: "Sujet",
        form_subject_opt_0: "Sélectionner…",
        form_subject_opt_1: "Proposition d'alternance",
        form_subject_opt_2: "Proposition de stage",
        form_subject_opt_3: "Projet de développement",
        form_subject_opt_4: "Autre",
        form_message: "Message",
        form_submit: "Envoyer le message",
        form_success: "<i class='fas fa-check-circle'></i> Message envoyé ! Je vous répondrai dans les plus brefs délais.",
        footer_credits: "&copy; 2026 Crafted with Passion by Chaymae ED_DRYAF",
        soft_1_name: "Travail d'équipe",
        soft_1_desc: "Collaboration & communication claire",
        soft_2_name: "Leadership",
        soft_2_desc: "Prise d'initiative & responsabilité",
        soft_3_name: "Gestion de projets",
        soft_3_desc: "Organisation & planification efficace",
        soft_4_name: "Résolution de problèmes",
        soft_4_desc: "Esprit analytique & adaptabilité",
        soft_5_name: "Apprentissage continu",
        soft_5_desc: "Curiosité & développement personnel",
        lang_1_name: "Arabe",
        lang_2_name: "Français",
        lang_3_name: "Anglais",
        lang_4_name: "Amazigh",
        lang_level_native: "Langue maternelle",
        lang_level_fluent: "Courant",
        contact_phone: "Téléphone",
        contact_email: "Email",
        contact_linkedin: "LinkedIn",
        contact_github: "GitHub",
        contact_cv_download: "Télécharger le CV",
        contact_cv_desc: "CV complet au format PDF",
        typed_words: ["Spécialiste Java Spring Boot", "Experte Angular & Frontend", "Passionnée d'Architectures Web", "Créatrice de Solutions Innovantes"]
    },
    en: {
        nav_home: "Home",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_path: "Path",
        nav_contact: "Contact",
        nav_cv: "Resume",
        hero_eyebrow_1: "Full Stack Developer",
        hero_eyebrow_2: "Available",
        hero_bio: "<strong>Full Stack Developer</strong> specializing in creating high-performance and intelligent web applications. I support companies and project owners in the design of modern digital solutions, combining full stack development, scalable architecture, and integration of features based on <strong>Artificial Intelligence</strong>. Results-oriented and innovative, I transform ideas into high-value digital products.",
        hero_cta_contact: "Contact Me",
        hero_cta_projects: "View Projects",
        hero_stat_projects: "Key Projects",
        hero_stat_exp: "Experiences",
        hero_stat_lang: "Languages",
        hero_status: "<span class='status-dot'></span>Available · Tetouan, Morocco",
        section_skills_title: "My <em>Expertise</em>",
        section_skills_subtitle: "A complete technical profile combining mastery of code, databases, and essential soft skills.",
        skill_group_1: "Languages & Frameworks",
        skill_group_2: "Databases",
        skill_group_3: "Tools & DevOps",
        skill_group_4: "Modeling & Analysis",
        skill_group_soft: "Soft Skills",
        skill_lang: "Languages",
        section_projects_title: "Key <em>Projects</em>",
        section_projects_subtitle: "Concrete achievements demonstrating my development skills",
        project_features: "Features",
        project_1_title: "Factory Management System",
        project_1_desc: "Complete application for managing finished products, raw materials, and stocks. Production tracking and real-time analytical reports.",
        project_1_f1: "Automated stock management",
        project_1_f2: "Real-time production tracking",
        project_1_f3: "Analytical reports",
        project_1_f4: "Full admin interface",
        project_2_title: "Fitness Application",
        project_2_desc: "Interactive platform for tracking workouts and goals. Personalized system with notifications and performance history.",
        project_2_f1: "Personalized training programs",
        project_2_f2: "Performance tracking",
        project_2_f3: "Notifications and reminders",
        project_2_f4: "Full history",
        project_3_title: "E-commerce Platform",
        project_3_desc: "Full e-commerce site with product, user, and order management. Intuitive interface and secure payment system.",
        project_3_f1: "Dynamic product catalog",
        project_3_f2: "Shopping cart",
        project_3_f3: "Payment system",
        project_3_f4: "Order management",
        project_4_title: "AI Personal Growth Hub",
        project_4_desc: "Scalable modular AI agent system combining career coaching, learning assistance, startup generation, and productivity management with long-term memory.",
        project_4_f1: "AI Agent with smart routing",
        project_4_f2: "Career & CV Analysis",
        project_4_f3: "Idea Generator & Validator",
        project_4_f4: "Long-term memory system (RAG)",
        section_exp_title: "Professional <em>Path</em>",
        section_exp_subtitle: "Experiences and training that forged my expertise",
        exp_col_1: "Professional Experiences",
        exp_col_2: "Training & Certifications",
        exp_1_t1: "Design and development of Full Stack solutions",
        exp_1_t2: "Participation in application architecture",
        exp_1_t3: "Code optimization and maintenance",
        exp_1_t4: "Collaborative work in a technical environment",
        exp_2_t1: "Development of a car wash web application",
        exp_2_t2: "Agile teamwork",
        exp_2_t3: "User interface integration",
        exp_2_t4: "Contribution to database management",
        exp_3_t1: "Development of an internal website for service management",
        exp_3_t2: "Updating IT procedures",
        exp_3_t3: "Digital process optimization",
        exp_4_t1: "Archive organization via Excel",
        exp_4_t2: "Installation and updating of internal applications",
        exp_4_t3: "Technical support to users",
        section_contact_title: "Let's Work <em>Together</em>",
        section_contact_subtitle: "Actively looking for an apprenticeship or a development internship.",
        contact_avail: "Immediately available",
        contact_pitch: "I am open to any apprenticeship, internship, or collaboration opportunity on ambitious projects. Contact me via the form or my networks.",
        form_name: "Full Name",
        form_email: "Email Address",
        form_subject: "Subject",
        form_subject_opt_0: "Select…",
        form_subject_opt_1: "Apprenticeship proposal",
        form_subject_opt_2: "Internship proposal",
        form_subject_opt_3: "Development project",
        form_subject_opt_4: "Other",
        form_message: "Message",
        form_submit: "Send Message",
        form_success: "<i class='fas fa-check-circle'></i> Message sent! I will respond to you as soon as possible.",
        footer_credits: "&copy; 2026 Crafted with Passion by Chaymae ED_DRYAF",
        soft_1_name: "Teamwork",
        soft_1_desc: "Clear collaboration & communication",
        soft_2_name: "Leadership",
        soft_2_desc: "Initiative taking & responsibility",
        soft_3_name: "Project Management",
        soft_3_desc: "Effective organization & planning",
        soft_4_name: "Problem Solving",
        soft_4_desc: "Analytical mind & adaptability",
        soft_5_name: "Continuous Learning",
        soft_5_desc: "Curiosity & personal development",
        lang_1_name: "Arabic",
        lang_2_name: "French",
        lang_3_name: "English",
        lang_4_name: "Amazigh",
        lang_level_native: "Native speaker",
        lang_level_fluent: "Fluent",
        contact_phone: "Phone",
        contact_email: "Email",
        contact_linkedin: "LinkedIn",
        contact_github: "GitHub",
        contact_cv_download: "Download Resume",
        contact_cv_desc: "Full Resume in PDF format",
        typed_words: ["Java Spring Boot Specialist", "Angular & Frontend Expert", "Passionate about Web Architectures", "Creator of Innovative Solutions"]
    }
};

let currentLang = 'fr';
let typedInstance = null;

function initI18n() {
    const toggle = document.getElementById('js-lang-toggle');
    currentLang = localStorage.getItem('portfolio-lang') || 'fr';
    
    updateLanguage();

    toggle.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('portfolio-lang', currentLang);
        updateLanguage();
        
        // Re-init typed with new language
        if (typedInstance) clearTimeout(typedInstance);
        initTyped();
        
        // Re-init text splitting for section titles
        initTextSplitting();
    });
}

function updateLanguage() {
    const toggle = document.getElementById('js-lang-toggle');
    toggle.innerText = currentLang === 'fr' ? 'EN' : 'FR';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

/* ── TYPED EFFECT ── */
function initTyped() {
    const target = document.getElementById('js-typed');
    if (!target) return;
    
    const words = translations[currentLang].typed_words;
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
        
        typedInstance = setTimeout(type, speed);
    }
    type();
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
