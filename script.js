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
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// === IMAGE SLIDER FUNCTIONALITY ===
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  slides[index].classList.add('active');
  indicators[index].classList.add('active');
  
  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % totalSlides;
  showSlide(next);
}

function prevSlide() {
  let prev = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(prev);
}

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    showSlide(index);
  });
});

// Auto slide every 5 seconds
let autoSlide = setInterval(nextSlide, 5000);

const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

heroSection.addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 5000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// === SCROLL TO DESTINATIONS ===
document.getElementById("exploreBtn").addEventListener("click", () => {
  document.querySelector(".destinations").scrollIntoView({ behavior: "smooth" });
});

// === CARD ANIMATION ON SCROLL ===
const cards = document.querySelectorAll(".card");

function checkCards() {
  const trigger = window.innerHeight * 0.9;
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < trigger) {
      card.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkCards);
checkCards();

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// === SMOOTH SCROLL FOR ALL LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});