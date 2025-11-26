// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// === READING PROGRESS BAR ===
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  
  // Create progress bar if not exists
  let progressBar = document.getElementById('reading-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, #ffca28, #f4a261);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
  }
  
  progressBar.style.width = scrollPercent + '%';
});

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.id = 'back-to-top';
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: #0077b6;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: none;
  z-index: 998;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

backToTopBtn.addEventListener('mouseenter', () => {
  backToTopBtn.style.background = '#023e8a';
  backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
  backToTopBtn.style.background = '#0077b6';
  backToTopBtn.style.transform = 'scale(1)';
});

// === SMOOTH SCROLL FOR ALL ANCHOR LINKS ===
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

// === PARALLAX EFFECT ON HERO ===
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
  }
});

// === FORM HANDLING ===
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Simple validation
  if (name && email && subject && message) {
    // Show success message
    formMessage.textContent = '✅ Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.';
    formMessage.className = 'form-message success';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
    
    // Log form data (in real app, send to server)
    console.log('Form submitted:', { name, email, subject, message });
  } else {
    // Show error message
    formMessage.textContent = '❌ Mohon lengkapi semua field!';
    formMessage.className = 'form-message error';
    
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 3000);
  }
});

// === INPUT ANIMATION ===
const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
    this.parentElement.style.transition = 'transform 0.3s ease';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// === ANIMATE ON SCROLL ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.mission-box, .team-card, .info-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// === EMAIL VALIDATION ===
const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', function() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (this.value && !emailRegex.test(this.value)) {
    this.style.borderColor = '#dc3545';
    
    // Create error message if not exists
    let errorMsg = this.parentElement.querySelector('.error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('small');
      errorMsg.className = 'error-msg';
      errorMsg.style.color = '#dc3545';
      errorMsg.style.fontSize = '0.85em';
      errorMsg.textContent = 'Email tidak valid';
      this.parentElement.appendChild(errorMsg);
    }
  } else {
    this.style.borderColor = '#e0e0e0';
    const errorMsg = this.parentElement.querySelector('.error-msg');
    if (errorMsg) errorMsg.remove();
  }
});

console.log('✅ Tentang Page - Scripts Loaded Successfully');