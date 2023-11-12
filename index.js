const widthValue  = document.getElementById('width-value');
const widthRange  = document.getElementById('width-range');
const heightValue = document.getElementById('height-value');
const heightRange = document.getElementById('height-range');
const penBtn      = document.getElementById('pen-btn');
const eraseBtn    = document.getElementById('erase-btn');
const clear       = document.getElementById('clear');
const colorInput  = document.getElementById('color-input');
const download    = document.getElementById('download');
const generator   = document.querySelector('.generator');


// 横幅が変更された時のイベントを追加
widthRange.addEventListener('input', () => {
    widthValue.textContent = widthRange.value;
    generate(widthValue.textContent, heightValue.textContent)
});

// 縦幅が変更された時のイベントを追加
heightRange.addEventListener('input', ()=>{
    heightValue.textContent = heightRange.value;
    generate(widthValue.textContent, heightValue.textContent)
});

// ペンボタンをクリックした時の処理
penBtn.addEventListener('click', () => {
    eraseBtn.classList.remove("active");
    penBtn.classList.add("active");
});

// 消しゴムボタンをクリックした時のイベントを追加
eraseBtn.addEventListener('click', () => {
    penBtn.classList.remove("active");
    eraseBtn.classList.add("active");
});

// カラーを選択した時のイベントを追加
let color;
colorInput.addEventListener('input', () => {
    color = colorInput.value;
});

// CLEARボタンをクリックした時のイベントを追加
clear.addEventListener("click", () => {
    generate(widthValue.textContent, heightValue.textContent)
});

// ダウンロードボタンをクリックした時のイベントを追加
download.addEventListener("click", () => {
    html2canvas(generator).then(canvas => {
        var filename = prompt("あなたの作品に名前をつけてダウンロード:", "Your Work");
        if (filename) {
            var link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = filename + ".png";
            link.click();
        }
    });
});

// gridがクリックされた時に色をつける関数(クリックされたdivダグ)
function paint(col) {
    if (penBtn.classList.contains("active")) {
        col.style.backgroundColor = color;
    } else {
        col.style.backgroundColor = "#fff";
    }
}

// グリッドを生成する関数(行数, 列数)
function generate(widthValue, heightValue) {
    generator.innerHTML = "";

    // 列の生成
    for (i = 0; i < parseInt(heightValue); i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        // 行の生成
        for (j = 0; j < widthValue; j++) {
            const col = document.createElement("div");
            col.classList.add("col");
            // onclick属性を追加
            col.onclick = function() {
                paint(this);
            }
            row.appendChild(col);
        }
    generator.appendChild(row);
    }
};

// サイト読み込み時の初期化
window.onload = () => {
    generate(widthValue.textContent, heightValue.textContent);
    color = "#000";
}