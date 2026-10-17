// Petalwick policy pages in the reader's language.
// English lives at /petalwick/<page>/, translations at /petalwick/<page>/<code>/ (same codes as the game).
// On an English page, a browser set to a supported language is sent to that translation once, unless
// ?lang=en is in the address (the "English" choice in the menu). Every page gets a language menu.
(function () {
  var NAMES = {
    en: 'English', af: 'Afrikaans', am: 'አማርኛ', ar: 'العربية', az: 'Azərbaycanca', bn: 'বাংলা', bs: 'Bosanski',
    es: 'Español', fil: 'Filipino', fr: 'Français', gu: 'ગુજરાતી', he: 'עברית', hi: 'हिन्दी', hy: 'Հայերեն',
    id: 'Bahasa Indonesia', ja: '日本語', ka: 'ქართული', kk: 'Қазақ тілі', km: 'ខ្មែរ', kn: 'ಕನ್ನಡ', ko: '한국어',
    ky: 'Кыргызча', lo: 'ລາວ', mk: 'Македонски', ml: 'മലയാളം', mn: 'Монгол', mr: 'मराठी', ms: 'Bahasa Melayu',
    my: 'မြန်မာ', ne: 'नेपाली', nl: 'Nederlands', pa: 'ਪੰਜਾਬੀ', pt: 'Português', ro: 'Română', ru: 'Русский',
    rw: 'Kinyarwanda', si: 'සිංහල', so: 'Soomaali', sq: 'Shqip', sr: 'Српски', sw: 'Kiswahili', ta: 'தமிழ்',
    te: 'తెలుగు', tg: 'Тоҷикӣ', th: 'ไทย', ti: 'ትግርኛ', tk: 'Türkmençe', tr: 'Türkçe', ur: 'اردو', uz: 'Oʻzbekcha',
    vi: 'Tiếng Việt', 'zh-CN': '简体中文', 'zh-TW': '繁體中文', zu: 'isiZulu'
  };
  var ALIAS = { iw: 'he', 'in': 'id', tl: 'fil' };
  // The writing system each translation uses. A phone set to the same language in another script
  // (e.g. Punjabi in Arabic script, Serbian in Latin) is not sent to it: its next language, or English, is used.
  var SCRIPT = {};
  ('af:Latn am:Ethi ar:Arab az:Latn bn:Beng bs:Latn es:Latn fil:Latn fr:Latn gu:Gujr he:Hebr hi:Deva hy:Armn id:Latn ' +
   'ja:Jpan ka:Geor kk:Cyrl km:Khmr kn:Knda ko:Kore ky:Cyrl lo:Laoo mk:Cyrl ml:Mlym mn:Cyrl mr:Deva ms:Latn my:Mymr ' +
   'ne:Deva nl:Latn pa:Guru pt:Latn ro:Latn ru:Cyrl rw:Latn si:Sinh so:Latn sq:Latn sr:Cyrl sw:Latn ta:Taml te:Telu ' +
   'tg:Cyrl th:Thai ti:Ethi tk:Latn tr:Latn ur:Arab uz:Latn vi:Latn zu:Latn').split(' ').forEach(function (x) { x = x.split(':'); SCRIPT[x[0]] = x[1]; });
  function pick(tag) {
    if (!tag) return null;
    var parts = String(tag).replace(/_/g, '-').split('-'), base = parts[0].toLowerCase(), sc = null;
    for (var i = 1; i < parts.length; i++) if (/^[A-Za-z]{4}$/.test(parts[i])) sc = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
    if (base === 'zh') {
      if (sc) return sc === 'Hant' ? 'zh-TW' : sc === 'Hans' ? 'zh-CN' : null;
      return /-(TW|HK|MO)(-|$)/i.test(parts.join('-')) ? 'zh-TW' : 'zh-CN';
    }
    var code = ALIAS[base] || base;
    if (!NAMES[code] || code === 'en') return null;
    if (sc && sc !== SCRIPT[code]) return null;
    return code;
  }
  var m = location.pathname.match(/^(\/petalwick\/[^/]+\/)([^/]+\/)?/);
  if (!m) return;
  var root = m[1], cur = m[2] ? m[2].slice(0, -1) : 'en';
  if (cur === 'en' && !/[?&]lang=en\b/.test(location.search)) {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (var i = 0; i < list.length; i++) {
      if (/^en\b/i.test(list[i])) break;
      var p = pick(list[i]);
      if (p) { location.replace(root + p + '/' + location.hash); return; }
    }
  }
  function picker() {
    var main = document.querySelector('main'); if (!main) return;
    var wrap = document.createElement('p'); wrap.className = 'lang-picker';
    var sel = document.createElement('select'); sel.setAttribute('aria-label', 'Language');
    Object.keys(NAMES).forEach(function (c) {
      var o = document.createElement('option'); o.value = c; o.textContent = NAMES[c]; if (c === cur) o.selected = true; sel.appendChild(o);
    });
    sel.onchange = function () { location.href = sel.value === 'en' ? root + '?lang=en' : root + sel.value + '/'; };
    wrap.appendChild(document.createTextNode('🌐 ')); wrap.appendChild(sel);
    main.insertBefore(wrap, main.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', picker); else picker();
})();
