// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// 新しいファイルを読み込み
import "./loader"
import "./scroll_effects"

console.log('Application.js が読み込まれました');

// その他のUI機能
document.addEventListener('DOMContentLoaded', function() {
  console.log('Application.js の DOMContentLoaded イベントが発生');
  
  // ページトップボタン
  const pageTopBtn = document.querySelector('.page-top-btn');
  if (pageTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        pageTopBtn.classList.add('visible');
      } else {
        pageTopBtn.classList.remove('visible');
      }
    });
  }

  // サービスカードのクリック効果
  const serviceCards = document.querySelectorAll('.service__card');
  serviceCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // リップル効果
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ヘッダーのスクロール効果
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
      } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
    });
  }

  // パフォーマンス最適化: 画像の遅延読み込み
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ナビゲーションメニューのアクティブ状態
  const navLinks = document.querySelectorAll('.header__nav-link');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .service__card {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .header__nav-link.active .nav-en {
    color: #66BEFD !important;
  }
  
  .header__nav-link.active .nav-ja {
    color: #66BEFD !important;
  }
`;
document.head.appendChild(style);