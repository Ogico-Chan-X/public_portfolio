//ヘッダー制御
document.addEventListener('DOMContentLoaded', function() {
    const humButton = document.querySelector('.hum-button');
    const headerNav = document.querySelector('.header-nav');
    const header = document.querySelector('header');
    // ナビゲーション内の全リンクを取得
    const navLinks = headerNav.querySelectorAll('a'); 
    // ナビゲーションの表示状態を更新する関数
    function toggleNavAccessibility(isNavVisible) {
        // ナビゲーションが非表示の場合、リンクをタブナビゲーションから除外
        navLinks.forEach(link => {
            if (!isNavVisible) {
                link.setAttribute('tabindex', '-1');
            } else {
                link.removeAttribute('tabindex');
            }
        });
    }
    // ハンバーガーボタンクリックイベント
    humButton.addEventListener('click', function() {
        this.classList.toggle('active');
        headerNav.classList.toggle('active');
        // ナビゲーションの表示状態に基づいて、タブアクセシビリティを更新
        const isNavVisible = headerNav.classList.contains('active');
        toggleNavAccessibility(isNavVisible);
    });
    // ウィンドウリサイズイベントでPC表示時に.activeを削除
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 760) { 
            humButton.classList.remove('active');
            headerNav.classList.remove('active');
            // PC表示では全てのナビゲーションリンクがアクセス可能
            toggleNavAccessibility(true);
        }
    });

    //スクロールが100px以上でscrolledを追加
    function updateHeaderOnScroll() {
        if (window.scrollY > 100 || document.documentElement.scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // スクロールイベントでヘッダーのスタイル変更
    window.addEventListener('scroll', updateHeaderOnScroll);

    // ページ読み込み時にもスクロール位置をチェック
    updateHeaderOnScroll();

    // 初期ロード時にナビゲーションのタブアクセシビリティを設定
    // スマホビューの場合、ナビゲーションが非表示状態である可能性が高いため
    if (window.innerWidth < 760 && !headerNav.classList.contains('active')) {
        toggleNavAccessibility(false);
    }
});

//ヘッダーの現在のセクション取得
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header-nav-ul .nav-a');
    // ヘッダーの高さのオフセット
    const headerHeight = 60; 
  
    function onScroll() {
        // オフセットを考慮したスクロール位置
      let scrollPosition = window.scrollY + headerHeight; 
  
      sections.forEach((section) => {
        //各セクションがスクロール位置に含まれるかどうかチェック
        //セクションの上端がスクロール位置よりも上にあり、
        //かつセクションの下端がスクロール位置よりもその下にある場合、セクションを表示とみなす
        if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
            //ナビゲーションリンクのリストを繰り返し処理
          navLinks.forEach((navLink) => {
            //全てのナビゲーションからcurrentを削除
            navLink.classList.remove('current');
            //idと一致するhrefにcurrentを追加
            if (section.getAttribute('id') === navLink.getAttribute('href').substring(1)) {
              navLink.classList.add('current');
            }
          });
        }
      });
    }
    //スクロールするごとに実行
    window.addEventListener('scroll', onScroll);
  });
  
//スムーススクロール
document.addEventListener('DOMContentLoaded', () => {
    //ナビゲーション内のリンクにクリックイベントリスナー追加
    const navLinks = document.querySelectorAll('.header-nav-ul .nav-a');
    //各要素に対して、クリックイベントリスナーを追加し、要素がクリックされたら実行
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
        // デフォルトのアンカー動作を阻止
        e.preventDefault(); 
        // ターゲットのIDを取得
        const targetId = this.getAttribute('href'); 
        // ターゲットの要素を取得
        const targetElement = document.querySelector(targetId); 
        //指定したセレクタにマッチする要素が存在するが存在する場合に実行
        if (targetElement) {
            // ヘッダーの高さ
            const headerHeight = -40; 
            //ターゲットポジションを決める
            //スクロール先の要素の上端がビューポートからどれくらい離れているか、
            //現在のスクロールの位置を取得しヘッダーの高さを差し引く
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            //ウインドウを指定した位置までスクロール
            window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  });

//worksのタブ切り替え
document.addEventListener("DOMContentLoaded", function() {
    // スライダーの各スライドをループ
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        // 現在のスライド内のすべてのタブを取得
        const tabs = slide.querySelectorAll('[role="tab"]');
        const panels = slide.querySelectorAll('[role="tabpanel"]');

        // 現在のスライド内のすべてのタブにイベントリスナーを設定
        tabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();

                // 現在のスライド内のタブから.activeを削除し、aria-selectedをfalseに設定
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });

                // 現在のスライド内のタブコンテンツを非表示にする
                panels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.setAttribute('aria-hidden', 'true');
                });

                // 選択されたタブに.activeを付与し、aria-selectedをtrueに設定
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                // 選択されたタブに対応するコンテンツを表示する
                const activePanelId = this.getAttribute('aria-controls');
                const activePanel = slide.querySelector(`#${activePanelId}`);
                activePanel.classList.add('active');
                activePanel.setAttribute('aria-hidden', 'false');
            });
        });

        // 初期状態として、各スライドの最初のタブをアクティブにする
        if (tabs.length > 0) {
            tabs[0].click();
        }
    });
});

function toggleTab(activeTab, otherTabs, activeContent, otherContents) {
    // Activate the clicked tab
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
    // Deactivate other tabs
    otherTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    // Show the active content
    activeContent.classList.add('active');
    activeContent.removeAttribute('aria-hidden');
    // Hide the other contents
    otherContents.forEach(content => {
        content.classList.remove('active');
        content.setAttribute('aria-hidden', 'true');
    });
}


//フェードインのアニメーション
document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fadeInUp');
    //ビューポートに入ったらターゲットにactiveクラスを付与
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1 // 10%の要素が見えたらトリガー
    });
    //取得した全ての要素に適用
    fadeInElements.forEach(el => observer.observe(el));
});

//heroのロードアニメーション
document.addEventListener('DOMContentLoaded', () => {
    //画面ロード後にactiveを付与
    document.querySelector('.loadUp01').classList.add('active');
    //一定時間後にactive追加
    setTimeout(() => {
        document.querySelectorAll('.loadDown02, .loadUp02').forEach(el => {
            el.classList.add('active');
        });
    }, 500); 
    setTimeout(() => {
        document.querySelectorAll('.loadUp03').forEach(el => {
            el.classList.add('active');
        });
    }, 1200); 
});

// lottieのアニメーション
document.addEventListener('DOMContentLoaded', function() {
    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie-container'), 
        renderer: 'svg', 
        loop: true, 
        autoplay: true, 
        path: 'js/lottie.json' 
    });
});



