'use strict';

// IDの配列を作成
let ids = ["Tile1", "Tile2", "Tile3", "Tile4", "Tile5", "Tile6", "Tile7", "Tile8", "Tile9"];
let currentId = null;
let clickCount = 0;
let countdown = 31;
let countdownInterval = null;
let countDown = document.getElementById('countDown');

// ランダムなインデックスを取得
function getRandomIndex() {
    return Math.floor(Math.random() * ids.length);
}

// 背景色をリセット
function resetBackgrounds() {
    ids.forEach(function(id) {
        let element = document.getElementById(id);
        if (element) {
            element.style.backgroundColor = "";
        }
    });
}

// ランダムな要素の背景色を変更
function changeRandomBackground() {
    resetBackgrounds();
    let randomIndex = getRandomIndex();
    currentId = ids[randomIndex];
    let element = document.getElementById(currentId);
    if (element) {
        element.style.backgroundColor = "#fff";
    }
}

// 初期化
changeRandomBackground();

// クリックイベントを設定
ids.forEach(function(id) {
    let element = document.getElementById(id);
    if (element) {
        element.style.pointerEvents = "none"; // 初期化時にクリックできないようにする
        element.addEventListener("click", function() {
            if (id === currentId && countdown > 0) {
                changeRandomBackground();
                clickCount += 1;
            }
        });
    }
});

// 画面がクリックされたら3秒のカウントダウンが始まる
document.body.addEventListener("click", function startCountdown() {
    let clickCountdown = 3;
    countDown.textContent = clickCountdown;
    let clickCountdownInterval = setInterval(function() {
        if (clickCountdown > 0) {
            clickCountdown--;
            countDown.textContent = clickCountdown;
        } if (clickCountdown === 1) {
            countDown.textContent = "start!";
        } else {
            clearInterval(clickCountdownInterval);
            // 3秒のカウントダウンが0になったらbox内のidをクリックできるようにする
            ids.forEach(function(id) {
                let element = document.getElementById(id);
                if (element) {
                    element.style.pointerEvents = "auto";
                }
            });
            // 30秒間のカウントダウンをスタートさせる
            countdownInterval = setInterval(function() {
                if (countdown > 0) {
                    countdown--;
                    countDown.textContent = countdown;
                } else {
                    clearInterval(countdownInterval);
                    countDown.textContent = clickCount;
                    // 30秒間のカウントダウンが0になったらbox内のidをクリックできないようにする
                    ids.forEach(function(id) {
                        let element = document.getElementById(id);
                        if (element) {
                            element.style.pointerEvents = "none";
                        }
                    });
                }
            }, 1000);
        }
    }, 1000);
    // 一度だけ実行するためにイベントリスナーを削除
    document.body.removeEventListener("click", startCountdown);
});
