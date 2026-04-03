/**
 * Creestudios Login Page Functionality
 * Handles: Password Toggle, Scroll Animations, Stats Counting, and Form Submission
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Password Visibility Toggle
    const passwordInput = document.getElementById('password-input-field');
    const togglePasswordBtn = document.getElementById('toggle-password-visibility-btn');
    const toggleIcon = document.getElementById('password-toggle-icon');

    if (togglePasswordBtn && passwordInput && toggleIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon based on state
            if (type === 'text') {
                toggleIcon.src = 'Assets/Shown Icon.png';
                toggleIcon.alt = 'Hide password';
            } else {
                toggleIcon.src = 'Assets/Hidden Icon.png';
                toggleIcon.alt = 'Show password';
            }
        });
    }

    // 2. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal-animation');
    const revealOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's a branding card or a stats section, trigger counting
                if (entry.target.classList.contains('login-branding-card-box') || 
                    entry.target.classList.contains('join-revolution-section-container')) {
                    startStatsCounting(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Generalized Stats Counter Animation
    function startStatsCounting(container = document) {
        // Find stats within the specific container (performance optimization)
        const stats = container.querySelectorAll('.stat-value-text, .counter-value-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, stepTime);
        });
    }

    // 4. Form Submission Micro-interaction
    const loginForm = document.getElementById('user-login-form-element');
    const submitBtn = document.getElementById('login-submit-button');

    if (loginForm && submitBtn) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Visual feedback
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Verifying...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Simulate server delay
            setTimeout(() => {
                submitBtn.textContent = 'Redirecting...';
                submitBtn.style.backgroundColor = '#55A887';
                submitBtn.style.color = '#181818';
                
                setTimeout(() => {
                    alert('Login successful! Design recreation complete.');
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = '#181818';
                    submitBtn.style.color = '#ffeedc';
                    submitBtn.disabled = false;
                }, 1000);
            }, 1500);
        });
    }

    // 5. Button Hover Glow Effect (Extra Micro-interaction)
    const primaryBtns = document.querySelectorAll('.branding-get-app-button-primary, .google-auth-login-button-secondary');
    
    primaryBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--mouse-x', `${x}px`);
            btn.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('.nav-link-anchor-style');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    window.scrollTo({
                        top: targetEl.offsetTop - 80, // Account for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 7. Active Navigation State on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});
