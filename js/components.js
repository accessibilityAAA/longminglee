/* ==========================================================================
   新式農民曆 - 旗艦多語系組件 ✕ 沉浸式音效與儀式感靈籤 (js/components.js)
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. 全站 i18n 多語系字典模組 (繁中 / 簡中 / 英文)
// --------------------------------------------------------------------------
const I18N_DICT = {
    'zh-TW': {
        brandTitle: '新式農民曆',
        searchPlaceholder: '搜尋好日子：輸入「結婚、搬家、開幕」...',
        btnLargeFont: '🔠 大字體',
        btnThemeDark: '🌙 深色',
        btnThemeLight: '☀️ 白天',
        btnLang: '🌐 語系',
        btnSpeech: '🔊 朗讀',
        footerHome: '首頁',
        footerMarry: '結婚吉日',
        footerMove: '搬家吉日',
        footerAbout: '關於本站',
        footerPrivacy: '隱私權政策',
        footerSitemap: '🗺️ 網站導覽',
        modalClose: '關閉視窗 (Esc)',
        divinationTitle: '🪙 線上誠心擲筊求籤',
        divinationHint: '✨ 誠心向神明祈求指點，選擇想問的事項：',
        catLove: '❤️ 感情婚姻',
        catWork: '💼 事業求財',
        catHealth: '🏠 健康家運',
        catLuck: '✨ 整體運勢',
        btnToss: '🪙 誠心擲筊',
        btnRetoss: '🔄 重新請示神明',
        tossRitualNotice: '🙏 心誠則靈：請先在心中向神明默念您的姓名、生辰與心中所求，準備好後再擲筊請示。'
    },
    'zh-CN': {
        brandTitle: '新式农民历',
        searchPlaceholder: '搜索好日子：输入“结婚、搬家、开幕”...',
        btnLargeFont: '🔠 大字体',
        btnThemeDark: '🌙 深色',
        btnThemeLight: '☀️ 白天',
        btnLang: '🌐 语系',
        btnSpeech: '🔊 朗读',
        footerHome: '首页',
        footerMarry: '结婚吉日',
        footerMove: '搬家吉日',
        footerAbout: '关于本站',
        footerPrivacy: '隐私权政策',
        footerSitemap: '🗺️ 网站导航',
        modalClose: '关闭窗口 (Esc)',
        divinationTitle: '🪙 线上诚心掷筊求签',
        divinationHint: '✨ 诚心向神明祈求指点，选择想问的事项：',
        catLove: '❤️ 感情婚姻',
        catWork: '💼 事业求财',
        catHealth: '🏠 健康家运',
        catLuck: '✨ 整体运势',
        btnToss: '🪙 诚心掷筊',
        btnRetoss: '🔄 重新请示神明',
        tossRitualNotice: '🙏 心诚则灵：请先在心中向神明默念您的姓名、生辰与心中所求，准备好后再掷筊请示。'
    },
    'en': {
        brandTitle: 'Modern Almanac',
        searchPlaceholder: 'Search auspicious dates (e.g. Wedding, Moving)...',
        btnLargeFont: '🔠 Text Size',
        btnThemeDark: '🌙 Dark',
        btnThemeLight: '☀️ Light',
        btnLang: '🌐 Language',
        btnSpeech: '🔊 Speech',
        footerHome: 'Home',
        footerMarry: 'Wedding Days',
        footerMove: 'Moving Days',
        footerAbout: 'About Us',
        footerPrivacy: 'Privacy Policy',
        footerSitemap: '🗺️ Sitemap',
        modalClose: 'Close (Esc)',
        divinationTitle: '🪙 Online Moon Block Divination',
        divinationHint: '✨ Pray with sincerity and select a topic:',
        catLove: '❤️ Love & Marriage',
        catWork: '💼 Career & Wealth',
        catHealth: '🏠 Health & Home',
        catLuck: '✨ Overall Luck',
        btnToss: '🪙 Cast Moon Blocks',
        btnRetoss: '🔄 Ask Deity Again',
        tossRitualNotice: '🙏 Sincerity is key: Please silently recite your name, birthday, and wish before casting.'
    }
};

let currentLang = localStorage.getItem('lang') || 'zh-TW';

document.addEventListener("DOMContentLoaded", function () {
    injectHeader();
    injectFooter();
    injectModal();
    syncThemeState();
    injectAdSlots();
});

function getBasePath() {
    return window.location.pathname.includes('/dates/') ? '../' : './';
}

function switchLanguage() {
    if (currentLang === 'zh-TW') currentLang = 'zh-CN';
    else if (currentLang === 'zh-CN') currentLang = 'en';
    else currentLang = 'zh-TW';

    localStorage.setItem('lang', currentLang);
    location.reload();
}

// --------------------------------------------------------------------------
// Web Audio 原生音效合成引擎 (真實木頭翻滾打擊音 ✕ 勝筊吉祥和弦)
// --------------------------------------------------------------------------
function playBwaAudio(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        if (type === 'toss') {
            // 模擬聖筊落地旋轉打擊翻滾聲 (連續 3 次輕重打擊)
            const delays = [0, 0.12, 0.22];
            const freqs = [220, 160, 120];
            delays.forEach((delay, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freqs[i], ctx.currentTime + delay);
                osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + delay + 0.07);
                gain.gain.setValueAtTime(0.7 - i * 0.15, ctx.currentTime + delay);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.07);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + delay);
                osc.stop(ctx.currentTime + delay + 0.07);
            });
        } else if (type === 'win') {
            // 聖筊揭曉悅耳祥和弦
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
                gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.09);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.09 + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + i * 0.09);
                osc.stop(ctx.currentTime + i * 0.09 + 0.35);
            });
        }
    } catch (e) {
        console.log("Audio play prevented or unsupported.");
    }
}

// --------------------------------------------------------------------------
// 2. 自動注入 Header
// --------------------------------------------------------------------------
function injectHeader() {
    const headerEl = document.getElementById("global-header");
    if (!headerEl) return;

    const basePath = getBasePath();
    const t = I18N_DICT[currentLang];

    headerEl.setAttribute("role", "banner");
    headerEl.className = "site-header";
    headerEl.innerHTML = `
        <div class="header-inner">
            <div class="brand-group">
                <a href="${basePath}index.html" id="accesskey-U" accesskey="U" class="brand-link" title="Return Home">
                    <span class="brand-logo">📅</span>
                    <h1 class="brand-title">${t.brandTitle}</h1>
                </a>
            </div>

            <div class="header-search-box">
                <span class="header-search-icon" aria-hidden="true">🔍</span>
                <input 
                    type="search" 
                    id="global-search" 
                    class="header-search-input" 
                    placeholder="${t.searchPlaceholder}" 
                    oninput="typeof onGlobalSearch === 'function' && onGlobalSearch(this.value)"
                    autocomplete="off"
                    spellcheck="false"
                >
            </div>

            <div class="header-actions">
                <button type="button" class="btn-head" onclick="switchLanguage()" title="Switch Language">${t.btnLang}: ${currentLang === 'zh-TW' ? '繁中' : (currentLang === 'zh-CN' ? '简中' : 'EN')}</button>
                <button type="button" class="btn-head" onclick="toggleLargeFont()">${t.btnLargeFont}</button>
                <button type="button" class="btn-head" id="theme-btn" onclick="toggleDarkMode()">${t.btnThemeDark}</button>
                <button type="button" class="btn-head primary" onclick="speakTodayAlmanac()">${t.btnSpeech}</button>
            </div>
        </div>
    `;
}

// --------------------------------------------------------------------------
// 3. 自動注入 Footer
// --------------------------------------------------------------------------
function injectFooter() {
    const footerEl = document.getElementById("global-footer");
    if (!footerEl) return;

    const basePath = getBasePath();
    const currentYear = new Date().getFullYear();
    const t = I18N_DICT[currentLang];

    footerEl.setAttribute("role", "contentinfo");
    footerEl.className = "site-footer";
    footerEl.innerHTML = `
        <div class="container">
            <a href="javascript:void(0)" id="accesskey-Z" accesskey="Z" class="visually-hidden">:::Footer Area</a>
            
            <div class="footer-nav">
                <a href="${basePath}index.html" title="Home">${t.footerHome}</a> ｜ 
                <a href="${basePath}marry-${currentYear}.html" title="Wedding Days">${currentYear} ${t.footerMarry}</a> ｜ 
                <a href="${basePath}move-${currentYear}.html" title="Moving Days">${currentYear} ${t.footerMove}</a> ｜ 
                <a href="javascript:void(0)" onclick="openModal('about')" title="About Us">${t.footerAbout}</a> ｜ 
                <a href="javascript:void(0)" onclick="openModal('privacy')" title="Privacy Policy">${t.footerPrivacy}</a> ｜ 
                <a href="javascript:void(0)" onclick="openModal('sitemap')" title="Sitemap">${t.footerSitemap}</a>
            </div>

            <p class="footer-copy">
                &copy; ${currentYear} ${t.brandTitle} ｜ 100% Client-Side Pure Local Calculation ✕ WCAG Compliant
            </p>
        </div>
    `;
}

// --------------------------------------------------------------------------
// 4. 自動注入 Modal 對話框
// --------------------------------------------------------------------------
function injectModal() {
    if (document.getElementById("term-modal")) return;

    const t = I18N_DICT[currentLang] || I18N_DICT['zh-TW'];
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = `
        <dialog id="term-modal" class="custom-modal">
            <!-- 右上角固定 ✕ 關閉按鈕 -->
            <button type="button" class="btn-modal-x" onclick="closeCommonModal()" aria-label="Close">✕</button>

            <h3 id="modal-term-title" class="modal-title"></h3>
            <div id="modal-term-desc" class="modal-desc"></div>
            <button type="button" class="btn-modal-close" onclick="closeCommonModal()">${t.modalClose}</button>
        </dialog>
    `;
    document.body.appendChild(modalContainer.firstElementChild);
}

function closeCommonModal() {
    const modal = document.getElementById('term-modal');
    if (modal && typeof modal.close === 'function') {
        modal.close();
    }
}

// --------------------------------------------------------------------------
// 5. 動態廣告區
// --------------------------------------------------------------------------
function injectAdSlots() {
    const cardYi = document.querySelector('.card-yi');
    const cardJi = document.querySelector('.card-ji');
    
    if (cardYi && cardJi && !document.getElementById('ad-yiji-slot')) {
        const adDiv = document.createElement('div');
        adDiv.id = 'ad-yiji-slot';
        adDiv.className = 'adsense-slot ads-in-yiji';
        adDiv.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
                 data-ad-slot="1234567890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        `;
        cardYi.parentNode.insertBefore(adDiv, cardJi);
    }
}

function refreshAdsense() {
    try {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    } catch (e) {
        console.log("AdSense Refresh Triggered");
    }
}

// --------------------------------------------------------------------------
// 6. 全站條款與說明 Modal 內容字典
// --------------------------------------------------------------------------
const LEGAL_DICT = {
    'about': {
        title: '🏢 關於本站與貼心功能',
        desc: `
            <div style="text-align: left; line-height: 1.6; color: var(--text-main); font-size: 0.92rem;">
                <p style="margin-bottom: 0.5rem;">
                    <strong>「新式農民曆」</strong> 專為現代人與長輩打造，提供最清晰、無蓋版廣告的極簡萬年曆體驗。
                </p>
                <h4 style="color: var(--primary-red); margin-top: 0.75rem; margin-bottom: 0.3rem; font-size: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.2rem;">
                    🌟 四大貼心特色
                </h4>
                <ul style="padding-left: 1.2rem; line-height: 1.6;">
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
        desc: `
            <div style="text-align: left; line-height: 1.6; color: var(--text-main); font-size: 0.92rem;">
                <p style="margin-bottom: 0.5rem;">本網站貫徹<strong>「100% 純前端本機運算」</strong>原則：</p>
                <p style="margin-bottom: 0.5rem;">1. 您的查詢紀錄與生辰八字僅在您的設備本機計算，絕不上傳雲端伺服器。</p>
                <p style="margin-bottom: 0.5rem;">2. 僅使用必要的 LocalStorage 保存您的護眼模式偏好設定。</p>
            </div>
        `
    },
    'sitemap': {
        title: '🗺️ 網站導覽 (Sitemap)',
        desc: `
            <div style="text-align:left; line-height:1.6; color:var(--text-main); font-size: 0.92rem;">
                <strong style="color:var(--primary-red);">全站目錄：</strong>
                <ul style="padding-left:1.2rem; margin-top:0.3rem; line-height: 1.6;">
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

    if (key === '線上擲筊求籤' || key === 'Online Divination') {
        titleEl.innerText = I18N_DICT[currentLang].divinationTitle;
        descEl.innerHTML = renderDivinationUI();
        modal.showModal();
        return;
    }

    if (key === '節氣養生' || key === 'Solar Term Health') {
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
   7. 擲筊求籤與解籤 UI 邏輯（含極致儀式感提醒 ✕ 超醒目重新請示）
   ========================================================================== */

const SVG_YANG = `
<svg class="bwa-svg" viewBox="0 0 100 160" width="70" height="100">
  <filter id="bwa-shadow" x="-20%" y="-10%" width="140%" height="130%">
    <feDropShadow dx="0" dy="8" stdDeviation="5" flood-color="#000" flood-opacity="0.25"/>
  </filter>
  <g filter="url(#bwa-shadow)">
    <path d="M 15 15 C 85 20, 95 140, 15 145 C 55 105, 55 55, 15 15 Z" fill="#DC2626" stroke="#991B1B" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 20 22 C 78 28, 85 132, 20 138 C 48 100, 48 60, 20 22 Z" fill="#EF4444" opacity="0.6"/>
  </g>
</svg>
`;

const SVG_YIN = `
<svg class="bwa-svg" viewBox="0 0 100 160" width="70" height="100">
  <defs>
    <radialGradient id="bwaRedConvex" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#F87171"/>
      <stop offset="50%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#7F1D1D"/>
    </radialGradient>
  </defs>
  <g filter="url(#bwa-shadow)">
    <path d="M 85 15 C 15 20, 5 140, 85 145 C 45 105, 45 55, 85 15 Z" fill="url(#bwaRedConvex)" stroke="#7F1D1D" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 75 30 C 35 55, 35 105, 75 130" fill="none" stroke="#FECDD3" stroke-width="5" stroke-linecap="round" opacity="0.65"/>
  </g>
</svg>
`;

const POEM_DATABASE = [
  {
    title: '🌸 第一籤【甲子】· 鳳嬌觀音庵尋夫 / 撥雲見日（大吉）',
    poem: '日出便見風雲散，光明清淨照世間。<br>一向前途通大道，萬事清吉保平安。',
    story: '📜 經典典故：【朱德勝理髮】／【鳳嬌觀音庵尋夫】<br>歷史上的鳳嬌經歷種種磨難與波折，一度以為這輩子再也見不到心上人，卻在最絕望時於觀音庵驚喜重逢。這張籤代表「轉折點到了，過往的烏雲都會被大太陽曬乾！」',
    details: {
      '感情婚姻': '💕 感情婚姻：【雙雙對對・大吉大利】<br>過往的卡關、誤會或對未來的焦慮，現在就像清晨的濃霧遇到烈日，通通煙消雲散。單身者：恭喜你，最近紅線牽得非常緊，極可能遇到價值觀超合、聊天完全不尬場的靈魂伴侶；有伴者：之前的摩擦將一掃而空，非常適合規劃結婚、買房或踏入人生下一個重要階段。',
      me: '💡 神明給你的靈感指引：<br>就像開了濾鏡與高光一樣！把過去那些內耗與無謂的糾結直接封鎖，你現在的氣場超讚，對的人正踩著油門朝你奔來。',
      '事業求財': '💼 事業求財：【大展鴻圖・撥雲見日】<br>之前覺得懷才不遇、推不動的專案或停滯不前的薪水，現在開始全面解封。你在暗處累積的實力將被重量級貴人看見。想換工作、創業或爭取加薪，請勇敢把提案拿出來，這波好運會挺你到底！',
      '健康家運': '🏠 健康家運：【家和萬事興・吉星高照】<br>家中若有長期慢性病或身心疲憊的成員，將會遇到極具醫德的好醫師或合適的療癒方案。家庭氣場清淨祥和，近期親友間會有結婚、添丁或買房等大喜事傳來。',
      '整體運勢': '✨ 整體運勢：【光明大道】<br>這是一張牌面極佳的起手籤。不用再神經兮兮地懷疑自己，保持光明磊落與自信，直接朝著你的目標衝過去就對了！'
    }
  },
  {
    title: '🌟 第二籤【乙丑】· 薛仁貴回家重會妻 / 水到渠成（順心中吉）',
    poem: '雲開月出正分明，不須進退問前程。<br>婚姻事業皆順遂，家道興隆百事亨。',
    story: '📜 經典典故：【薛仁傳統重會妻】／【趙五娘尋夫】<br>薛仁貴遠征多年，妻子苦守寒窯，最終兩人苦盡甘來、大團圓。這張籤告訴你：不要被眼前的短暫等待嚇到了，時間會給出最好的交代，結果比你想像的還要甜！',
    details: {
      '感情婚姻': '💕 感情婚姻：【水到渠成・感情加溫】<br>感情不是比速度，而是比深度。兩人的默契已經經過了時間的磨合，漸入佳境。多安排一點戶外走走或溫馨的居家料理約會，兩人的心會貼得更近，適合穩定發展長久關係。',
      me: '💡 神明給你的靈感指引：<br>別再小劇場大爆發啦！對方不是不愛你，只是個性比較務實。放寬心，順其自然就能贏得滿滿的幸福。',
      '事業求財': '💼 事業求財：【穩紮穩打・正財滾滾】<br>不用病急亂投醫，也不需要盲目羨羨別人的快道。你現在走的路非常健康！職場上只要腳踏實地完成手頭任務，主管與客戶都看在眼裡。求財方面宜守正財，穩穩累積才是王道。',
      '健康家運': '🏠 健康家運：【歲月靜好・平安是福】<br>家運蒸蒸日上，老少安康。唯一的建議是注意規律作息，別為了追劇或加班熬夜，多補充原型食物與水分，身體會給你最好的回饋。',
      '整體運勢': '✨ 整體運勢：【明朗順遂】<br>局勢已經完全清晰，所有的疑慮都有了答案。不需要慌張地進退，按照當前的步調穩定向前走，收穫的果實絕對甜美。'
    }
  },
  {
    title: '🍀 第三籤【丙寅】· 周瑜赤壁破曹 / 蓄勢待發（吉祥平安）',
    poem: '水到渠成自然順，誠心善意福自來。<br>莫道眼前沉吟久，明朝桃花滿開懷。',
    story: '📜 經典典故：【楊管留衣】／【周瑜赤壁破曹】<br>周瑜在赤壁之戰前萬事俱備，唯欠東風。看似焦慮的等待，其實是在等最關鍵的時機。這張籤在提醒你：「不是你不行，而是最棒的 timing 還在路上！」',
    details: {
      '感情婚姻': '💕 感情婚姻：【深情即長久・醞釀真愛】<br>真摯的感情需要時間發酵。如果你們最近有點小衝突，請記得給彼此一點喘息與思考空間。少一句爭執，多一份理解，等這陣情緒過去，關係會變得比以前更加緊密。',
      me: '💡 神明給你的靈感指引：<br>好酒沉甕底，好心動值得等！不用急著速食談愛，先把自己過得精彩，對的人隨後就到。',
      '事業求財': '💼 事業求財：【厚積薄發・等待東風】<br>眼前的停滯不是失敗，而是神明在幫你做「壓力測試」與累積實力。利用這段時間多考證照、學新工具或調整心態，一旦時機成熟，你將會一飛衝天！',
      '健康家運': '🏠 健康家運：【潤物無聲・養精蓄銳】<br>這段時間非常適合進行身心靈的保養。睡前試著不看手機、泡個熱水澡或聽聽輕音樂。把睡眠品質顧好，氣色自然紅潤，運勢也會跟著變好。',
      '整體運勢': '✨ 整體運勢：【神明庇佑】<br>只要心存善念、腳踏實地，所有的難關都會變成你的養分。保持自信與微笑，屬於你的高光時刻很快就會到來！'
    }
  },
  {
    title: '👑 第四籤【丁卯】· 太公家業八十成 / 揚帆破浪（上吉）',
    poem: '風恬浪靜可行舟，恰是中秋月一輪。<br>凡事不須多憂慮，福祿自有神明保。',
    story: '📜 經典典故：【伏羲畫卦】／【太公家業八十成】<br>姜太公八十歲才遇到文王，看似大器晚成，一出手卻奠定了周朝八百年基業。這張籤代表：「你過去累積的所有努力，現在通通到了兌現的時刻！」',
    details: {
      '感情婚姻': '💕 感情婚姻：【圓圓滿滿・月圓人團圓】<br>風浪已經平息，過去的猜忌與不安通通劃下句點。兩人之間的信任感達到前所未有的高峰，感情就像中秋明月一樣圓滿無瑕，非常適合規劃共同的未來。',
      me: '💡 神明給你的靈感指引：<br>幸福指數直接爆表！多一點誇獎與貼心的小舉動，讓對方知道你有多在乎他/她，感情會甜到發洋蔥！',
      '事業求財': '💼 事業求財：【順風順水・揚帆出海】<br>職場上的小人與障礙已經退散，現在是展現野心的最佳時刻。無論是跳槽、爭取新專案還是擴大營業，阻力都是最小的，儘管大膽放手一搏！',
      '健康家運': '🏠 健康家運：【平安即是福】<br>身心靈達到極佳的平衡，精神奕奕、氣場強大。家中成員氣氛融洽，適合安排一場家族旅遊或溫馨聚餐，能進一步凝聚家庭凝聚力。',
      '整體運勢': '✨ 整體運勢：【福星高照】<br>神明與天時地利通通站在你這邊！放下心中的顧慮與猶豫，輕裝上陣，勇敢邁開步伐去收穫屬於你的豐碩成果吧！'
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

// 儀式感重新請示重置
function resetDivinationUI() {
    const stage = document.getElementById('bwa-stage-box');
    const tossBtn = document.getElementById('bwa-toss-btn');
    const resultBox = document.getElementById('slip-result');
    const msg = document.getElementById('bwa-msg');

    if (stage) stage.style.display = 'flex';
    if (tossBtn) tossBtn.style.display = 'inline-flex';
    if (resultBox) resultBox.style.display = 'none';
    if (msg) {
        const t = I18N_DICT[currentLang] || I18N_DICT['zh-TW'];
        msg.innerHTML = `<span style="color:var(--primary-red); font-size:0.95rem;">${t.tossRitualNotice}</span>`;
    }
}

function renderDivinationUI() {
    selectedAskCategory = '感情婚姻';
    const t = I18N_DICT[currentLang] || I18N_DICT['zh-TW'];
    return `
        <div style="text-align: center; line-height: 1.5; position: relative;">
            
            <!-- 儀式感溫馨提醒卡片 -->
            <div style="background: rgba(217, 119, 6, 0.08); border: 1px dashed #D97706; border-radius: 0.6rem; padding: 0.55rem 0.85rem; margin-bottom: 0.75rem; text-align: left; font-size: 0.88rem; color: #B45309; font-weight: bold;">
                ${t.tossRitualNotice}
            </div>

            <!-- 頂部按鈕列（求籤類別 ✕ 超醒目「重新請示神明」金黃按鈕） -->
            <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.85rem;">
                <button type="button" class="cat-select-btn" onclick="selectCategory(this, '感情婚姻')" style="background: var(--primary-red); color: #FFF; border: 1px solid var(--primary-red); padding: 0.45rem 0.9rem; border-radius: 0.5rem; font-size: 0.92rem; font-weight: bold; cursor: pointer;">${t.catLove}</button>
                <button type="button" class="cat-select-btn" onclick="selectCategory(this, '事業求財')" style="background: var(--bg-main); color: var(--text-main); border: 1px solid var(--border-color); padding: 0.45rem 0.9rem; border-radius: 0.5rem; font-size: 0.92rem; font-weight: bold; cursor: pointer;">${t.catWork}</button>
                <button type="button" class="cat-select-btn" onclick="selectCategory(this, '健康家運')" style="background: var(--bg-main); color: var(--text-main); border: 1px solid var(--border-color); padding: 0.45rem 0.9rem; border-radius: 0.5rem; font-size: 0.92rem; font-weight: bold; cursor: pointer;">${t.catHealth}</button>
                <button type="button" class="cat-select-btn" onclick="selectCategory(this, '整體運勢')" style="background: var(--bg-main); color: var(--text-main); border: 1px solid var(--border-color); padding: 0.45rem 0.9rem; border-radius: 0.5rem; font-size: 0.92rem; font-weight: bold; cursor: pointer;">${t.catLuck}</button>
                
                <!-- 🌟 重新請示按鈕：琥珀金亮眼漸層 ✕ 高度吸引目光 -->
                <button type="button" onclick="resetDivinationUI()" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #FFF; border: none; padding: 0.45rem 1rem; border-radius: 0.5rem; font-size: 0.9rem; font-weight: 800; cursor: pointer; box-shadow: 0 3px 10px rgba(217, 119, 6, 0.3); transition: transform 0.2s;">${t.btnRetoss}</button>
            </div>

            <!-- 聖筊舞台區 -->
            <div id="bwa-stage-box" class="bwa-stage" style="padding: 0.3rem 0; gap: 2.2rem;">
                <div id="bwa-1">${SVG_YANG}</div>
                <div id="bwa-2">${SVG_YIN}</div>
            </div>

            <div id="bwa-msg" style="font-size: 1.05rem; font-weight: bold; margin-bottom: 0.5rem; color: var(--primary-red);">
                ${t.btnToss}
            </div>

            <button type="button" id="bwa-toss-btn" onclick="castBwa()" class="btn-highlight gold" style="width: 75%; margin: 0 auto; justify-content: center; font-size: 1.15rem; min-height: 46px;">
                ${t.btnToss}
            </button>

            <!-- 解籤結果區 (指定黃金順序直出) -->
            <div id="slip-result" style="display: none; margin-top: 0.75rem; text-align: left;">
            </div>

            <!-- 底部固定關閉按鈕 -->
            <div style="margin-top: 1rem;">
                <button type="button" onclick="closeCommonModal()" style="width: 100%; background: var(--primary-red); color: #FFF; border: none; padding: 0.65rem; border-radius: 0.6rem; font-weight: bold; cursor: pointer; font-size: 1rem; min-height: 44px;">
                    ${t.modalClose}
                </button>
            </div>
        </div>
    `;
}

function castBwa() {
    const bwa1 = document.getElementById('bwa-1');
    const bwa2 = document.getElementById('bwa-2');
    const msg = document.getElementById('bwa-msg');
    const resultBox = document.getElementById('slip-result');

    if (!bwa1 || !bwa2 || !msg) return;

    // 播放模擬聖筊打擊碰擊聲音效
    playBwaAudio('toss');

    bwa1.classList.add('bwa-tossing');
    bwa2.classList.add('bwa-tossing');
    msg.innerHTML = `✨ 誠心合十，正在為您請示【${selectedAskCategory}】好運...`;

    refreshAdsense();

    setTimeout(() => {
        bwa1.classList.remove('bwa-tossing');
        bwa2.classList.remove('bwa-tossing');

        const rand = Math.random();

        if (rand < 0.7) {
            playBwaAudio('win');
            
            // 收合上方舞台，釋放空間
            document.getElementById('bwa-stage-box').style.display = 'none';
            document.getElementById('bwa-toss-btn').style.display = 'none';
            msg.innerHTML = '<span style="color:#059669; font-size:1.25rem;">🎉 獲得【聖筊】！神明賜福大吉！</span>';

            setTimeout(() => {
                const slip = POEM_DATABASE[Math.floor(Math.random() * POEM_DATABASE.length)];
                const detailText = slip.details[selectedAskCategory];
                const meText = slip.details.me;

                resultBox.style.display = 'block';
                resultBox.innerHTML = `
                    <!-- 1. 籤詩標題 -->
                    <div style="margin-bottom:0.5rem; border-bottom: 2px solid var(--primary-red); padding-bottom: 0.35rem;">
                        <h4 style="color:var(--primary-red); font-size:1.15rem; font-weight:800; margin:0;">📜 ${slip.title}</h4>
                    </div>

                    <!-- 2. 【神明給你的靈感指引】金黃卡片 -->
                    <div class="highlight-insight-box" style="margin-bottom:0.75rem; padding:0.75rem 1rem;">
                        ${meText}
                    </div>

                    <!-- 3. 古文詩籤 -->
                    <div style="font-weight:bold; font-size:1.05rem; margin-bottom:0.75rem; line-height:1.6; color:var(--text-main); background:rgba(217, 119, 6, 0.08); padding:0.75rem 1rem; border-radius:0.5rem; border-left: 4px solid #D97706; text-align:center;">
                        ${slip.poem}
                    </div>
                    
                    <!-- 4. 詳細運勢拆解 (感情/事業/健康/整體) -->
                    <div style="font-size:0.95rem; color:var(--text-main); background:#FFF; padding:0.85rem 1rem; border-radius:0.5rem; border:1px solid var(--border-color); line-height:1.65; margin-bottom: 0.75rem;">
                        ${detailText}
                    </div>

                    <!-- 5. 經典典故 (放最後，乾淨純粹) -->
                    <div style="font-size:0.85rem; color:var(--text-sub); background:var(--bg-main); padding:0.6rem 0.85rem; border-radius:0.4rem; line-height:1.5; font-style:italic; margin-bottom:0.6rem;">
                        ${slip.story}
                    </div>

                    <div class="adsense-slot ads-in-modal" style="margin-top:0.4rem; min-height:75px;">
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                             data-ad-slot="0987654321"
                             data-ad-format="horizontal"></ins>
                    </div>
                `;
                refreshAdsense();
            }, 150);

        } else if (rand < 0.9) {
            bwa1.innerHTML = SVG_YANG;
            bwa2.innerHTML = SVG_YANG;
            msg.innerHTML = '<span style="color:#D97706; font-size:1.1rem;">😊 獲得【笑筊】！神明正溫柔微笑看著你～</span><br><span style="font-size:0.85rem; color:var(--text-sub);">神明覺得你其實心裡早有答案囉！整理好心情，誠心再擲一次看看～</span>';
            resultBox.style.display = 'none';
        } else {
            bwa1.innerHTML = SVG_YIN;
            bwa2.innerHTML = SVG_YIN;
            msg.innerHTML = '<span style="color:#2563EB; font-size:1.1rem;">🍵 獲得【穩重筊】！神明提醒你先喝口水放鬆～</span><br><span style="font-size:0.85rem; color:var(--text-sub);">先深呼吸三次放鬆心情，只要心存善念，好運隨後就到！</span>';
            resultBox.style.display = 'none';
        }
    }, 500);
}

function renderJieQiUI() {
    let jqName = '白露';
    if (typeof Solar !== 'undefined') {
        try {
            jqName = Solar.fromDate(new Date()).getLunar().getJieQi() || '白露';
        } catch (e) {}
    }

    return `
        <div style="text-align: left; line-height: 1.6; font-size:0.92rem;">
            <div style="background: var(--yi-bg); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--yi-border); margin-bottom: 0.75rem;">
                <h4 style="color: var(--yi-badge); font-size:1.05rem; margin-bottom: 0.2rem;">🌿 當前節氣：【${jqName}】</h4>
                <p style="color: var(--yi-text); font-size:0.88rem;">順應天時節氣養生，是調理體質的最佳時機。</p>
            </div>

            <h5 style="color: var(--primary-red); font-size: 0.98rem; margin-bottom: 0.3rem;">🥣 養生重點：</h5>
            <ul style="padding-left: 1.2rem; margin-bottom: 0.75rem; line-height: 1.6;">
                <li><strong>宜吃食材：</strong> 梨子、銀耳、百合、山藥、蓮子。</li>
                <li><strong>忌吃食材：</strong> 避免過量辛辣、冰冷或油炸食物。</li>
                <li><strong>生活起居：</strong> 早晚溫差大，注意保暖防受涼。</li>
            </ul>

            <div class="adsense-slot ads-in-modal">
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                     data-ad-slot="1122334455"
                     data-ad-format="auto"></ins>
            </div>
        </div>
    `;
}

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
        const t = I18N_DICT[currentLang];
        btn.innerText = isDark ? t.btnThemeLight : t.btnThemeDark;
    }
}

function toggleLargeFont() {
    document.body.classList.toggle('large-mode');
}

function speakTodayAlmanac() {
    if (!('speechSynthesis' in window)) {
        alert('您的瀏覽器不支援語音朗讀。');
        return;
    }
    const solarText = document.getElementById('display-solar-year-month')?.innerText || '';
    const dayText = document.getElementById('display-big-day')?.innerText || '';
    const lunarText = document.getElementById('display-lunar-date')?.innerText || '';
    const chongShaText = document.getElementById('display-chong-sha')?.innerText || '';

    const text = `${solarText} ${dayText}號，${lunarText}。${chongShaText}`;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = currentLang === 'en' ? 'en-US' : (currentLang === 'zh-CN' ? 'zh-CN' : 'zh-TW');
    window.speechSynthesis.speak(u);
}