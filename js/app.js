// ============================================
// CROCSCALE IA - JavaScript Principal  
// Automatización con IA para E-commerce
// ============================================

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initEmailJS();
});

// Función principal de inicialización
function initializeApp() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupHeaderScroll();
    setupScrollAnimations();
    setupCTATracking();
    initConsoleMessage();
}

// ============ MENÚ MÓVIL (ROBUSTO Y TÁCTIL) ============
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) {
        console.warn('⚠️ Nav toggle o nav menu no encontrado');
        return;
    }
    
    console.log('✅ Menu mobile CrocScale inicializado');
    
    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const isActive = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
        navToggle.setAttribute('aria-expanded', isActive);
    }
    
    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Click & Touch listeners
    navToggle.addEventListener('click', toggleMenu);
    navToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMenu(e);
    }, { passive: false });
    
    // Cerrar al hacer clic en cualquier enlace
    const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
    
    // Cerrar al hacer clic afuera
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ============ NAVEGACIÓN SUAVE ============
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============ EFECTOS DE HEADER AL SCROLL ============
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ============ ANIMACIONES DE SCROLL ============
function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.service-card, .case-card, .problem-card, .benefit-item, .testimonial-card, .step-item, .hero-badge, .hero-stats, .pricing-card')
        .forEach(el => observer.observe(el));
}

// ============ TRACKING DE CTAs ============
function setupCTATracking() {
    document.querySelectorAll('.cta-button, .demo-btn, .case-link').forEach(function(button) {
        button.addEventListener('click', function() {
            console.log('CTA Click:', this.textContent.trim());
        });
    });
}

// ============ FUNCIÓN PARA SCROLL A SECCIÓN ============
window.scrollToSection = function(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
};

// ============ MENSAJE DE CONSOLA ============
function initConsoleMessage() {
    console.log('%c🐊 CrocScale IA', 'color: #00f2fe; font-size: 22px; font-weight: bold;');
    console.log('%cAutomation Built to Scale — https://crocscale.com', 'color: #9d4edd; font-size: 14px;');
}

// ============ ESTILOS CSS DINÁMICOS ============
const style = document.createElement('style');
style.textContent = `
    .service-card, .case-card, .problem-card, .benefit-item, .testimonial-card, .step-item, .pricing-card {
        opacity: 0;
        transform: translateY(25px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .service-card.animate-in, .case-card.animate-in, .problem-card.animate-in, 
    .benefit-item.animate-in, .testimonial-card.animate-in, .step-item.animate-in, .pricing-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    @media (min-width: 969px) {
        .nav-toggle { display: none !important; }
    }
`;
document.head.appendChild(style);

// ============ EMAILJS CONFIGURATION & FORM ============
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('4bupfioQ6sBuwdkOU');
    }
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            business: document.getElementById('business').value,
            message: document.getElementById('message').value
        };
        
        const waMsg = encodeURIComponent(`Hola CrocScale! Mi nombre es ${templateParams.name} (${templateParams.email}, Tel: ${templateParams.phone}). Mi negocio es ${templateParams.business}. Consulta: ${templateParams.message}`);
        const waUrl = `https://wa.me/5491130960114?text=${waMsg}`;

        formMessage.innerHTML = '¡Formulario recibido! Redirigiendo a WhatsApp... <a href="' + waUrl + '" target="_blank" style="color: #00C6FF; font-weight: bold; text-decoration: underline;">Haz clic aquí si no abre automáticamente</a>';
        formMessage.className = 'form-message success';
        
        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_bpjxmaa', 'template_foyunhx', templateParams).catch(function(err) {
                console.warn('EmailJS fallback active:', err);
            });
        }

        setTimeout(function() {
            window.open(waUrl, '_blank');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            contactForm.reset();
        }, 1000);
    });
}