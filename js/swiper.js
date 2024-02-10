//worksのマスターswiperを設定
const swiper0 = new Swiper('.swiper-works00', {
    autoplay: false,
    speed: 1000,
    navigation: {
        nextEl: '.swiper-button-next00',
        prevEl: '.swiper-button-prev00',
    },
    on: {
        init: function () {
            // ナビゲーションボタンのフォーカス解除
            document.querySelector('.swiper-button-next00').addEventListener('click', function () { this.blur(); });
            document.querySelector('.swiper-button-prev00').addEventListener('click', function () { this.blur(); });
        }
    }
});

//ライトボックス5つのSwiperインスタンスを初期化
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 5; i++) {
        initSwiper(`0${i}`);
    }
});

//loopで各スライドの設定とライトボックスの開閉を設定
function initSwiper(index) {
    //サムネイルの連動設定
    const swiperThumbnail = new Swiper(`.for-thumbnail${index}`, {
        slidesPerView: 4,
        spaceBetween: 8,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    //拡大画像のスライド設定
    const swiperMain = new Swiper(`.for-main${index}`, {
        effect: "fade",
        navigation: {
            nextEl: `.swiper-button-next${index}`,
            prevEl: `.swiper-button-prev${index}`,
        },
        thumbs: {
            swiper: swiperThumbnail,
        },
        on: {
            init: function () {
                // ナビゲーションボタンのフォーカス解除
                document.querySelector(`.swiper-button-next${index}`).addEventListener('click', function () { this.blur(); });
                document.querySelector(`.swiper-button-prev${index}`).addEventListener('click', function () { this.blur(); });
            }
        }
    });

   // ライトボックスの閉じるボタン
   const closeButton = document.querySelector(`.close-${index}`);
//    closeButton.setAttribute('tabindex', '0'); 
   // tabindexを設定してフォーカス可能にする

   // クリックで閉じるイベント
   closeButton.addEventListener('click', closeLightbox);

   // キーボード操作で閉じるイベント
   closeButton.addEventListener('keydown', function(e) {
       if (e.key === 'Enter' || e.keyCode === 13) {
           closeLightbox(); // エンターキーが押されたら閉じる
       }
   });

   // ライトボックス外クリックで閉じるイベント
   const lightbox = document.querySelector(`.lightbox-${index}`);
   lightbox.addEventListener('click', function(event) {
       if (event.target === this) {
           closeLightbox(); // ライトボックス外をクリックしたら閉じる
       }
   });

    //ライトボックスを閉じる関数
    function closeLightbox() {
        lightbox.style.display = 'none';
    };

    // ライトボックスを開くイベントをセットアップ
    document.querySelectorAll(`.button-for-works${index}`).forEach(function(trigger) {
        trigger.setAttribute('tabindex', '0'); // tabindexを設定してフォーカス可能にする

        // クリックイベントでライトボックスを開く
        trigger.addEventListener('click', function() {
            document.querySelector(`.lightbox-${index}`).style.display = 'flex';
            swiperMain.update();
            swiperThumbnail.update();
        });

        // キーボード操作でライトボックスを開く
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                document.querySelector(`.lightbox-${index}`).style.display = 'flex';
                swiperMain.update();
                swiperThumbnail.update();
            }
        });
    });

    //サムネイルのキーボード操作
    document.querySelectorAll(`.for-thumbnail${index} .swiper-slide`).forEach((slide, idx) => {
        slide.setAttribute('tabindex', '0'); // tabindexを設定してフォーカス可能にする
        slide.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                swiperMain.slideTo(idx); // エンターキーが押されたサムネイルに対応するメインSwiperのスライドへ移動
            }
        });
    });
}