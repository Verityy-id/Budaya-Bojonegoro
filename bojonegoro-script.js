// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// === SECTION ANIMATION ON SCROLL ===
const sections = document.querySelectorAll(".section");

function checkSections() {
  const trigger = window.innerHeight * 0.85;
  
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    
    if (top < trigger) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkSections);
checkSections(); // Check on page load

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

// === IMAGE LAZY LOADING EFFECT ===
const images = document.querySelectorAll('img');

images.forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.5s ease';
  
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
  
  // If image already loaded
  if (img.complete) {
    img.style.opacity = '1';
  }
});

// === HIGHLIGHT TEXT ON CLICK (EASTER EGG) ===
let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  clickCount++;
  
  if (clickCount === 5) {
    document.body.style.transition = 'all 1s ease';
    document.body.style.filter = 'hue-rotate(180deg)';
    
    setTimeout(() => {
      document.body.style.filter = 'hue-rotate(0deg)';
      clickCount = 0;
    }, 2000);
  }
});

// === TYPING EFFECT FOR HERO TITLE (ON LOAD) ===
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingSpeed = 50;
    
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
      }
    }
    
    setTimeout(typeWriter, 500);
  }
});