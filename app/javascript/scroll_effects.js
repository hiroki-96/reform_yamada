// スクロール効果のみのファイル
console.log('スクロール効果が読み込まれました');

// グローバル変数
let scrollObserver = null;
let effectObserver = null;

// スクロール効果を初期化する関数
function initScrollEffects() {
  console.log('スクロール効果の初期化開始');
  
  // 既存のObserverを削除
  if (scrollObserver) {
    scrollObserver.disconnect();
    scrollObserver = null;
  }
  
  // 全ての要素から visible クラスを削除
  const allElements = document.querySelectorAll('.fade-in, .fade-in-up, .stagger-fade, .rotate-in');
  allElements.forEach(el => {
    el.classList.remove('visible', 'fallback-visible');
    el.style.transitionDelay = '';
  });
  
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || '0s';
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
        console.log('要素が表示されました:', entry.target.tagName, entry.target.className);
      }
    });
  }, options);
  
  // 監視対象の要素を追加
  const elements = document.querySelectorAll('.fade-in, .fade-in-up, .stagger-fade, .rotate-in');
  console.log('監視対象要素数:', elements.length);
  
  elements.forEach(el => {
    scrollObserver.observe(el);
  });
  
  // フォールバック: 3秒後に全て表示
  setTimeout(() => {
    console.log('フォールバック: 全要素を強制表示');
    elements.forEach(el => {
      if (!el.classList.contains('visible')) {
        el.classList.add('fallback-visible');
      }
    });
  }, 3000);
}

// 高度なスクロール効果を初期化する関数
function initAdvancedScrollEffects() {
  console.log('高度なスクロール効果の初期化開始');
  
  // 既存のObserverを削除
  if (effectObserver) {
    effectObserver.disconnect();
    effectObserver = null;
  }
  
  // 要素の状態をリセット
  const advancedElements = document.querySelectorAll('.fade-in.from-bottom, .fade-in.from-left, .fade-in.from-right, .fade-in.scale-up');
  advancedElements.forEach(el => {
    el.classList.remove('visible');
    const textContent = el.querySelector('.text-content');
    if (textContent) {
      textContent.classList.remove('visible');
    }
  });
  
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  effectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // テキストリビール効果
        const textContent = entry.target.querySelector('.text-content');
        if (textContent) {
          textContent.classList.add('visible');
        }
        
        console.log('高度な効果が適用されました:', entry.target.tagName, entry.target.className);
      }
    });
  }, options);
  
  console.log('高度なスクロール効果の監視対象要素数:', advancedElements.length);
  
  advancedElements.forEach(el => {
    effectObserver.observe(el);
  });
}

// 初期化関数
function initAllScrollEffects() {
  initScrollEffects();
  initAdvancedScrollEffects();
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    initAllScrollEffects();
  });
});
document.addEventListener('turbo:load', () => {
  requestAnimationFrame(() => {
    initAllScrollEffects();
  });
});
document.addEventListener('turbo:render', () => {
  requestAnimationFrame(() => {
    initAllScrollEffects();
  });
});

export { initScrollEffects, initAdvancedScrollEffects, initAllScrollEffects };