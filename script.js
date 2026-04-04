

document.addEventListener('DOMContentLoaded', () => {
    
    const passwordInput = document.getElementById('password-input-field');
    const togglePasswordBtn = document.getElementById('toggle-password-visibility-btn');
    const toggleIcon = document.getElementById('password-toggle-icon');

    if (togglePasswordBtn && passwordInput && toggleIcon) {
        
        if (passwordInput) passwordInput.value = '';
        if (passwordInput) passwordInput.setAttribute('type', 'password');
        
        const emailInput = document.getElementById('email-input-field');
        if (emailInput) emailInput.value = '';

        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            
            if (type === 'text') {
                toggleIcon.src = 'Assets/Shown Icon.png';
                toggleIcon.alt = 'Hide password';
            } else {
                toggleIcon.src = 'Assets/Hidden Icon.png';
                toggleIcon.alt = 'Show password';
            }
        });
    }

    
    window.addEventListener('pageshow', (event) => {
        const loginFormElement = document.getElementById('user-login-form-element');
        if (loginFormElement) loginFormElement.reset();
    });

    
    const revealElements = document.querySelectorAll('[class*="-reveal"]');
    const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                
                
                if (el.hasAttribute('data-reveal-stagger')) {
                    const children = el.querySelectorAll('.pricing-v2-card-item, .policy-usage-green-card, .subs-stat-card-item, .subs-industry-dark-card, .contact-platform-card-item, .hero-stat-mini-card, .benefit-preview-card, .role-card-mini-item, .benefit-col-item, .timeline-step-card-box, .team-metric-stat-box, .leader-compact-card, .member-card-mini-box, .culture-value-item-box, .culture-testimonial-card-item, .blog-featured-card-spotlight, .sidebar-module-box, .blog-card-item-vertical, .blog-card-item-horizontal, .topic-item-card-mini, .ranking-item, .partner-metric-item, .partner-full-spotlight-card, .partner-mini-card-item, .benefit-numbered-item, .partner-mini-quote, .step-card-pill');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.15}s`;
                        child.classList.add('is-visible');
                    });
                }

                
                if (el.classList.contains('subscriptions-stats-section-reveal') || 
                    el.classList.contains('about-stats-section-reveal') ||
                    el.classList.contains('careers-hero-reveal') ||
                    el.classList.contains('team-hero-reveal') ||
                    el.classList.contains('blog-hero-reveal') ||
                    el.classList.contains('partners-hero-reveal') ||
                    el.classList.contains('pricing-table-v2-reveal') ||
                    el.classList.contains('login-branding-card-reveal')) {
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
            
            
            let output = current;
            if (current >= 1000000) output = (current / 1000000).toFixed(0) + 'M';
            else if (current >= 1000) output = (current / 1000).toFixed(0) + 'K';
            
            obj.innerHTML = output + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                
                if (end >= 1000000) obj.innerHTML = (end / 1000000).toFixed(0) + 'M' + suffix;
                else if (end >= 1000) obj.innerHTML = (end / 1000).toFixed(0) + 'K' + suffix;
                else obj.innerHTML = end + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }

    
    const filterTabs = document.querySelectorAll('.role-filter-tab-item');
    const jobCards = document.querySelectorAll('.role-card-featured-high-impact, .role-card-mini-item');

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.getAttribute('data-role');

                jobCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                        
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

            
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Verifying...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            
            setTimeout(() => {
                if (email === 'seifmohamed772004@gmail.com' && password === '772004') {
                    // Store logged in user
                    localStorage.setItem('cree_logged_in_user', email);
                    
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

    
    const googleAuthBtn = document.getElementById('google-auth-button');
    const googleOverlay = document.getElementById('google-picker-overlay');
    const googleAccounts = document.querySelectorAll('.google-account-item');

    if (googleAuthBtn && googleOverlay) {
        googleAuthBtn.addEventListener('click', () => {
            googleOverlay.classList.add('google-modal-overlay-visible');
        });

        
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
                        top: targetEl.offsetTop - 80, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    
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

    
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
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
            
            window.location.href = 'FAQ.html';
        });
    }

    
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
                
                faqNumbers.forEach(n => n.classList.remove('active'));
                num.classList.add('active');

                
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

    
    const blogFilterTabs = document.querySelectorAll('.blog-filter-tab-item');
    const blogPosts = document.querySelectorAll('.blog-card-item-vertical, .blog-card-item-horizontal');

    if (blogFilterTabs.length > 0) {
        blogFilterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                
                blogFilterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');

                blogPosts.forEach(post => {
                    const category = post.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        post.style.display = 'flex';
                        
                        post.style.animation = 'none';
                        post.offsetHeight; 
                        post.style.animation = 'scaleInFade 0.5s ease forwards';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }

    
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

    
    const csFilterPills = document.querySelectorAll('.cs-filter-pill');
    csFilterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            csFilterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            
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
        opRevealObserver.observe(el); 
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

    
    const tcFilterPills = document.querySelectorAll('.tc-filter-pill');
    tcFilterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            tcFilterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            
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

    // Dynamic Active Nav Link Management
    const mainNavLinks = document.querySelectorAll('.nav-link-anchor-style');
    let currentPath = window.location.pathname.split('/').pop().toLowerCase();
    
    // Default to index/home if root path
    if (!currentPath) currentPath = 'index.html';

    mainNavLinks.forEach(link => {
        link.classList.remove('active'); // Clear hardcoded active states
        const href = link.getAttribute('href')?.toLowerCase() || '';
        
        // Match base links
        if (currentPath === href || (currentPath === 'index.html' && href === 'home.html')) {
            link.classList.add('active');
        } 
        // Maintain 'About Us' active state for sub-pages 
        else if (href === 'about.html' && (currentPath === 'ourprocess.html' || currentPath === 'our-team.html' || currentPath === 'partners.html')) {
            link.classList.add('active');
        }
    });

    // Language Toggle (EN/AR) with LocalStorage state preservation
    const langLinks = document.querySelectorAll('.lang-link');
    const savedLang = localStorage.getItem('cree_lang_pref') || 'EN';

    langLinks.forEach(langLink => {
        const langSpan = langLink.querySelector('span');
        
        // Initialize state on load
        if (langSpan) {
            langSpan.innerText = savedLang;
        }

        langLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (langSpan) {
                const newLang = langSpan.innerText.trim() === 'EN' ? 'AR' : 'EN';
                langSpan.innerText = newLang;
                localStorage.setItem('cree_lang_pref', newLang);
            }
        });
    });

    // Newsletter Validation & LocalStorage
    const subscribeBtns = document.querySelectorAll('.footer-subscribe-action-link');
    
    subscribeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const wrapper = btn.closest('.footer-subscribe-wrapper');
            if (!wrapper) return;
            
            const inputField = wrapper.querySelector('.footer-email-input-minimal');
            const emailValue = inputField ? inputField.value.trim().toLowerCase() : '';
            
            // Clear existing feedback messages
            const oldMsg = wrapper.querySelector('.subscribe-validation-msg');
            if (oldMsg) oldMsg.remove();
            
            // Create Feedback Element
            const msgEl = document.createElement('p');
            msgEl.className = 'subscribe-validation-msg';
            msgEl.style.fontSize = '0.75rem';
            msgEl.style.marginTop = '10px';
            msgEl.style.fontWeight = '600';
            msgEl.style.fontFamily = "'Unbounded', sans-serif";
            msgEl.style.transition = 'opacity 0.3s ease';

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const loggedInUser = (localStorage.getItem('cree_logged_in_user') || '').toLowerCase();
            
            if (!emailValue) {
                msgEl.innerText = 'Email cannot be empty.';
                msgEl.style.color = '#ff6b6b';
            } else if (!emailRegex.test(emailValue)) {
                msgEl.innerText = 'Please enter a valid email address.';
                msgEl.style.color = '#ff6b6b';
            } else if (!loggedInUser) {
                // Not signed in at all
                msgEl.innerText = 'You must be signed in to stay updated.';
                msgEl.style.color = '#ff6b6b';
            } else if (emailValue !== loggedInUser) {
                // Signed in with a different email
                msgEl.innerText = 'Please sign in with your email to subscribe.';
                msgEl.style.color = '#ff6b6b';
            } else {
                let savedEmails = JSON.parse(localStorage.getItem('cree_subscribed_emails') || '[]');
                
                if (savedEmails.includes(emailValue)) {
                    msgEl.innerText = 'This email is already subscribed.';
                    msgEl.style.color = '#ff6b6b';
                } else {
                    savedEmails.push(emailValue);
                    localStorage.setItem('cree_subscribed_emails', JSON.stringify(savedEmails));
                    msgEl.innerText = 'Subscribed successfully!';
                    msgEl.style.color = '#55A887';
                    if (inputField) inputField.value = '';
                }
            }
            
            wrapper.appendChild(msgEl);
            
            setTimeout(() => {
                msgEl.style.opacity = '0';
                setTimeout(() => msgEl.remove(), 300);
            }, 3500);
        });
    });

    // --- Mobile Burger Menu Initialization ---
    const primaryNavbar = document.getElementById('site-primary-navbar');
    
    if (primaryNavbar) {
        // 1. Create Burger Button dynamically
        const burgerBtn = document.createElement('div');
        burgerBtn.className = 'burger-menu-btn';
        burgerBtn.innerHTML = `
            <svg class="burger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        primaryNavbar.appendChild(burgerBtn);
        
        // 2. Clone the Main Navigation List statically for the Overlay
        const desktopPillNav = document.querySelector('.pill-nav-list');
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-fullscreen-overlay';
        
        if (desktopPillNav) {
            const overlayNavUl = desktopPillNav.cloneNode(true);
            overlay.appendChild(overlayNavUl);
        }
        document.body.appendChild(overlay);
        
        // 3. Bind Toggle Mechanics
        burgerBtn.addEventListener('click', () => {
            const isOpen = overlay.classList.contains('is-open');
            if (isOpen) {
                overlay.classList.remove('is-open');
                burgerBtn.classList.remove('is-active');
                document.body.style.overflow = ''; // Restore
            } else {
                overlay.classList.add('is-open');
                burgerBtn.classList.add('is-active');
                document.body.style.overflow = 'hidden'; // Lock background scrolling
            }
        });
        
        // 4. Bind Auto-Close to anchor taps inside mobile menu
        const overlayLinks = overlay.querySelectorAll('a');
        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                burgerBtn.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    const recentArticlesSection = document.getElementById('articles-section-news');
    const recentArticlesButton = document.getElementById('recent-articles-blog-button');

    if (recentArticlesSection) {
        const recentArticleCards = recentArticlesSection.querySelectorAll('[data-recent-article-card]');

        recentArticleCards.forEach(card => {
            card.addEventListener('mousemove', (event) => {
                if (window.innerWidth <= 768) return;

                const rect = card.getBoundingClientRect();
                const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
                const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

                card.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    if (recentArticlesButton) {
        recentArticlesButton.addEventListener('mousedown', () => {
            recentArticlesButton.style.transform = 'translateY(0)';
        });

        recentArticlesButton.addEventListener('mouseup', () => {
            recentArticlesButton.style.transform = '';
        });

        recentArticlesButton.addEventListener('mouseleave', () => {
            recentArticlesButton.style.transform = '';
        });
    }

    const partnersStripSection = document.getElementById('partners-strip-showcase');
    const partnersStripButton = document.getElementById('partners-strip-view-all-button');

    if (partnersStripSection) {
        const partnersStripCells = partnersStripSection.querySelectorAll('[data-partners-strip-logo-cell]');

        partnersStripCells.forEach((cell, index) => {
            cell.style.transitionDelay = `${index * 0.05}s`;

            cell.addEventListener('mousemove', (event) => {
                if (window.innerWidth <= 768) return;

                const rect = cell.getBoundingClientRect();
                const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
                const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 4;

                cell.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });

            cell.addEventListener('mouseleave', () => {
                cell.style.transform = '';
            });
        });
    }

    if (partnersStripButton) {
        partnersStripButton.addEventListener('mousedown', () => {
            partnersStripButton.style.transform = 'translateY(0.03rem)';
        });

        partnersStripButton.addEventListener('mouseup', () => {
            partnersStripButton.style.transform = '';
        });

        partnersStripButton.addEventListener('mouseleave', () => {
            partnersStripButton.style.transform = '';
        });
    }

});
