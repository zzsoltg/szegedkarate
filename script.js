document.addEventListener('DOMContentLoaded', function () {
    // Slider automatikus váltása
    function autoSlider() {
        const slides = document.querySelectorAll('.slider-container .slide');
        let currentSlide = 0;

        function changeSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(changeSlide, 5000);
    }

    autoSlider();

    // Navbar smooth scroll (már meglévő kódunk)
    document.querySelectorAll('#navbar nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navbar zsugorodása scrollkor
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });

    // Buborékokra kattintva sima gördülés
    document.querySelectorAll('.bubble').forEach((bubble) => {
        bubble.addEventListener('click', () => {
            const target = document.querySelector(bubble.getAttribute('data-target'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Érmek számláló animációja
    const medalCounters = document.querySelectorAll('.medal');
    const animateCounter = (el, target) => {
        let count = 0;
        const increment = target / 1000;
        const updateCounter = () => {
            count += increment;
            if (count < target) {
                el.querySelector('.medal-count').innerText = Math.floor(count);
                requestAnimationFrame(updateCounter);
            } else {
                el.querySelector('.medal-count').innerText = target;
            }
        };
        updateCounter();
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetCount = parseInt(entry.target.getAttribute('data-count'), 10);
                    animateCounter(entry.target, targetCount);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    medalCounters.forEach((mc) => observer.observe(mc));

    // Slide in animációk az elemekhez
    const slideEls = document.querySelectorAll('.edzes-leiras, .edzo-leiras, .slide-in, .slide-in-left, .slide-in-right');
    const slideObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    slideEls.forEach((el) => slideObserver.observe(el));

    // "Vissza az oldal tetejére" gomb sima gördülése
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});