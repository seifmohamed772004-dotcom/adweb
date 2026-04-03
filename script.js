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

    // 2. Enhanced Scroll Reveal with Staggering
    const revealElements = document.querySelectorAll('[class*="-reveal"]');
    const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                
                // If the element is a container for staggered children
                if (el.hasAttribute('data-reveal-stagger')) {
                    const children = el.querySelectorAll('.pricing-v2-card-item, .policy-usage-green-card, .subs-stat-card-item, .subs-industry-dark-card, .contact-platform-card-item, .hero-stat-mini-card, .benefit-preview-card, .role-card-mini-item, .benefit-col-item, .timeline-step-card-box, .team-metric-stat-box, .leader-compact-card, .member-card-mini-box, .culture-value-item-box, .culture-testimonial-card-item, .blog-featured-card-spotlight, .sidebar-module-box, .blog-card-item-vertical, .blog-card-item-horizontal, .topic-item-card-mini, .ranking-item, .partner-metric-item, .partner-full-spotlight-card, .partner-mini-card-item, .benefit-numbered-item, .partner-mini-quote, .step-card-pill');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.15}s`;
                        child.classList.add('is-visible');
                    });
                }

                // Trigger specialized counting
                if (el.classList.contains('subscriptions-stats-section-reveal') || 
                    el.classList.contains('about-stats-section-reveal') ||
                    el.classList.contains('careers-hero-reveal') ||
                    el.classList.contains('team-hero-reveal') ||
                    el.classList.contains('blog-hero-reveal') ||
                    el.classList.contains('partners-hero-reveal') ||
                    el.classList.contains('pricing-table-v2-reveal')) {
                    startStatsCounting(el);
                    if (el.classList.contains('pricing-table-v2-reveal')) {
                        animatePricingNumbers(el);
                    }
                }

                observer.unobserve(el);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Magnetic Button Interaction (Premium Micro-interaction)
    const magneticBtns = document.querySelectorAll('.footer-get-app-pill-btn, .branding-get-app-button-primary, .tier-action-pill-btn-dark, .careers-primary-pill-btn-beige, .role-apply-now-btn-beige, .ready-join-empire-btn-beige, .partners-primary-pill-btn-beige, .partners-secondary-outline-btn, .partners-action-pill-btn-beige');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 4. Numeric Counter Animation (Refined)
    function startStatsCounting(container = document) {
        const stats = container.querySelectorAll('.stat-value-text, .counter-value-number, .about-stat-value, .subs-stat-value, .policy-stat-number');
        
        stats.forEach(stat => {
            let targetStr = stat.getAttribute('data-target') || stat.textContent.replace(/[^\d]/g, '');
            const target = parseInt(targetStr);
            if (isNaN(target)) return;
            
            animateValue(stat, 0, target, 2000);
        });
    }

    function animatePricingNumbers(container) {
        const prices = container.querySelectorAll('.pricing-v2-integer-value');
        prices.forEach(price => {
            const target = parseInt(price.textContent);
            if (isNaN(target)) return;
            animateValue(price, 0, target, 1500, '');
        });
    }

    function animateValue(obj, start, end, duration, suffix = '+') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            
            // Format with K/M if large
            let output = current;
            if (current >= 1000000) output = (current / 1000000).toFixed(0) + 'M';
            else if (current >= 1000) output = (current / 1000).toFixed(0) + 'K';
            
            obj.innerHTML = output + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Final value cleanup
                if (end >= 1000000) obj.innerHTML = (end / 1000000).toFixed(0) + 'M' + suffix;
                else if (end >= 1000) obj.innerHTML = (end / 1000).toFixed(0) + 'K' + suffix;
                else obj.innerHTML = end + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }

    // 5. Job Board Filter Logic (Careers Page)
    const filterTabs = document.querySelectorAll('.role-filter-tab-item');
    const jobCards = document.querySelectorAll('.role-card-featured-high-impact, .role-card-mini-item');

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.getAttribute('data-role');

                jobCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                        // Trigger small re-reveal
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'all 0.5s ease';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
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
            // Redirect to FAQ page instead of alert
            window.location.href = 'FAQ.html';
        });
    }

    // 10. FAQ Slider Pagination Logic
    const faqNumbers = document.querySelectorAll('.faq-page-number-item');
    const faqQuestion = document.getElementById('faq-active-question-text');
    const faqAnswer = document.getElementById('faq-active-answer-paragraph');
    const faqInnerLabel = document.getElementById('faq-active-content-inner');

    const faqData = [
        {
            q: "HOW LONG DOES IT TAKE TO SEE RESULTS AFTER STARTING WITH CREESTUDIOS?",
            a: "While timelines vary depending on your goals and campaign scope, most clients begin seeing measurable engagement improvements within the first 30 days. We focus on building a strong strategic foundation first, then continuously optimize to ensure sustainable, long-term growth — not just short-term spikes."
        },
        {
            q: "WHAT INDUSTRIES DO YOU SPECIALIZE IN?",
            a: "We work across a broad spectrum including Tech, Fashion, E-commerce, and Entertainment. Our adaptive creative process allows us to tailor visual strategies to any niche that demands high-end aesthetic execution."
        },
        {
            q: "CAN I CUSTOMIZE MY SUBSCRIPTION PLAN?",
            a: "Absolutely. While we offer structured tiers, our Enterprise level is fully customizable. We can scale resources, concepts, and delivery speeds to match your specific studio requirements."
        },
        {
            q: "DO YOU OFFER ONE-OFF PROJECT SERVICES?",
            a: "Our model is primarily subscription-based to ensure consistent quality and growth. However, for significant brand launches or milestones, we do take on select one-off visual identity projects."
        },
        {
            q: "HOW DO WE COMMUNICATION DURING THE PROCESS?",
            a: "Transparency is key. Depending on your plan, you'll have access to a dedicated Slack channel, bi-weekly video calls, or a personal account strategist to keep you updated on every asset's progress."
        },
        {
            q: "IS THERE A CONTRACT COMMITMENT?",
            a: "Our monthly plans are flexible, while our yearly commitments offer a 20% discount. We believe in our work's ability to retain partners through results rather than restrictive long-term locking."
        }
    ];

    if (faqNumbers.length > 0 && faqQuestion && faqAnswer && faqInnerLabel) {
        faqNumbers.forEach((num, index) => {
            num.addEventListener('click', () => {
                // Update markers
                faqNumbers.forEach(n => n.classList.remove('active'));
                num.classList.add('active');

                // Fade out, update, fade in
                faqInnerLabel.style.opacity = '0';
                faqInnerLabel.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    const data = faqData[index];
                    faqQuestion.textContent = data.q;
                    faqAnswer.textContent = data.a;
                    
                    faqInnerLabel.style.opacity = '1';
                    faqInnerLabel.style.transform = 'translateY(0)';
                }, 300);
            });
        });
    }

    const faqDiffBtn = document.getElementById('faq-different-question-btn');
    if (faqDiffBtn) {
        faqDiffBtn.addEventListener('click', () => {
            alert('Redirecting to our detailed support portal...');
        });
    }

    // 11. Blog Archive Filter Logic
    const blogFilterTabs = document.querySelectorAll('.blog-filter-tab-item');
    const blogPosts = document.querySelectorAll('.blog-card-item-vertical, .blog-card-item-horizontal');

    if (blogFilterTabs.length > 0) {
        blogFilterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                blogFilterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');

                blogPosts.forEach(post => {
                    const category = post.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        post.style.display = 'flex';
                        // Add entrance animation
                        post.style.animation = 'none';
                        post.offsetHeight; // trigger reflow
                        post.style.animation = 'scaleInFade 0.5s ease forwards';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }

    // Features specific interactions
    const featuresRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                
                if (el.hasAttribute('data-reveal-stagger')) {
                    const children = el.querySelectorAll('.feature-hero-pill-item, .toolkit-card-item, .poweruser-card-item');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                        child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const featureElements = document.querySelectorAll('.features-hero-section-reveal, .features-creators-reveal, .creator-block-reveal, .features-toolkit-reveal, .features-poweruser-reveal, .features-ready-reveal, [data-reveal-stagger]');
    featureElements.forEach(el => {
        if (!el.classList.contains('is-visible') && !el.hasAttribute('data-reveal-stagger')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        } else if (el.hasAttribute('data-reveal-stagger')) {
            const children = el.querySelectorAll('.feature-hero-pill-item, .toolkit-card-item, .poweruser-card-item');
            children.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
            });
        }
        featuresRevealObserver.observe(el);
    });

    const magneticBtns2 = document.querySelectorAll('.features-start-trial-btn, .features-pricing-btn');
    magneticBtns2.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // Case Studies specific interactions
    const csRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                
                if (el.hasAttribute('data-reveal-stagger')) {
                    const children = el.querySelectorAll('.cs-hero-stat-item, .cs-filter-pill, .cs-result-stat, .cs-proven-card, .cs-step-card, .cs-industry-card');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.15}s`;
                        child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const csElements = document.querySelectorAll('.cs-hero-reveal, .cs-spotlight-reveal, .cs-proven-reveal, .cs-deliver-reveal, .cs-industries-reveal, .cs-cta-reveal, [data-reveal-stagger]');
    csElements.forEach(el => {
        if (!el.classList.contains('is-visible') && !el.hasAttribute('data-reveal-stagger')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        } else if (el.hasAttribute('data-reveal-stagger')) {
            const children = el.querySelectorAll('.cs-hero-stat-item, .cs-filter-pill, .cs-result-stat, .cs-proven-card, .cs-step-card, .cs-industry-card');
            children.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
            });
        }
        csRevealObserver.observe(el);
    });

    const magneticBtns3 = document.querySelectorAll('.cs-cta-btn-primary, .cs-cta-btn-outline');
    magneticBtns3.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // Tag filtering interaction
    const csFilterPills = document.querySelectorAll('.cs-filter-pill');
    csFilterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            csFilterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Subtle feedback for clicking filters
            const cards = document.querySelectorAll('.cs-proven-card');
            cards.forEach(card => {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 300);
            });
        });
    });

    // Our Process specific interactions
    const opRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                
                if (el.hasAttribute('data-reveal-stagger')) {
                    const children = el.querySelectorAll('.op-time-item, .op-trans-card');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.15}s`;
                        child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const opElements = document.querySelectorAll('.op-hero-reveal, .op-timeline-reveal, .op-step-reveal, .op-transparency-reveal, .op-cta-reveal, [data-reveal-stagger]');
    opElements.forEach(el => {
        if (!el.classList.contains('is-visible') && !el.hasAttribute('data-reveal-stagger')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        } else if (el.hasAttribute('data-reveal-stagger')) {
            const children = el.querySelectorAll('.op-time-item, .op-trans-card');
            children.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
            });
        }
        opRevealObserver.observe(el); // Wait to observe properly
    });
    
    const magneticBtns4 = document.querySelectorAll('.op-btn-primary, .op-btn-outline');
    magneticBtns4.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // Performance specific interactions
    const perfRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                
                if (el.hasAttribute('data-reveal-stagger')) {
                    const children = el.querySelectorAll('.perf-hero-stat-card, .perf-filter-pill, .perf-rt-card, .perf-growth-card, .perf-roi-card, .perf-comp-col, .perf-above-row, .perf-guar-stat');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.15}s`;
                        child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const perfElements = document.querySelectorAll('.perf-hero-reveal, .perf-realtime-reveal, .perf-growth-reveal, .perf-roi-reveal, .perf-compare-reveal, .perf-above-reveal, .perf-guarantee-reveal, .perf-cta-reveal, [data-reveal-stagger]');
    perfElements.forEach(el => {
        if (!el.classList.contains('is-visible') && !el.hasAttribute('data-reveal-stagger')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        } else if (el.hasAttribute('data-reveal-stagger')) {
            const children = el.querySelectorAll('.perf-hero-stat-card, .perf-filter-pill, .perf-rt-card, .perf-growth-card, .perf-roi-card, .perf-comp-col, .perf-above-row, .perf-guar-stat');
            children.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
            });
        }
        perfRevealObserver.observe(el);
    });
    
    const magneticBtns5 = document.querySelectorAll('.perf-btn-primary, .perf-btn-outline');
    magneticBtns5.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // Top Creators specific interactions
    const tcRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                
                if (el.hasAttribute('data-reveal-stagger')) {
                    const children = el.querySelectorAll('.tc-feat-img-col, .tc-feat-info-col, .tc-filter-pill, .tc-creator-card');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.15}s`;
                        child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const tcElements = document.querySelectorAll('.tc-section-reveal, [data-reveal-stagger]');
    tcElements.forEach(el => {
        if (!el.classList.contains('is-visible') && !el.hasAttribute('data-reveal-stagger')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        } else if (el.hasAttribute('data-reveal-stagger')) {
            const children = el.querySelectorAll('.tc-feat-img-col, .tc-feat-info-col, .tc-filter-pill, .tc-creator-card');
            children.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
            });
        }
        tcRevealObserver.observe(el);
    });

    // Tag filtering interaction for Top Creators
    const tcFilterPills = document.querySelectorAll('.tc-filter-pill');
    tcFilterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            tcFilterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Subtle feedback for clicking filters
            const cards = document.querySelectorAll('.tc-creator-card');
            cards.forEach(card => {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 300);
            });
        });
    });

});
