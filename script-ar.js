document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input-field');
    const emailInputField = document.getElementById('email-input-field');
    const togglePasswordBtn = document.getElementById('toggle-password-visibility-btn');
    const toggleIcon = document.getElementById('password-toggle-icon');

    if (emailInputField) {
        emailInputField.value = '';
        emailInputField.setAttribute('autocomplete', 'off');
    }

    if (passwordInput) {
        passwordInput.value = '';
        passwordInput.setAttribute('autocomplete', 'new-password');
    }

    if (togglePasswordBtn && passwordInput && toggleIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            const nextType = isPassword ? 'text' : 'password';
            passwordInput.setAttribute('type', nextType);

            if (nextType === 'text') {
                toggleIcon.src = 'Assets/Shown Icon.png';
                toggleIcon.alt = 'إخفاء كلمة المرور';
            } else {
                toggleIcon.src = 'Assets/Hidden Icon.png';
                toggleIcon.alt = 'إظهار كلمة المرور';
            }
        });
    }

    window.addEventListener('pageshow', () => {
        const loginFormElement = document.getElementById('user-login-form-element');
        if (loginFormElement) loginFormElement.reset();
    });

    const revealElements = document.querySelectorAll('[class*="-reveal"]');
    const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add('is-visible');
            observer.unobserve(el);
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    const statNodes = document.querySelectorAll('.stat-value-text');
    statNodes.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10);
        if (Number.isNaN(target)) return;
        animateValue(stat, 0, target, 2000);
    });

    function animateValue(node, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);

            let output = current;
            if (current >= 1000000) output = `${(current / 1000000).toFixed(0)}M`;
            else if (current >= 1000) output = `${(current / 1000).toFixed(0)}K`;

            node.textContent = `${output}+`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else if (end >= 1000000) {
                node.textContent = `${(end / 1000000).toFixed(0)}M+`;
            } else if (end >= 1000) {
                node.textContent = `${(end / 1000).toFixed(0)}K+`;
            } else {
                node.textContent = `${end}+`;
            }
        };
        window.requestAnimationFrame(step);
    }

    const loginForm = document.getElementById('user-login-form-element');
    const submitBtn = document.getElementById('login-submit-button');

    if (loginForm && submitBtn) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email-input-field');
            const passwordField = document.getElementById('password-input-field');
            if (!emailInput || !passwordField) return;

            const email = emailInput.value.trim();
            const password = passwordField.value;
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'جارٍ التحقق...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            setTimeout(() => {
                if (email === 'seifmohamed772004@gmail.com' && password === '772004') {
                    localStorage.setItem('cree_logged_in_user', email);
                    submitBtn.textContent = 'تم بنجاح! جارٍ التحويل...';
                    submitBtn.style.backgroundColor = '#55A887';
                    submitBtn.style.color = '#181818';
                    setTimeout(() => {
                        window.location.href = 'Home.html';
                    }, 1000);
                } else {
                    alert('فشل تسجيل الدخول: البريد الإلكتروني أو كلمة المرور غير صحيحة.');
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
                if (!accountBox) return;
                const originalContent = accountBox.innerHTML;
                accountBox.innerHTML = '<span class="account-name-text" style="color: #55A887;">جارٍ تسجيل الدخول...</span>';

                setTimeout(() => {
                    if (email === 'seifmohamed772004@gmail.com') {
                        window.location.href = 'Home.html';
                    } else {
                        alert('محاكاة: هذا الحساب غير مصرح له في هذا العرض التجريبي.');
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
});
