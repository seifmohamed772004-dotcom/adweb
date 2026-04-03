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
        // Simple initialization: Always clear fields for a fresh start
        if (passwordInput) passwordInput.value = '';
        if (passwordInput) passwordInput.setAttribute('type', 'password');
        
        const emailInput = document.getElementById('email-input-field');
        if (emailInput) emailInput.value = '';

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

    // Reset form on pageshow (handles back/forward cache)
    window.addEventListener('pageshow', (event) => {
        const loginFormElement = document.getElementById('user-login-form-element');
        if (loginFormElement) loginFormElement.reset();
    });

    // 2. Scroll Reveal Animation using Intersection Observer (Matching any class containing -reveal)
    const revealElements = document.querySelectorAll('[class*="-reveal"]');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Trigger stats counting for all page sections
                if (entry.target.classList.contains('about-stats-section-reveal') || 
                    entry.target.classList.contains('login-branding-card-reveal') || 
                    entry.target.classList.contains('join-revolution-section-reveal')) {
                    startStatsCounting(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Observe all reveal elements and run immediate check for visibility
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // If already in viewport OR below it (to trigger as you scroll)
        if (rect.top < window.innerHeight) {
            el.classList.add('is-visible');
            if (el.classList.contains('about-stats-section-reveal') || 
                el.classList.contains('login-branding-card-reveal') || 
                el.classList.contains('join-revolution-section-reveal')) {
                startStatsCounting(el);
            }
            // Once visible, we don't need to observe it anymore
        } else {
            revealObserver.observe(el);
        }
    });

    // 3. Generalized Stats Counter Animation
    function startStatsCounting(container = document) {
        // Find stats within the specific container
        const stats = container.querySelectorAll('.stat-value-text, .counter-value-number, .about-stat-value');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            const duration = 2000; // 2 seconds
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    // Final formatting with suffixes
                    formatCounterOutput(stat, target);
                    clearInterval(timer);
                } else {
                    formatCounterOutput(stat, Math.floor(current));
                }
            }, stepTime);
        });
    }

    function formatCounterOutput(element, value) {
        let output = value;
        let suffix = "+";
        
        if (value >= 1000000) {
            output = (value / 1000000).toFixed(0) + "M";
        } else if (value >= 1000) {
            output = (value / 1000).toFixed(0) + "K";
        }
        
        element.textContent = output + suffix;
    }

    // 4. Form Submission Micro-interaction
    const loginForm = document.getElementById('user-login-form-element');
    const submitBtn = document.getElementById('login-submit-button');

    if (loginForm && submitBtn) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email-input-field');
            const passwordInput = document.getElementById('password-input-field');
            
            if (!emailInput || !passwordInput) return;

            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const rememberMe = document.getElementById('remember-me-checkbox')?.checked;

            // Visual feedback
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Verifying...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Simulate server delay for premium feel
            setTimeout(() => {
                if (email === 'seifmohamed772004@gmail.com' && password === '772004') {
                    submitBtn.textContent = 'Success! Redirecting...';
                    submitBtn.style.backgroundColor = '#55A887';
                    submitBtn.style.color = '#181818';
                    
                    setTimeout(() => {
                        window.location.href = 'Home.html';
                    }, 1000);
                } else {
                    alert('Authentication failed: Invalid email or password.');
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }
            }, 1200);
        });
    }

    // 5. Google Account Picker Simulation
    const googleAuthBtn = document.getElementById('google-auth-button');
    const googleOverlay = document.getElementById('google-picker-overlay');
    const googleAccounts = document.querySelectorAll('.google-account-item');

    if (googleAuthBtn && googleOverlay) {
        googleAuthBtn.addEventListener('click', () => {
            googleOverlay.classList.add('google-modal-overlay-visible');
        });

        // Close modal when clicking outside the card
        googleOverlay.addEventListener('click', (e) => {
            if (e.target === googleOverlay) {
                googleOverlay.classList.remove('google-modal-overlay-visible');
            }
        });

        googleAccounts.forEach(account => {
            account.addEventListener('click', () => {
                const email = account.getAttribute('data-email');
                const accountBox = account.querySelector('.account-info-box');
                const originalContent = accountBox.innerHTML;

                // Visual feedback inside the picker
                accountBox.innerHTML = '<span class="account-name-text" style="color: #55A887;">Signing in...</span>';
                
                setTimeout(() => {
                    if (email === 'seifmohamed772004@gmail.com') {
                        window.location.href = 'Home.html';
                    } else {
                        alert('Simulation: This account is not authorized for this demo.');
                        accountBox.innerHTML = originalContent;
                    }
                }, 1500);
            });
        });
    }

    // 6. Button Hover Glow Effect (Extra Micro-interaction)
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

    // 7. Back to Top Smooth Scroll
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Target the first major section or main wrapper for the relative page
            const topElement = document.querySelector('section, main');
            if (topElement) {
                topElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 8. Contact Page Ticker & FAQ Logic
    const tickerTrack = document.getElementById('contact-ticker-track');
    if (tickerTrack) {
        const items = Array.from(tickerTrack.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            tickerTrack.appendChild(clone);
        });
    }

    const faqBtn = document.getElementById('contact-faq-btn');
    if (faqBtn) {
        faqBtn.addEventListener('click', () => {
            alert('FAQ Section is coming soon! For immediate assistance, please use our email or phone contact.');
        });
    }
});
