document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});
function animateCounter(element, target, duration = 2000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 50);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}
const sURL = 'https://api.allorigins.win/raw?url=http://185.44.80.38:30120';
function updateStatsWithAnimation() {
    fetch(`${sURL}/players.json`)
        .then(res => res.json())
        .then(players => {
            const online = players.length;
            const max = 48; // 🧠 Mets ici ton slot max
            const counters = [
                { id: 'member-count', target: max },
                { id: 'online-count', target: online },
                { id: 'events-count', target: 8 },   // Stat fixe ou dynamique
                { id: 'missions-count', target: 45 } // Stat fixe ou dynamique
            ];
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = counters.find(c => c.id === entry.target.id);
                        if (counter) {
                            animateCounter(entry.target, counter.target);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            }, { threshold: 0.5 });
            counters.forEach(counter => {
                const el = document.getElementById(counter.id);
                if (el) observer.observe(el);
            });
        })
        .catch(err => {
            console.error('Erreur fetch FiveM :', err);
            document.getElementById('member-count').textContent = 'N/A';
            document.getElementById('online-count').textContent = 'N/A';
        });
}
updateStatsWithAnimation();
setInterval(updateStatsWithAnimation, 30000);
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-gray-900', 'bg-opacity-95');
    } else {
        nav.classList.remove('bg-gray-900', 'bg-opacity-95');
    }
});
const typingText = document.querySelector('.typing-effect');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);
}
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});
const preloadImages = [
];
preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
window.addEventListener('error', (e) => {
    console.warn('Non-critical error:', e.message);
});
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
}
const scrollProgress = document.createElement('div');
scrollProgress.classList.add('scroll-progress');
document.body.appendChild(scrollProgress);
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
    }
});