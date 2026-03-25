// あなたのスプレッドシート(CSV)のURL
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjbzWUFowUA471yLEwHbBDuBzmDs5C1sr1aMVj-WPRcvZVCSISi_2f1hJreYRekhWkt9TUiHYqCguB/pub?gid=0&single=true&output=csv';

async function init() {
    try {
        const response = await fetch(SHEET_URL); // ネット公開ならこれだけで動きます！
        const csvData = await response.text();
        const rows = csvData.split(/\r?\n/).slice(1);
        const grid = document.getElementById('pokemon-grid');
        grid.innerHTML = ''; 

        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length < 3) return;
            const nameJp = cols[1].replace(/"/g, ''); 
            const nameEn = cols[2].replace(/"/g, '').trim(); 
            const imgId = nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[._]/g, '-').replace(/'/g, '');
            const imgUrl = `https://unite-db.com{imgId}.png`;

            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.innerHTML = `<img src="${imgUrl}" style="width:100%;" onerror="this.src='https://via.placeholder.com{nameJp}'">`;
            card.onclick = () => {
                document.querySelectorAll('.pokemon-card').forEach(c => c.classList.remove('selected-effect'));
                card.classList.add('selected-effect');
            };
            grid.appendChild(card);
        });
    } catch (e) { console.error(e); }
}
document.addEventListener('DOMContentLoaded', init);
