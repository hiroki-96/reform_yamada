// ローダー機能のみのファイル
console.log('ローダー機能が読み込まれました');

// ローダーの状態管理
let loaderState = {
  isVisible: false,
  showTime: null,
  hideTimeout: null
};

// ローダーを表示する関数
function showLoader(source = 'unknown') {
  const loader = document.getElementById('loader-wrapper');
  document.body.classList.remove('loaded');
  document.body.classList.add('loading');
  const wrapper = document.getElementById('page-content-wrapper');
  if (wrapper) {
    wrapper.style.opacity = '0';
    wrapper.style.pointerEvents = 'none';
  }
  if (loader) {
    console.log(`ローダーを表示します (${source})`);
    
    // 既存のhideTimeoutをクリア
    if (loaderState.hideTimeout) {
      clearTimeout(loaderState.hideTimeout);
      loaderState.hideTimeout = null;
    }
    
    // 強制的に表示状態にする
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    loader.style.visibility = 'visible';
    loader.classList.remove('loaded');
    loaderState.isVisible = true;
    loaderState.showTime = Date.now();
    
    console.log('ローダー表示完了:', {
      display: loader.style.display,
      opacity: loader.style.opacity,
      visibility: loader.style.visibility,
      classList: loader.classList.toString()
    });
  } else {
    console.error('ローダー要素が見つかりません');
  }
}

// ローダーを非表示にする関数
function hideLoader(source = 'unknown', minDisplayTime = 1500) {
  const loader = document.getElementById('loader-wrapper');
  if (loader && loaderState.isVisible) {
    const elapsedTime = Date.now() - loaderState.showTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
    
    console.log(`ローダーを非表示にします (${source}) - 経過時間: ${elapsedTime}ms, 待機時間: ${remainingTime}ms`);
    
    loaderState.hideTimeout = setTimeout(() => {
      loader.classList.add('loaded');
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
      const wrapper = document.getElementById('page-content-wrapper');
      if (wrapper) {
        wrapper.style.opacity = '1';
        wrapper.style.pointerEvents = 'auto';
      }
      setTimeout(() => {
        loader.style.display = 'none';
        loaderState.isVisible = false;
        console.log('ローダー完全非表示完了');
      }, 800);
    }, remainingTime);
  } else {
    console.log(`ローダー非表示スキップ (${source}) - ローダーが見つからないか既に非表示`);
  }
}

// ページが読み込まれた時の処理
function initLoader() {
  document.body.classList.remove('loaded');
  document.body.classList.add('loading');
  const wrapper = document.getElementById('page-content-wrapper');
  if (wrapper) {
    wrapper.style.opacity = '0';
    wrapper.style.pointerEvents = 'none';
  }
  showLoader('初回読み込み');
  setTimeout(() => {
    hideLoader('初回読み込み完了', 1500);
  }, 1500);
}

// === Turbo遷移イベントの包括的な対応 ===

// Turbo遷移開始前（最も早いタイミング）
document.addEventListener('turbo:before-visit', function(event) {
  console.log('turbo:before-visit イベントが発生しました - ローダーを表示', event.detail.url);
  showLoader('turbo:before-visit');
});

// Turbo遷移開始時
document.addEventListener('turbo:visit', function(event) {
  console.log('turbo:visit イベントが発生しました - ローダーを表示', event.detail.location);
  showLoader('turbo:visit');
});

// Turbo遷移完了時
document.addEventListener('turbo:load', function(event) {
  console.log('turbo:load イベントが発生しました - ローダーを非表示');
  setTimeout(() => {
    hideLoader('turbo:load', 1500);
  }, 100);
});

// Turboレンダリング完了時
document.addEventListener('turbo:render', function(event) {
  console.log('turbo:render イベントが発生しました - ローダーを非表示');
  setTimeout(() => {
    hideLoader('turbo:render', 1500);
  }, 200);
});

// フレームロード完了時
document.addEventListener('turbo:frame-load', function(event) {
  console.log('turbo:frame-load イベントが発生しました');
  hideLoader('turbo:frame-load', 500);
});

// Turbo遷移キャンセル時
document.addEventListener('turbo:before-cache', function(event) {
  console.log('turbo:before-cache イベントが発生しました');
  hideLoader('turbo:before-cache', 100);
});

// Turbo遷移エラー時
document.addEventListener('turbo:request-error', function(event) {
  console.log('turbo:request-error イベントが発生しました');
  hideLoader('turbo:request-error', 100);
});

// 初回ページ読み込み時
document.addEventListener('DOMContentLoaded', initLoader);

// === フォーム送信イベント ===
document.addEventListener('turbo:submit-start', function() {
  console.log('フォーム送信開始 - ローダーを表示');
  showLoader('turbo:submit-start');
});

document.addEventListener('turbo:submit-end', function() {
  console.log('フォーム送信完了 - ローダーを非表示');
  hideLoader('turbo:submit-end', 500);
});

// フォーム送信エラー時
document.addEventListener('turbo:submit-error', function() {
  console.log('フォーム送信エラー - ローダーを非表示');
  hideLoader('turbo:submit-error', 100);
});

// === リンククリック検出の包括的な対応 ===

// 特定のリンククリック検出を強化
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (!link || !link.href) return;
  
  // 除外するリンクの判定
  const excludePatterns = [
    '#',
    'javascript:',
    'mailto:',
    'tel:',
    'ftp:',
    'file:'
  ];
  
  const isExcluded = excludePatterns.some(pattern => link.href.startsWith(pattern));
  if (isExcluded) return;
  
  // 外部リンクの判定
  const isExternal = !link.href.startsWith(window.location.origin);
  if (isExternal) return;
  
  // 現在のページと同じURLの場合は除外
  if (link.href === window.location.href) return;
  
  // 内部リンクの場合、ローダーを表示
  console.log('内部リンククリック検出 - ローダーを表示', {
    href: link.href,
    className: link.className,
    text: link.textContent.trim()
  });
  
  // 即座にローダーを表示
  showLoader('リンククリック');
  
  // フォールバック: 5秒後に強制的に非表示
  setTimeout(() => {
    hideLoader('リンククリックフォールバック', 100);
  }, 5000);
});

// === 特定のナビゲーション要素に対する追加の検出 ===

// ヘッダーナビゲーション
document.addEventListener('click', function(e) {
  const headerNavLink = e.target.closest('.header__nav-link');
  if (headerNavLink) {
    console.log('ヘッダーナビゲーションクリック - ローダーを表示');
    showLoader('ヘッダーナビ');
  }
});

// サービスカード
document.addEventListener('click', function(e) {
  const serviceCard = e.target.closest('.service__card');
  if (serviceCard) {
    console.log('サービスカードクリック - ローダーを表示');
    showLoader('サービスカード');
  }
});

// フッターリンク
document.addEventListener('click', function(e) {
  const footerLink = e.target.closest('.footer a');
  if (footerLink) {
    console.log('フッターリンククリック - ローダーを表示');
    showLoader('フッターリンク');
  }
});

// お問い合わせボタン
document.addEventListener('click', function(e) {
  const contactButton = e.target.closest('.header__contact-button, .contact__btn');
  if (contactButton) {
    console.log('お問い合わせボタンクリック - ローダーを表示');
    showLoader('お問い合わせボタン');
  }
});

// === ブラウザナビゲーション対応 ===

// ブラウザの戻る/進むボタン
window.addEventListener('popstate', function(event) {
  console.log('ブラウザの戻る/進むボタンが押されました - ローダーを表示');
  showLoader('ブラウザナビゲーション');
});

// === その他のイベント ===

// ページが完全に読み込まれた時のイベント
window.addEventListener('load', function() {
  console.log('ページの読み込みが完了しました');
});

// ページが隠されたとき（タブ切り替え時など）
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    console.log('ページが非表示になりました');
  } else {
    console.log('ページが表示されました');
  }
});

// デバッグ用: ローダーの状態を確認する関数
window.debugLoader = function() {
  const loader = document.getElementById('loader-wrapper');
  if (loader) {
    console.log('ローダーデバッグ情報:', {
      element: loader,
      display: loader.style.display,
      opacity: loader.style.opacity,
      visibility: loader.style.visibility,
      classList: loader.classList.toString(),
      isVisible: loaderState.isVisible,
      showTime: loaderState.showTime,
      hideTimeout: loaderState.hideTimeout
    });
  } else {
    console.log('ローダー要素が見つかりません');
  }
};

// デバッグ用: 手動でローダーを表示/非表示
window.showLoaderDebug = function() {
  showLoader('デバッグ手動表示');
};

window.hideLoaderDebug = function() {
  hideLoader('デバッグ手動非表示', 100);
};

console.log('ローダーデバッグ機能が利用可能です: debugLoader(), showLoaderDebug(), hideLoaderDebug()');

// === エラーハンドリング ===

// Turbo遷移でエラーが発生した場合
document.addEventListener('turbo:visit-error', function(event) {
  console.log('Turbo遷移エラーが発生しました - ローダーを非表示');
  hideLoader('turbo:visit-error', 0);
});

// フォーム送信エラー
document.addEventListener('turbo:submit-error', function(event) {
  console.log('フォーム送信エラーが発生しました - ローダーを非表示');
  hideLoader('turbo:submit-error', 0);
});

export { showLoader, hideLoader, initLoader };