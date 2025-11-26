// === READING PROGRESS BAR ===
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
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
}

// === NAVBAR SCROLL EFFECT ===
const navbar = document.querySelector("header");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

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

// === IMAGE LAZY LOADING WITH FADE IN ===
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      img.onload = () => {
        img.style.opacity = '1';
      };
      
      // If image is already cached
      if (img.complete) {
        img.style.opacity = '1';
      }
      
      observer.unobserve(img);
    }
  });
}, {
  threshold: 0.1
});

images.forEach(img => imageObserver.observe(img));

// === ANIMATE ELEMENTS ON SCROLL ===
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.left h3, .left p, .left ul, .info-box');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        entry.target.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
};

// Run animation when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}

// === VIDEO PLAYER ENHANCEMENT ===
const videoContainer = document.querySelector('.video-container');

if (videoContainer) {
  const iframe = videoContainer.querySelector('iframe');
  
  // Add loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.2em;
    z-index: 1;
  `;
  loadingDiv.textContent = 'Loading video...';
  videoContainer.appendChild(loadingDiv);
  
  if (iframe) {
    iframe.addEventListener('load', () => {
      loadingDiv.style.display = 'none';
    });
  }
}

// === GALLERY LIGHTBOX (if gallery exists) ===
const galleryImages = document.querySelectorAll('.gallery img');

if (galleryImages.length > 0) {
  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 10000;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `;
  
  const lightboxImg = document.createElement('img');
  lightboxImg.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(255,255,255,0.3);
  `;
  
  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);
  
  // Add click handlers
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
  
  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// === READING TIME ESTIMATOR ===
const estimateReadingTime = () => {
  const leftContent = document.querySelector('.left');
  if (!leftContent) return;
  
  const text = leftContent.innerText;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
  
  const readingTimeDiv = document.createElement('div');
  readingTimeDiv.style.cssText = `
    color: #666;
    font-size: 0.9em;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  `;
  readingTimeDiv.innerHTML = `📖 Estimasi waktu baca: ${readingTime} menit`;
  
  const category = document.querySelector('.category');
  if (category) {
    category.parentNode.insertBefore(readingTimeDiv, category.nextSibling);
  }
};

// Initialize reading time when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', estimateReadingTime);
} else {
  estimateReadingTime();
}

console.log('✅ Detail Budaya Page - Scripts Loaded Successfully');