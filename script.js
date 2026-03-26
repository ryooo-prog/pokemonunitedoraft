const SHEET_URL = 'https://docs.google.com';

async function init() {
    try {
        console.log("スプレッドシートからデータを取得中...");
        // ネット公開されたので、fetchが直接使えるようになります
        const response = await fetch(SHEET_URL);
        const csvData = await response.text();
        
        const lines = csvData.split(/\r?\n/);
        const grid = document.getElementById('pokemon-grid');
        if(!grid) return;
        grid.innerHTML = ''; 

        // 2行目から読み込み
        for (let i = 1; i < lines.length; i++) {
            const data = lines[i].split(',');
            if (data.length < 3) continue;

            const nameJp = data[1].replace(/"/g, ''); // B列: 日本語名
            const nameEn = data[2].replace(/"/g, '').trim(); // C列: 英語名

            if (!nameEn) continue;

            const card = document.createElement('div');
            card.className = 'pokemon-card';
            
            // 画像URL (Unite-DB)
            const imgId = nameEn.replace(/\s+/g, '-').replace(/[._]/g, '-').replace(/'/g, '');
            const imgUrl = `https://unite-db.com{imgId}.png`;

            card.innerHTML = `
                <img src="${imgUrl}" style="width:100%; display:block;" 
                     onerror="this.src='https://via.placeholder.com{nameJp}'">
                <div style="font-size:9px; text-align:center; color:#ccc;">${nameJp}</div>
            `;

            // 【画像再現】クリックでオレンジ爆発エフェクト
            card.onclick = () => {
                document.querySelectorAll('.pokemon-card').forEach(c => {
                    c.classList.remove('selected-effect');
                    c.style.boxShadow = 'none';
                    c.style.borderColor = '#444';
                    c.style.transform = 'scale(1)';
                });
                card.classList.add('selected-effect');
                card.style.boxShadow = '0 0 40px 15px #ff6600, 0 0 15px 5px #fff';
                card.style.borderColor = '#fff';
                card.style.transform = 'scale(1.15)';
                card.style.zIndex = "100";
            };

            grid.appendChild(card);
        }
        console.log("全データの表示に成功しました！");
    } catch (error) {
        console.error("エラー:", error);
    }
}

document.addEventListener('DOMContentLoaded', init);
