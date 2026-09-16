/* ==========================================================================
   元件與宣告自動注入腳本 (js/components.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    injectHeader();
    injectFooter();
    injectModal();
    syncThemeState();
});

// 1. 自動注入頁首 Header
function injectHeader() {
    const headerEl = document.getElementById("global-header");
    if (!headerEl) return;

    headerEl.setAttribute("role", "banner");
    headerEl.className = "site-header";
    headerEl.innerHTML = `
        <div class="header-inner">
            <div class="brand-group">
                <a href="index.html" id="accesskey-U" accesskey="U" class="brand-link" title="返回首頁，快捷鍵 Alt+U">
                    <span class="brand-logo">📅</span>
                    <h1 class="brand-title">新式農民曆</h1>
                </a>
            </div>

            <div class="header-search-box">
                <span class="header-search-icon" aria-hidden="true">🔍</span>
                <input 
                    type="search" 
                    id="global-search" 
                    class="header-search-input" 
                    placeholder="搜尋好日子：輸入「結婚、搬家、開幕」..." 
                    oninput="onGlobalSearch(this.value)"
                    autocomplete="off"
                    spellcheck="false"
                >
            </div>

            <div class="header-actions">
                <button type="button" class="btn-head" onclick="toggleLargeFont()" aria-label="切換大字體模式" title="切換大字體模式">🔠 大字體</button>
                <button type="button" class="btn-head" id="theme-btn" onclick="toggleDarkMode()" aria-label="切換深色護眼模式" title="切換深色護眼模式">🌙 深色</button>
                <button type="button" class="btn-head primary" onclick="speakTodayAlmanac()" aria-label="語音朗讀今日資訊" title="語音朗讀今日資訊">🔊 朗讀</button>
            </div>
        </div>
    `;
}

// 2. 自動注入置底 Footer
function injectFooter() {
    const footerEl = document.getElementById("global-footer");
    if (!footerEl) return;

    footerEl.setAttribute("role", "contentinfo");
    footerEl.className = "site-footer";
    footerEl.innerHTML = `
        <div class="container">
            <a href="javascript:void(0)" id="accesskey-Z" accesskey="Z" class="visually-hidden" title="定位頁尾區快速鍵 [Alt+Z]">:::頁尾區定位點</a>
            
            <div class="footer-nav">
                <a href="index.html" title="回到首頁">首頁</a> ｜ 
                <a href="javascript:void(0)" onclick="openModal('about')" title="閱讀關於本站與貼心功能">關於本站與貼心功能</a> ｜ 
                <a href="javascript:void(0)" onclick="openModal('privacy')" title="閱讀隱私權政策宣告">隱私權政策</a> ｜ 
                <a href="javascript:void(0)" onclick="openModal('sitemap')" title="開啟網站導覽 (Sitemap)">🗺️ 網站導覽</a>
            </div>

            <p class="footer-copy">
                &copy; 2026 新式農民曆（簡易閱讀版） ｜ 100% 純前端本機安全運算 ✕ 遵循無障礙規範
            </p>
        </div>
    `;
}

// 3. 自動注入宣告 Modal 對話框
function injectModal() {
    if (document.getElementById("term-modal")) return;

    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = `
        <dialog id="term-modal" class="custom-modal">
            <h3 id="modal-term-title" class="modal-title"></h3>
            <div id="modal-term-desc" class="modal-desc"></div>
            <button type="button" class="btn-modal-close" onclick="document.getElementById('term-modal').close()">關閉視窗</button>
        </dialog>
    `;
    document.body.appendChild(modalContainer.firstElementChild);
}

// 4. 全站宣告字典
const LEGAL_DICT = {
    'about': {
        title: '🏢 關於本站與貼心功能',
        isHtml: true,
        desc: `
            <div style="text-align: left; line-height: 1.6; color: var(--text-main); font-size: 0.88rem;">
                <p style="margin-bottom: 0.5rem;">
                    <strong>「新式農民曆」</strong> 專為現代人與長輩打造，提供最清晰、無蓋版廣告的極簡萬年曆體驗。
                </p>
                <h4 style="color: var(--primary-red); margin-top: 0.5rem; margin-bottom: 0.2rem; font-size: 0.95rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.2rem;">
                    🌟 四大貼心特色
                </h4>
                <ul style="padding-left: 1.1rem; line-height: 1.5;">
                    <li><strong>🔒 算命不漏痕：</strong> 純前端計算，生辰與查詢紀錄絕不上傳。</li>
                    <li><strong>🔍 白話文搜尋：</strong> 搜尋「結婚、搬家」，自動對照「嫁娶、入宅」。</li>
                    <li><strong>👀 大字好按不傷眼：</strong> 支援深色護眼與大字體，高對比不誤觸。</li>
                    <li><strong>⚡ 無蓋版廣告：</strong> 開網頁極速，乾淨無負擔。</li>
                </ul>
            </div>
        `
    },
    'privacy': {
        title: '🔒 隱私權及資訊安全政策',
        isHtml: true,
        desc: `
            <div style="text-align: left; line-height: 1.6; color: var(--text-main); font-size: 0.88rem;">
                <p style="margin-bottom: 0.5rem;">本網站貫徹<strong>「100% 純前端本機運算」</strong>原則：</p>
                <p style="margin-bottom: 0.5rem;">1. 您的查詢紀錄與生辰八字僅在您的設備本機計算，絕不上傳雲端伺服器。</p>
                <p style="margin-bottom: 0.5rem;">2. 僅使用必要的 LocalStorage 保存您的護眼模式偏好設定。</p>
            </div>
        `
    },
    'sitemap': {
        title: '🗺️ 網站導覽 (Sitemap)',
        isHtml: true,
        desc: `
            <div style="text-align:left; line-height:1.6; color:var(--text-main); font-size: 0.88rem;">
                <strong style="color:var(--primary-red);">全站目錄：</strong>
                <ul style="padding-left:1.1rem; margin-top:0.3rem; line-height: 1.5;">
                    <li>🏠 <strong>農民曆主儀表板：</strong> 農曆撕曆卡、沖煞與煞方</li>
                    <li>🔍 <strong>智慧擇日搜尋：</strong> 結婚、搬家、開幕白話對照</li>
                    <li>👍 <strong>今日宜忌對照：</strong> 民俗意涵說明</li>
                    <li>⏰ <strong>12 時辰吉凶：</strong> 時辰吉凶速覽</li>
                    <li>🪙 <strong>誠心求籤與養生：</strong> 線上擲筊解籤、節氣養生指南</li>
                </ul>
            </div>
        `
    }
};

// 5. 彈窗開啟控制函數
function openModal(key, customDesc) {
    const modal = document.getElementById("term-modal");
    const titleEl = document.getElementById("modal-term-title");
    const descEl = document.getElementById("modal-term-desc");

    if (!modal || !titleEl || !descEl) return;

    if (LEGAL_DICT[key]) {
        titleEl.innerText = LEGAL_DICT[key].title;
        descEl.innerHTML = LEGAL_DICT[key].desc;
        modal.showModal();
        return;
    }

    if (key === '線上擲筊求籤') {
        titleEl.innerText = '🪙 線上誠心擲筊求籤';
        descEl.innerHTML = renderDivinationUI();
        modal.showModal();
        return;
    }

    if (key === '節氣養生') {
        titleEl.innerText = '🌿 二十四節氣順時養生指南';
        descEl.innerHTML = renderJieQiUI();
        modal.showModal();
        return;
    }

    titleEl.innerText = `宜忌說明：${key}`;
    descEl.innerText = customDesc || `【${key}】民俗說明：詳細宜忌涵義可參考傳統黃曆註解或透過智慧搜尋檢索相關吉日。`;
    modal.showModal();
}

/* ==========================================================================
   6. 緊湊型彎月紅木聖筊與分類解籤引擎 (無捲軸)
   ========================================================================== */

// 精簡版高質感 SVG 聖筊（適中尺寸）
const SVG_YANG = `
<svg class="bwa-svg" viewBox="0 0 100 160" width="55" height="88">
  <path d="M 20 10 C 90 25, 90 135, 20 150 C 50 100, 50 60, 20 10 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5"/>
  <path d="M 23 16 C 84 29, 84 131, 23 144 C 47 98, 47 62, 23 16 Z" fill="#EF4444"/>
  <text x="48" y="85" font-size="16" fill="#FEF3C7" font-weight="bold" text-anchor="middle">陽</text>
</svg>
`;

const SVG_YIN = `
<svg class="bwa-svg" viewBox="0 0 100 160" width="55" height="88">
  <defs>
    <radialGradient id="redConvex" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#F87171"/>
      <stop offset="40%" stop-color="#B91C1C"/>
      <stop offset="100%" stop-color="#450A0A"/>
    </radialGradient>
  </defs>
  <path d="M 80 10 C 10 25, 10 135, 80 150 C 50 100, 50 60, 80 10 Z" fill="url(#redConvex)" stroke="#7F1D1D" stroke-width="2.5"/>
  <path d="M 66 28 C 40 52, 40 108, 66 132" fill="none" stroke="#FCA5A5" stroke-width="3.5" stroke-linecap="round" opacity="0.65"/>
  <text x="52" y="85" font-size="16" fill="#FEE2E2" font-weight="bold" text-anchor="middle">陰</text>
</svg>
`;

const POEM_DATABASE = [
    {
        title: '甲子籤 · 大吉',
        poem: '日出便見風雲散，光明清淨照世間。<br>一向前途通大道，萬事清吉保平安。',
        details: {
            '感情婚姻': '💕 婚姻感情：單身者將遇良緣；有對象者感情修成正果，大吉。',
            '事業求財': '💼 事業求財：雲開月出，升遷投資順利，勇敢嘗試必獲回報。',
            '健康家運': '🏠 健康家運：貴人相助，微恙者遇名醫康復，家庭和睦萬事興。',
            '整體運勢': '✨ 整體運勢：障礙盡除，前途一片光明，行動皆順利。'
        }
    },
    {
        title: '乙丑籤 · 中吉',
        poem: '雲開月出正分明，不須進退問前程。<br>婚姻事業皆順遂，家道興隆百事亨。',
        details: {
            '感情婚姻': '💕 婚姻感情：情投意合，感情穩定發展，順其自然得好結果。',
            '事業求財': '💼 事業求財：腳踏實地即可獲賞識，求財宜守不宜急貪。',
            '健康家運': '🏠 健康家運：老少安康，注意日常作息規律即可保持佳態。',
            '整體運勢': '✨ 整體運勢：穩健上升期，照著當前步調進行必有收穫。'
        }
    },
    {
        title: '丙寅籤 · 小吉（宜守）',
        poem: '命內正逢羅孛星，用盡心機總未成。<br>作事須知防後患，誠心祈福自然平。',
        details: {
            '感情婚姻': '💕 婚姻感情：切忌急躁猜忌，多溝通包容可化解小爭執。',
            '事業求財': '💼 事業求財：近期宜守不宜盲目擴張，多留資金防後患。',
            '健康家運': '🏠 健康家運：注意飲食健康與疲勞，多休養可保安康。',
            '整體運勢': '✨ 整體運勢：沉澱積蓄能量期，凡事三思，誠心祈福自然平。'
        }
    }
];

let selectedAskCategory = '感情婚姻';

function selectCategory(btn, cat) {
    selectedAskCategory = cat;
    const btns = document.querySelectorAll('.cat-select-btn');
    btns.forEach(b => {
        b.style.background = 'var(--bg-main)';
        b.style.color = 'var(--text-main)';
        b.style.borderColor = 'var(--border-color)';
    });
    btn.style.background = 'var(--primary-red)';
    btn.style.color = '#FFF';
    btn.style.borderColor = 'var(--primary-red)';
}

function renderDivinationUI() {
    selectedAskCategory = '感情婚姻';
    return `
        <div style="text-align: center; line-height: 1.5;">
            <p style="margin-bottom: 0.35rem; color: var(--text-sub); font-size: 0.85rem;">
                選擇請示項目，誠心擲筊：
            </p>

            <div style="display: flex; justify-content: center; gap: 0.3rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
                <button type="button" class="cat-select-btn" onclick="selectCategory(this, '感情婚姻')" style="background: var(--primary-red); color: #FFF; border: 1px solid var(--primary-red); padding: 0.25rem 0.6rem; border-radius: 0.3rem; font-size: 0.85rem; font-weight: bold; cursor: pointer;">❤️ 感情婚姻</button>
                <button type="button" class="cat-select-btn" onclick="selectCategory(this, '事業求財')" style="background: var(--bg-main); color: var(--text-main); border: 1px solid var(--border-color); padding: 0.25rem 0.6rem; border-radius: 0.3rem; font-size: 0.85rem; font-weight: bold; cursor: pointer;">💼 事業求財</button>
                <button type="button" class="cat-select-btn" onclick="selectCategory(this, '健康家運')" style="background: var(--bg-main); color: var(--text-main); border: 1px solid var(--border-color); padding: 0.25rem 0.6rem; border-radius: 0.3rem; font-size: 0.85rem; font-weight: bold; cursor: pointer;">🏠 健康家運</button>
                <button type="button" class="cat-select-btn" onclick="selectCategory(this, '整體運勢')" style="background: var(--bg-main); color: var(--text-main); border: 1px solid var(--border-color); padding: 0.25rem 0.6rem; border-radius: 0.3rem; font-size: 0.85rem; font-weight: bold; cursor: pointer;">✨ 整體運勢</button>
            </div>

            <div class="bwa-stage">
                <div id="bwa-1">${SVG_YANG}</div>
                <div id="bwa-2">${SVG_YIN}</div>
            </div>

            <div id="bwa-msg" style="font-size: 0.95rem; font-weight: bold; margin-bottom: 0.5rem; color: var(--primary-red);">
                請點擊「誠心擲筊」
            </div>

            <button type="button" onclick="castBwa()" style="background: #F59E0B; color: #78350F; border: none; padding: 0.45rem 1.5rem; border-radius: 0.4rem; font-weight: bold; font-size: 0.95rem; cursor: pointer; min-height: 38px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
                🙏 誠心擲筊
            </button>

            <div id="slip-result" style="display: none; margin-top: 0.65rem; text-align: left; background: var(--bg-main); padding: 0.65rem; border-radius: 0.4rem; border-left: 3px solid var(--primary-red);">
            </div>
        </div>
    `;
}

function castBwa() {
    const bwa1 = document.getElementById('bwa-1');
    const bwa2 = document.getElementById('bwa-2');
    const msg = document.getElementById('bwa-msg');
    const resultBox = document.getElementById('slip-result');

    bwa1.classList.add('bwa-tossing');
    bwa2.classList.add('bwa-tossing');
    msg.innerHTML = `⚡ 請示【${selectedAskCategory}】中...`;

    setTimeout(() => {
        bwa1.classList.remove('bwa-tossing');
        bwa2.classList.remove('bwa-tossing');

        const outcomes = ['聖筊', '笑筊', '陰筊'];
        const randomRes = outcomes[Math.floor(Math.random() * outcomes.length)];

        if (randomRes === '聖筊') {
            bwa1.innerHTML = SVG_YANG;
            bwa2.innerHTML = SVG_YIN;
            msg.innerHTML = '<span style="color:#059669; font-size:1.15rem;">✨ 獲【聖筊】！</span>正在解籤...';

            setTimeout(() => {
                const slip = POEM_DATABASE[Math.floor(Math.random() * POEM_DATABASE.length)];
                const detailText = slip.details[selectedAskCategory];

                resultBox.style.display = 'block';
                resultBox.innerHTML = `
                    <h4 style="color:var(--primary-red); font-size:0.95rem; margin-bottom:0.2rem;">📜 ${slip.title}（問：${selectedAskCategory}）</h4>
                    <p style="font-weight:bold; font-size:0.88rem; margin-bottom:0.35rem; line-height:1.4;">${slip.poem}</p>
                    <p style="font-size:0.85rem; color:var(--text-main); background:#FFF; padding:0.4rem; border-radius:0.3rem; border:1px solid var(--border-color); margin-bottom:0.35rem;">${detailText}</p>
                    <div style="font-size:0.78rem; text-align:center;">
                        👉 <a href="https://shopee.tw/search?keyword=%E9%BB%9E%E7%87%8B%20%E5%85%89%E6%98%8E%E7%87%8B" target="_blank" rel="noopener" style="color:var(--primary-red); font-weight:bold; text-decoration:underline;">線上代點光明燈 / 太歲燈補運 (導購優惠)</a>
                    </div>
                `;
            }, 300);

        } else if (randomRes === '笑筊') {
            bwa1.innerHTML = SVG_YANG;
            bwa2.innerHTML = SVG_YANG;
            msg.innerHTML = '<span style="color:#D97706; font-size:1.05rem;">😅 獲【笑筊】！</span>笑而不答，請重試。';
            resultBox.style.display = 'none';
        } else {
            bwa1.innerHTML = SVG_YIN;
            bwa2.innerHTML = SVG_YIN;
            msg.innerHTML = '<span style="color:#DC2626; font-size:1.05rem;">⚠️ 獲【陰筊】！</span>時機未到，請重試。';
            resultBox.style.display = 'none';
        }
    }, 500);
}

function renderJieQiUI() {
    let jqName = '白露';
    if (typeof Solar !== 'undefined') {
        jqName = Solar.fromDate(new Date()).getLunar().getJieQi() || '白露';
    }

    return `
        <div style="text-align: left; line-height: 1.6; font-size:0.88rem;">
            <div style="background: var(--yi-bg); padding: 0.5rem; border-radius: 0.4rem; border: 1px solid var(--yi-border); margin-bottom: 0.5rem;">
                <h4 style="color: var(--yi-badge); font-size:0.95rem; margin-bottom: 0.1rem;">🌿 當前節氣：【${jqName}】</h4>
                <p style="color: var(--yi-text); font-size:0.82rem;">順應天時節氣養生，是調理體質的最佳時機。</p>
            </div>

            <h5 style="color: var(--primary-red); font-size: 0.9rem; margin-bottom: 0.2rem;">🥣 養生重點：</h5>
            <ul style="padding-left: 1.1rem; margin-bottom: 0.65rem; line-height: 1.5;">
                <li><strong>宜吃食材：</strong> 梨子、銀耳、百合、山藥、蓮子。</li>
                <li><strong>忌吃食材：</strong> 避免過量辛辣、冰冷或油炸食物。</li>
                <li><strong>生活起居：</strong> 早晚溫差大，注意保暖防受涼。</li>
            </ul>

            <hr style="border:0; border-top:1px dashed var(--border-color); margin:0.4rem 0;">
            <div style="font-size:0.78rem; text-align:center;">
                👉 <a href="https://shopee.tw/search?keyword=%E6%BD%A4%E8%82%BA%20%E9%A4%8A%E7%94%9F%E8%8C%B6%E5%8C%85" target="_blank" rel="noopener" style="color:var(--primary-red); font-weight:bold; text-decoration:underline;">選購當季漢方潤肺養生茶包 (電商折扣)</a>
            </div>
        </div>
    `;
}

// 7. 切換深色模式與狀態記憶
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeBtn();
}

function syncThemeState() {
    const stored = localStorage.getItem('theme');
    const isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('dark-mode', isDark);
    updateThemeBtn();
}

function updateThemeBtn() {
    const btn = document.getElementById('theme-btn');
    if (btn) {
        const isDark = document.body.classList.contains('dark-mode');
        btn.innerText = isDark ? '☀️ 白天' : '🌙 深色';
    }
}

// 8. 切換大字體模式
function toggleLargeFont() {
    document.body.classList.toggle('large-mode');
}