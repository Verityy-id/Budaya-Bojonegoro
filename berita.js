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

// === NEWS ARTICLE ANIMATION ON SCROLL ===
const newsArticles = document.querySelectorAll('.news-article');

const articleObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150); // Stagger animation
      articleObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

newsArticles.forEach(article => {
  articleObserver.observe(article);
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

// === EXTERNAL LINK WARNING ===
const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Optional: Add external link icon
    if (!link.querySelector('.external-icon')) {
      const icon = document.createElement('span');
      icon.className = 'external-icon';
      icon.innerHTML = ' ↗';
      icon.style.fontSize = '0.8em';
      link.appendChild(icon);
    }
  });
});

// === SEARCH FUNCTIONALITY (Optional) ===
const addSearchFeature = () => {
  const container = document.querySelector('.container');
  if (!container) return;

  const searchBox = document.createElement('div');
  searchBox.style.cssText = `
    margin-bottom: 30px;
    text-align: center;
  `;
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = '🔍 Cari berita...';
  searchInput.style.cssText = `
    padding: 12px 20px;
    width: 100%;
    max-width: 500px;
    border: 2px solid #e0e0e0;
    border-radius: 25px;
    font-size: 1em;
    transition: all 0.3s ease;
  `;
  
  searchInput.addEventListener('focus', () => {
    searchInput.style.borderColor = '#0077b6';
    searchInput.style.boxShadow = '0 0 10px rgba(0,119,182,0.2)';
  });
  
  searchInput.addEventListener('blur', () => {
    searchInput.style.borderColor = '#e0e0e0';
    searchInput.style.boxShadow = 'none';
  });
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    newsArticles.forEach(article => {
      const title = article.querySelector('h2').textContent.toLowerCase();
      const content = article.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        article.style.display = 'flex';
      } else {
        article.style.display = 'none';
      }
    });
    
    // Check if any articles are visible
    const visibleArticles = Array.from(newsArticles).filter(
      article => article.style.display !== 'none'
    );
    
    // Show/hide "no results" message
    let noResultsMsg = document.getElementById('no-results');
    if (visibleArticles.length === 0 && searchTerm !== '') {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-results';
        noResultsMsg.className = 'no-news';
        noResultsMsg.textContent = 'Tidak ada berita yang sesuai dengan pencarian Anda.';
        container.appendChild(noResultsMsg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  });
  
  searchBox.appendChild(searchInput);
  
  const pageTitle = document.querySelector('.page-title');
  if (pageTitle && pageTitle.nextSibling) {
    container.insertBefore(searchBox, pageTitle.nextSibling);
  }
};

// Initialize search feature when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addSearchFeature);
} else {
  addSearchFeature();
}

// === NEWS COUNT ===
const showNewsCount = () => {
  const count = newsArticles.length;
  const pageTitle = document.querySelector('.page-title');
  
  if (pageTitle && count > 0) {
    const countSpan = document.createElement('span');
    countSpan.style.cssText = `
      display: block;
      font-size: 0.5em;
      color: #888;
      margin-top: 10px;
      font-weight: normal;
    `;
    countSpan.textContent = `${count} Berita Tersedia`;
    pageTitle.appendChild(countSpan);
  }
};

// Initialize news count
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showNewsCount);
} else {
  showNewsCount();
}

console.log('✅ Berita Page - Scripts Loaded Successfully');