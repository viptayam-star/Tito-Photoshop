document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const body = document.body;
    const themeToggle = document.getElementById('dark-mode-toggle');

    // --- Sidebar Logic ---
    const openSidebar = () => body.classList.add('sidebar-open');
    const closeSidebar = () => body.classList.remove('sidebar-open');

    if(openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSidebar();
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if(sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // --- Subscription Logic ---
    const handleSubscriptionClick = (planName, planNameAr) => {
         const currentLang = document.body.getAttribute('data-lang') || 'en';
         const selectedPlanName = currentLang === 'ar' ? planNameAr : planName;
        const whatsAppNumber = "201022065189";
         const message = currentLang === 'ar'
            ? `مرحبًا Tito Photoshop، أرغب في الاشتراك في باقة "${selectedPlanName}".`
            : `Hello Tito Photoshop, I'm interested in subscribing to the "${selectedPlanName}" package.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
        window.open(whatsAppUrl, '_blank');
    };

    const singleSub = document.getElementById('subscribe-single');
    if(singleSub) singleSub.addEventListener('click', () => handleSubscriptionClick('Single Ad', 'إعلان واحد'));

    const weeklySub = document.getElementById('subscribe-weekly');
    if(weeklySub) weeklySub.addEventListener('click', () => handleSubscriptionClick('Weekly', 'الأسبوعية'));

    const monthlySub = document.getElementById('subscribe-monthly');
    if(monthlySub) monthlySub.addEventListener('click', () => handleSubscriptionClick('Monthly', 'الشهرية'));

    const yearlySub = document.getElementById('subscribe-yearly');
    if(yearlySub) yearlySub.addEventListener('click', () => handleSubscriptionClick('Yearly', 'السنوية'));

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Section Animations ---
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Language Switcher Logic ---
    const langEnBtn = document.getElementById('lang-en');
    const langArBtn = document.getElementById('lang-ar');

    const setLanguage = (lang) => {
        body.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        langEnBtn.classList.toggle('active', lang === 'en');
        langArBtn.classList.toggle('active', lang === 'ar');
        if (typeof renderPortfolio === 'function') {
            renderPortfolio(); // Re-render React component if it exists
        }
    };

    if(langEnBtn) {
        langEnBtn.addEventListener('click', () => setLanguage('en'));
    }
    if(langArBtn) {
        langArBtn.addEventListener('click', () => setLanguage('ar'));
    }

    // --- Dark Mode Logic ---
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if(themeToggle) themeToggle.checked = true;
    }

    if(themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

});
