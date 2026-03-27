// ========== DOM Elements ==========
const coverElement = document.getElementById('cover');
const contentElement = document.getElementById('content');

// ========== OPEN INVITATION ==========
function openInvitation() {
    coverElement.style.opacity = '0';
    coverElement.style.visibility = 'hidden';
    
    setTimeout(() => {
        contentElement.classList.remove('d-none');
        
        // Initialize AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Start countdown
        startCountdown();
        
        // Initialize scroll effects
        initScrollEffects();
        
        // Add RSVP button
        addRsvpButton();
        
        // Create floating particles
        createParticles();
        
        document.body.style.overflow = 'auto';
    }, 800);
}

// ========== COUNTDOWN TIMER ==========
let countdownInterval = null;

function startCountdown() {
    const targetDate = new Date('April 3, 2026 15:00:00 GMT+0700').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            
            if (!document.querySelector('.event-started-message')) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'event-started-message text-center mt-4';
                messageDiv.innerHTML = `
                    <div class="celebrate-badge">
                        <i class="bi bi-balloon-heart"></i> Acara telah berlangsung! 
                        <i class="bi bi-balloon-heart"></i>
                    </div>
                `;
                const countdownSection = document.querySelector('.countdown-section');
                if (countdownSection) {
                    countdownSection.querySelector('.container').appendChild(messageDiv);
                }
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
        
        // Pulse effect when less than 24 hours
        if (days === 0 && hours < 24 && distance > 0) {
            document.querySelectorAll('.countdown-card').forEach(card => {
                card.style.animation = 'pulseGlow 1.5s infinite';
            });
        }
    }
    
    updateCountdown();
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
}

// ========== SCROLL REVEAL EFFECTS ==========
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// ========== RSVP BUTTON ==========
function addRsvpButton() {
    const detailsCard = document.querySelector('.details-card-floating');
    if (detailsCard && !detailsCard.querySelector('.rsvp-button')) {
        const rsvpBtn = document.createElement('button');
        rsvpBtn.className = 'rsvp-button';
        rsvpBtn.innerHTML = '<i class="bi bi-envelope-check"></i> Konfirmasi Kehadiran';
        rsvpBtn.style.marginTop = '1.5rem';
        rsvpBtn.style.background = 'linear-gradient(135deg, #d4af37, #b8962e)';
        rsvpBtn.style.border = 'none';
        rsvpBtn.style.padding = '10px 28px';
        rsvpBtn.style.borderRadius = '40px';
        rsvpBtn.style.color = '#0a0806';
        rsvpBtn.style.fontWeight = '500';
        rsvpBtn.style.cursor = 'pointer';
        rsvpBtn.style.transition = 'transform 0.2s, box-shadow 0.2s';
        rsvpBtn.style.width = '100%';
        
        rsvpBtn.addEventListener('mouseenter', () => {
            rsvpBtn.style.transform = 'translateY(-2px)';
            rsvpBtn.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.4)';
        });
        
        rsvpBtn.addEventListener('mouseleave', () => {
            rsvpBtn.style.transform = 'translateY(0)';
            rsvpBtn.style.boxShadow = 'none';
        });
        
        rsvpBtn.addEventListener('click', () => {
            showToast('Terima kasih! Konfirmasi kehadiran akan segera kami proses.', 'success');
        });
        
        detailsCard.appendChild(rsvpBtn);
    }
}

// ========== TOAST NOTIFICATION ==========
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.backgroundColor = 'rgba(25, 22, 19, 0.95)';
    toast.style.backdropFilter = 'blur(12px)';
    toast.style.border = '1px solid rgba(212, 175, 55, 0.5)';
    toast.style.borderRadius = '50px';
    toast.style.padding = '12px 24px';
    toast.style.color = '#ecdca8';
    toast.style.fontSize = '0.85rem';
    toast.style.zIndex = '9999';
    toast.style.animation = 'slideInRight 0.3s ease-out';
    toast.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========== FLOATING PARTICLES ==========
function createParticles() {
    const existingParticles = document.querySelector('.particle-container');
    if (existingParticles) existingParticles.remove();
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    particleContainer.style.overflow = 'hidden';
    document.body.appendChild(particleContainer);
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 15 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particleContainer.appendChild(particle);
    }
}

// ========== ADD DYNAMIC STYLES ==========
function addDynamicStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes pulseGlow {
            0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); border-color: rgba(212, 175, 55, 0.3); }
            50% { box-shadow: 0 0 20px 5px rgba(212, 175, 55, 0.3); border-color: rgba(212, 175, 55, 0.8); }
            100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); border-color: rgba(212, 175, 55, 0.3); }
        }
        
        @keyframes floatParticle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.4; }
            90% { opacity: 0.4; }
            100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .event-started-message .celebrate-badge {
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.05));
            border: 1px solid rgba(212, 175, 55, 0.5);
            border-radius: 50px;
            padding: 12px 24px;
            display: inline-block;
            backdrop-filter: blur(8px);
            font-size: 0.9rem;
            color: #ecdca8;
            animation: gentlePulse 2s infinite;
        }
        
        @keyframes gentlePulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
        }
        
        .rsvp-button {
            font-family: 'Inter', sans-serif;
            letter-spacing: 0.5px;
        }
        
        .rsvp-button i {
            margin-right: 8px;
        }
    `;
    document.head.appendChild(styleSheet);
}

// ========== UPDATE COPYRIGHT YEAR ==========
function updateCopyrightYear() {
    const copyright = document.querySelector('.footer-copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.innerHTML = copyright.innerHTML.replace('2026', year);
    }
}

// ========== INITIALIZATION ==========
addDynamicStyles();
updateCopyrightYear();

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

// Keyboard support (press ESC to open)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && coverElement && coverElement.style.visibility !== 'hidden') {
        openInvitation();
    }
});

// Make functions globally available
window.openInvitation = openInvitation;
window.showToast = showToast;