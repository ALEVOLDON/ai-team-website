/**
 * AI-Team Studio — Frontend Engine with Full Bilingual (EN/RU) & Mobile Support
 */

(function () {
  const DATA = window.STUDIO_SITE_DATA || {
    meta: { name: "AI-Team Studio", version: "0.13.0", author: "Vladimir Rybalsky" },
    metrics: { total_releases: 14, total_tests: 167, last_synced: "—" },
    devlog: [],
    releases: [],
    showcase: [],
  };

  // i18n Dictionary
  const I18N = {
    ru: {
      devlog_show_all: "Показать все 14 обзоров релиза ↓",
      devlog_show_less: "Свернуть до 3 свежих обзоров ↑",
      featured_badge: "🔥 СВЕЖИЙ РЕЛИЗ СТУДИИ",
      nav_demo: "Интерактивное демо",
      nav_devlog: "🎙️ Голосовые обзоры",
      nav_changelog: "📜 История версий",
      nav_showcase: "🎮 Проекты",
      nav_pricing: "💎 Доступ",
      nav_add_review: "🎙️ Добавить обзор",
      nav_get_pro: "Studio Pro",
      hero_eyebrow: "Актуальный релиз v0.13.0 • Автономная разработка на GPU и в облаке",
      hero_title_1: "Ваша персональная команда",
      hero_title_2: "ИИ-инженеров",
      hero_title_3: "в одном десктопном окне",
      hero_sub: "Вы ставите цель как Team Lead — 5 специализированных агентов проектируют архитектуру (DAG), создают дизайн, пишут чистый код, прогоняют реальные тесты в песочнице и коммитят результат в Git. С живой голосовой озвучкой и расходами от $0.00.",
      hero_listen_latest: "🔊 Слушать голосовой обзор свежей версии",
      hero_view_changelog: "📜 Смотреть историю всех 14 релизов",
      hero_run_sim: "⚡ Запустить симуляцию команды",
      metric_build: "Актуальная сборка",
      metric_releases: "Мажорных обновлений",
      metric_tests: "Системных тестов Pytest",
      metric_crew: "5 Агентов",
      metric_crew_sub: "Architect • Designer • Coder • QA • Lead",
      metric_cost_sub: "Средняя цена создания проекта",
      win_title: "⚡ AI-Team Desktop Studio (WebView2) — Кликните на агента или запустите демо",
      win_run_btn: "▶️ Запустить рабочий цикл",
      win_status_1: "🟢 Studio Ready • Пресет: Gemini Conductor (Hybrid Local GPU + Cloud)",
      win_status_2: "⚡ Скорость: 48.6 tok/s • Расход: $0.000 (Local / Free Tier) • Озвучка: Gemini 3.8 Flash TTS 🎙️",
      devlog_heading: "🎙️ Дневник разработки (Голосовые и текстовые обзоры)",
      devlog_sub: "Свежие сводки о том, как обстоят дела в студии: слушайте в формате аудио-дайджеста или читайте текстовый разбор",
      devlog_btn_new: "🎙️ Записать новый голосовой обзор",
      changelog_heading: "📜 История версий и эволюция студии",
      changelog_sub: "Автоматически синхронизируется с CHANGELOG.md и pyproject.toml при выходе каждого релиза",
      changelog_expand_all: "Развернуть все",
      changelog_collapse_all: "Свернуть все",
      changelog_all_tags: "Все релизы",
      changelog_search_ph: "🔍 Поиск по версиям и фичам...",
      showcase_heading: "🎮 Проекты, созданные студией на 100% автономно",
      showcase_sub: "Каждый проект спроектирован, написан и протестирован командой ИИ-агентов без единой строчки ручного кода",
      showcase_all: "Все стеки (7)",
      showcase_py: "🐍 Python (6)",
      showcase_node: "🟨 Node.js (1)",
      showcase_verif_label: "✅ Верификация:",
      pricing_heading: "💎 Доступ к AI-Team Studio & Модель BYOK",
      pricing_sub: "Никаких ежемесячных подписок по $20/мес. Платите один раз за студию и используйте свои локальные видеокарты или облачные ключи по себестоимости",
      pricing_tier1_title: "Public Showcase",
      pricing_tier1_desc: "Открытый дневник разработки, голосовые сводки и демонстрация возможностей студии.",
      pricing_tier1_price: "$0",
      pricing_tier1_unit: "/ открытый доступ",
      pricing_tier1_f1: "✅ Доступ ко всем голосовым и текстовым обзорам",
      pricing_tier1_f2: "✅ Полный Changelog и архитектурные разборы",
      pricing_tier1_f3: "✅ Примеры сгенерированных боевых проектов",
      pricing_tier1_f4: "✅ Уведомления о выходе новых версий",
      pricing_tier1_btn: "Читать дневник",
      pricing_tier2_badge: "🔥 EARLY BIRD ДОСТУП",
      pricing_tier2_title: "AI-Team Pro Studio",
      pricing_tier2_desc: "Полная десктопная студия под Windows с голосовым тимлидом, 5 агентами и песочницей.",
      pricing_tier2_price: "$19",
      pricing_tier2_unit: "разово (вместо $29)",
      pricing_tier2_f1: "✅ Нативное Desktop GUI приложение (WebView2)",
      pricing_tier2_f2: "✅ Все 5 агентов (Planner, Designer, Coder, QA, Reviewer)",
      pricing_tier2_f3: "✅ Голосовой чат Push-to-Talk (Gemini 3.8 Flash TTS)",
      pricing_tier2_f4: "✅ 100% приватная работа на локальном GPU (LM Studio / Ollama)",
      pricing_tier2_f5: "✅ Пресеты Gemini Conductor, NVIDIA Nemotron, DeepSeek",
      pricing_tier2_f6: "✅ Все обновления студии включены",
      pricing_tier2_btn: "🚀 Забронировать Early Bird ($19)",
      pricing_tier3_title: "Team / Agency Edition",
      pricing_tier3_desc: "Расширенная лицензия с кастомными ролями агентов и приоритетной поддержкой.",
      pricing_tier3_price: "$49",
      pricing_tier3_unit: "/ пожизненно",
      pricing_tier3_f1: "✅ Всё из тарифа Pro Studio",
      pricing_tier3_f2: "✅ Мульти-стек (Python, Node.js, Web + будущие Go/Rust)",
      pricing_tier3_f3: "✅ Настройка собственных системных промптов и ролей",
      pricing_tier3_f4: "✅ Приоритетная поддержка от создателя студии",
      pricing_tier3_btn: "Связаться с автором",
      modal_title: "🎙️ Студия записи обзора (Devlog Creator)",
      modal_desc: "Запишите голосовой комментарий с микрофона или напишите текстовый апдейт. Вы можете сразу послушать его и сохранить аудиофайл в папку website/audio/!",
      modal_lbl_title: "Заголовок обзора",
      modal_lbl_summary: "Текстовая сводка (или тезисы для озвучки)",
      modal_rec_ready: "Готов к записи с микрофона",
      modal_btn_start: "🔴 Начать запись голоса",
      modal_btn_stop: "⏹️ Остановить запись",
      modal_btn_dl: "💾 Скачать аудиофайл для папки website/audio/",
      modal_btn_cancel: "Отмена",
      modal_btn_publish: "✨ Добавить обзор на страницу",
      footer_copy: "⚡ AI-Team Studio — Autonomous Multi-Agent Development Studio • Создатель и правообладатель: Vladimir Rybalsky",
      footer_sync: "Сайт автоматически синхронизируется скриптом python sync_website.py из метаданных проекта без публикации закрытого исходного кода. Последняя синхронизация:",
      footer_status_label: "СИСТЕМНЫЙ СТАТУС: В СЕТИ",
      footer_tagline: "Автономная мультиагентная студия десктопной разработки на локальных LLM (Ollama, LM Studio). Декомпозиция задач, UI-дизайн, написание чистого кода, тесты в UTF-8 песочнице и безопасные Git-коммиты.",
      footer_author_badge: "Автор и архитектор: Владимир Рыбальский",
      footer_author_sub: "Team Lead & Инженер AI-Team Studio",
      footer_dual_repo: "🛡️ Dual-Repo изоляция: Исходный код ядра студии полностью защищен от публикации в открытый веб.",
      footer_col_product: "Продукт",
      footer_col_agents: "ИИ-агенты студии",
      footer_col_ecosystem: "Экосистема & Код",
      footer_nav_demo: "🕹️ Интерактивная песочница",
      footer_nav_devlog: "🎙️ Голосовой девлог релизов",
      footer_nav_changelog: "📜 Журнал всех 14 версий",
      footer_nav_showcase: "🎮 Готовые проекты студии",
      footer_nav_pricing: "💎 Early Bird Лицензии",
      footer_agent_planner: "🧠 Lead Architect (Planner)",
      footer_agent_designer: "🎨 UI/UX Designer",
      footer_agent_coder: "💻 Senior Implementation Coder",
      footer_agent_tester: "🧪 QA Sandbox Tester (Pytest)",
      footer_agent_reviewer: "🛡️ Tech Lead Code Reviewer",
      footer_eco_repo: "🌐 GitHub репозиторий витрины",
      footer_eco_readme: "📄 Публичная документация (README)",
      footer_eco_sync: "🔄 Скрипт синхронизации (sync_website.py)",
      footer_eco_author: "👤 Связаться с создателем (Rybalsky)",
      footer_eco_mit: "📜 Лицензия витрины: MIT Open Showcase",
      footer_back_to_top: "Наверх ↑",
      footer_copy_left: "© 2026 Vladimir Rybalsky. AI-Team Studio. Все права защищены.",
      footer_sync_prefix: "Сайт синхронизирован автоматически без раскрытия закрытых исходников. Обновлено: ",
      speech_lang: "ru-RU",
      author_name: "Vladimir Rybalsky",
    },
    en: {
      devlog_show_all: "Show all 14 release reviews ↓",
      devlog_show_less: "Collapse to 3 latest reviews ↑",
      featured_badge: "🔥 LATEST STUDIO RELEASE",
      nav_demo: "Interactive Demo",
      nav_devlog: "🎙️ Voice Devlog",
      nav_changelog: "📜 Changelog",
      nav_showcase: "🎮 Projects",
      nav_pricing: "💎 Pricing",
      nav_add_review: "🎙️ Add Review",
      nav_get_pro: "Studio Pro",
      hero_eyebrow: "Latest Release v0.13.0 • Autonomous Engineering on GPU & Cloud",
      hero_title_1: "Your Personal Autonomous",
      hero_title_2: "AI Engineering Crew",
      hero_title_3: "in a Single Desktop Window",
      hero_sub: "You set the goal as Team Lead — 5 specialized AI agents design the architecture (DAG), craft UI tokens, write clean idiomatic code, run real sandboxed tests, and commit to Git. Featuring real-time voice dialogue and costs from $0.00.",
      hero_listen_latest: "🔊 Listen to Latest Release Voice Note",
      hero_view_changelog: "📜 Explore All 14 Release Notes",
      hero_run_sim: "⚡ Run Crew Simulation",
      metric_build: "Current Build",
      metric_releases: "Major Releases",
      metric_tests: "Pytest Suite Tests",
      metric_crew: "5 Agents",
      metric_crew_sub: "Architect • Designer • Coder • QA • Lead",
      metric_cost_sub: "Average Cost per Project",
      win_title: "⚡ AI-Team Desktop Studio (WebView2) — Click any agent or start demo loop",
      win_run_btn: "▶️ Run Workflow Loop",
      win_status_1: "🟢 Studio Ready • Preset: Gemini Conductor (Hybrid Local GPU + Cloud)",
      win_status_2: "⚡ Speed: 48.6 tok/s • Cost: $0.000 (Local / Free Tier) • Voice: Gemini 3.8 Flash TTS 🎙️",
      devlog_heading: "🎙️ Development Log (Voice & Text Reviews)",
      devlog_sub: "Fresh engineering updates on how the studio is evolving: listen to audio digests or read in-depth breakdowns",
      devlog_btn_new: "🎙️ Record New Voice Review",
      changelog_heading: "📜 Studio Evolution & Release Changelog",
      changelog_sub: "Synchronized automatically with CHANGELOG.md and pyproject.toml upon each release",
      changelog_expand_all: "Expand All",
      changelog_collapse_all: "Collapse All",
      changelog_all_tags: "All Releases",
      changelog_search_ph: "🔍 Search releases, modules, features...",
      showcase_heading: "🎮 Projects Built 100% Autonomously by AI-Team",
      showcase_sub: "Every application was architected, coded, and verified by the autonomous crew with zero manual human coding",
      showcase_all: "All Stacks (7)",
      showcase_py: "🐍 Python (6)",
      showcase_node: "🟨 Node.js (1)",
      showcase_verif_label: "✅ Verification:",
      pricing_heading: "💎 Access AI-Team Studio & BYOK Economics",
      pricing_sub: "Zero $20/month subscription traps. Pay once for perpetual studio access, run locally on your GPU or plug in cheap cloud LPUs at cost",
      pricing_tier1_title: "Public Showcase",
      pricing_tier1_desc: "Open development journal, spoken summaries, and technical showcase.",
      pricing_tier1_price: "$0",
      pricing_tier1_unit: "/ open access",
      pricing_tier1_f1: "✅ Complete voice & text devlog articles",
      pricing_tier1_f2: "✅ Full technical changelog across all releases",
      pricing_tier1_f3: "✅ Real autonomous battle-tested projects",
      pricing_tier1_f4: "✅ Release notifications",
      pricing_tier1_btn: "Read Devlog",
      pricing_tier2_badge: "🔥 EARLY BIRD ACCESS",
      pricing_tier2_title: "AI-Team Pro Studio",
      pricing_tier2_desc: "Full Windows desktop suite with voice lead architect, 5 agents, and strict sandbox.",
      pricing_tier2_price: "$19",
      pricing_tier2_unit: "one-time (reg. $29)",
      pricing_tier2_f1: "✅ Native Desktop GUI suite (Edge WebView2)",
      pricing_tier2_f2: "✅ All 5 agents (Planner, Designer, Coder, QA, Reviewer)",
      pricing_tier2_f3: "✅ Push-to-Talk voice dialogue (Gemini 3.8 Flash TTS)",
      pricing_tier2_f4: "✅ 100% private offline GPU execution (LM Studio / Ollama)",
      pricing_tier2_f5: "✅ Gemini Conductor, NVIDIA Nemotron, DeepSeek presets",
      pricing_tier2_f6: "✅ All future studio releases included",
      pricing_tier2_btn: "🚀 Claim Early Bird ($19)",
      pricing_tier3_title: "Team / Agency Edition",
      pricing_tier3_desc: "Extended commercial license with custom agent roles and priority support.",
      pricing_tier3_price: "$49",
      pricing_tier3_unit: "/ lifetime",
      pricing_tier3_f1: "✅ Everything included in Pro Studio",
      pricing_tier3_f2: "✅ Multi-stack (Python, Node.js, Web + upcoming Go/Rust)",
      pricing_tier3_f3: "✅ Custom role prompts & specialized agents",
      pricing_tier3_f4: "✅ Direct priority support from founder",
      pricing_tier3_btn: "Contact Author",
      modal_title: "🎙️ Devlog Voice Studio (Audio Note Creator)",
      modal_desc: "Record a voice memo through your microphone or enter text highlights. Preview live and download to website/audio/!",
      modal_lbl_title: "Review Title",
      modal_lbl_summary: "Text Summary (or Spoken Script)",
      modal_rec_ready: "Microphone ready to capture voice",
      modal_btn_start: "🔴 Start Recording Voice",
      modal_btn_stop: "⏹️ Stop Recording",
      modal_btn_dl: "💾 Download Audio for website/audio/",
      modal_btn_cancel: "Cancel",
      modal_btn_publish: "✨ Publish Review to Page",
      footer_copy: "⚡ AI-Team Studio — Autonomous Multi-Agent Development Studio • Author & Copyright: Vladimir Rybalsky",
      footer_sync: "Website auto-synchronized by python sync_website.py from studio metadata with zero source code exposure. Last synced:",
      footer_status_label: "SYSTEM STATUS: OPERATIONAL",
      footer_tagline: "Autonomous multi-agent desktop software studio powered by local LLMs (Ollama, LM Studio). Task decomposition, UI design, clean code generation, sandbox tests, and secure Git commits.",
      footer_author_badge: "Founder & Lead Architect: Vladimir Rybalsky",
      footer_author_sub: "Team Lead & AI-Team Studio Engineer",
      footer_dual_repo: "🛡️ Dual-Repo Isolation: Core studio source code is strictly protected with zero cloud exposure.",
      footer_col_product: "Product",
      footer_col_agents: "Studio AI Agents",
      footer_col_ecosystem: "Ecosystem & Code",
      footer_nav_demo: "🕹️ Interactive Simulator",
      footer_nav_devlog: "🎙️ Voice Release Devlog",
      footer_nav_changelog: "📜 Changelog of All 14 Releases",
      footer_nav_showcase: "🎮 Built Project Showcase",
      footer_nav_pricing: "💎 Early Bird Commercial License",
      footer_agent_planner: "🧠 Lead Architect (Planner)",
      footer_agent_designer: "🎨 UI/UX Designer",
      footer_agent_coder: "💻 Senior Implementation Coder",
      footer_agent_tester: "🧪 QA Sandbox Tester (Pytest)",
      footer_agent_reviewer: "🛡️ Tech Lead Code Reviewer",
      footer_eco_repo: "🌐 GitHub Showcase Repository",
      footer_eco_readme: "📄 Public Documentation (README)",
      footer_eco_sync: "🔄 Auto-Sync Engine (sync_website.py)",
      footer_eco_author: "👤 Contact Founder (Vladimir Rybalsky)",
      footer_eco_mit: "📜 Showcase License: MIT Open",
      footer_back_to_top: "Back to top ↑",
      footer_copy_left: "© 2026 Vladimir Rybalsky. AI-Team Studio. All rights reserved.",
      footer_sync_prefix: "Synchronized autonomously without private source exposure. Updated: ",
      speech_lang: "en-US",
      author_name: "Vladimir Rybalsky",
    },
  };

  let currentLang = localStorage.getItem("ai_team_lang") || "ru";
  let activeAudioElement = null;
  let activePlayerId = null;
  let playbackSpeed = 1.0;
  let currentChangelogTag = "ALL";
  let currentProjectFilter = "all";
  let demoTimer = null;
  let devlogExpanded = false;

  // Recording
  let mediaRecorder = null;
  let recordedChunks = [];
  let recordedBlobUrl = null;

  function t(key) {
    return I18N[currentLang]?.[key] || I18N["ru"]?.[key] || "";
  }

  function setLanguage(lang) {
    stopAllAudio();
    currentLang = lang;
    localStorage.setItem("ai_team_lang", lang);
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    applyStaticTranslations();
    renderDevlog();
    renderChangelog();
    renderShowcase();
  }

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = t(key);
      if (text) el.textContent = text;
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      const text = t(key);
      if (text) el.setAttribute("placeholder", text);
    });
  }

  function initSite() {
    const ver = DATA.meta?.version || "0.13.0";
    setText("nav-version", `v${ver}`);
    setText("metric-version", `v${ver}`);
    setText("metric-releases", String(DATA.metrics?.total_releases || DATA.releases?.length || 14));
    setText("metric-tests", `${DATA.metrics?.total_tests || 167}+`);
    setText("footer-sync-time", DATA.metrics?.last_synced || "now");

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(btn.getAttribute("data-lang"));
      });
    });

    const hamburger = document.getElementById("mobile-hamburger");
    const drawer = document.getElementById("mobile-drawer");
    if (hamburger && drawer) {
      hamburger.addEventListener("click", () => {
        drawer.classList.toggle("open");
      });
      drawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => drawer.classList.remove("open"));
      });
    }

    setLanguage(currentLang);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function formatMarkdownInline(text) {
    let s = escapeHtml(text);
    s = s.replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/g, "<b>$1</b>");
    s = s.replace(/&lt;code&gt;(.*?)&lt;\/code&gt;/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    return s;
  }

  /* ========================================================================
     1. Devlog Rendering (Featured Card + Grid + Expand)
     ======================================================================== */
  window.toggleDevlogExpand = function () {
    devlogExpanded = !devlogExpanded;
    renderDevlog();
  };

  function renderDevlog() {
    const container = document.getElementById("devlog-container");
    if (!container) return;

    const savedCustomPosts = JSON.parse(localStorage.getItem("ai_team_custom_devlog") || "[]");
    const posts = [...savedCustomPosts, ...(DATA.devlog || [])];

    if (!posts.length) {
      container.innerHTML = `<p style="color:var(--text-secondary);">${currentLang === "ru" ? "Пока нет опубликованных обзоров." : "No published devlog reviews yet."}</p>`;
      return;
    }

    const featured = posts[0];
    const restPosts = posts.slice(1);
    const visibleRest = devlogExpanded ? restPosts : restPosts.slice(0, 3);

    // 1. Рендерим главный Featured-блок свежего релиза
    const featPlayerId = "player-feat-0";
    const featBars = Array.from({ length: 32 })
      .map((_, i) => `<span class="wave-bar" style="height:${30 + ((i * 19) % 65)}%"></span>`)
      .join("");
    const featTitle = currentLang === "en" && featured.title_en ? featured.title_en : featured.title;
    const featSummary = currentLang === "en" && featured.summary_en ? featured.summary_en : featured.summary;
    const featHighlights = currentLang === "en" && featured.highlights_en ? featured.highlights_en : (featured.highlights || []);
    const featScript = currentLang === "en" && featured.voice_script_en ? featured.voice_script_en : (featured.voice_script || featSummary);

    const featHighlightsHtml = featHighlights.length
      ? `<ul class="devlog-highlights" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.5rem; margin-top:0.5rem;">
          ${featHighlights.map((h) => `<li>${formatMarkdownInline(h)}</li>`).join("")}
         </ul>`
      : "";

    const featAudio = currentLang === "en" && (featured.audio_url_en || featured.audio_file_en)
      ? (featured.audio_url_en || featured.audio_file_en)
      : (featured.audio_url || featured.audio_file);

    const featHtml = `
      <div class="featured-devlog-hero">
        <div class="featured-top-row">
          <span class="featured-badge">${t("featured_badge")}</span>
          <span class="devlog-date">${escapeHtml(featured.date)} • v${escapeHtml(featured.version || DATA.meta.version)}</span>
        </div>
        <h3 class="featured-title">${escapeHtml(featTitle)}</h3>
        <div class="voice-player" id="${featPlayerId}">
          <button class="play-btn" title="Listen"
            onclick="toggleVoicePlayer('${featPlayerId}', '${featAudio ? encodeURIComponent(featAudio) : ""}', '${encodeURIComponent(featScript)}')">
            <span class="play-icon" id="icon-${featPlayerId}">▶</span>
          </button>
          <div class="voice-waveform">
            <div class="wave-bars">${featBars}</div>
            <div class="voice-meta-row">
              <span id="status-${featPlayerId}">🎵 ${currentLang === "ru" ? "Голосовой обзор релиза" : "Spoken Release Digest"}</span>
              <span>${currentLang === "ru" ? "Автор:" : "By:"} Vladimir Rybalsky</span>
            </div>
          </div>
          <button class="speed-btn" onclick="cyclePlaybackSpeed(this)">${playbackSpeed}x</button>
        </div>
        <p class="devlog-summary" style="font-size:0.95rem;">${formatMarkdownInline(featSummary)}</p>
        ${featHighlightsHtml}
      </div>
    `;

    // 2. Рендерим остальные карточки в красивой сетке
    const gridHtml = visibleRest
      .map((post, idx) => {
        const playerId = `player-devlog-${idx + 1}`;
        const barsHtml = Array.from({ length: 22 })
          .map((_, i) => `<span class="wave-bar" style="height:${25 + ((i * 17 + idx * 11) % 65)}%"></span>`)
          .join("");

        const title = currentLang === "en" && post.title_en ? post.title_en : post.title;
        const summary = currentLang === "en" && post.summary_en ? post.summary_en : post.summary;
        const badge = currentLang === "en" && post.badge_en ? post.badge_en : (post.badge || "🎙️ Devlog");
        const script = currentLang === "en" && post.voice_script_en ? post.voice_script_en : (post.voice_script || summary);

        const postAudio = currentLang === "en" && (post.audio_url_en || post.audio_file_en)
          ? (post.audio_url_en || post.audio_file_en)
          : (post.audio_url || post.audio_file);

        return `
        <article class="devlog-card">
          <div>
            <div class="devlog-top">
              <span class="devlog-badge">${escapeHtml(badge)}</span>
              <span class="devlog-date">${escapeHtml(post.date)} • v${escapeHtml(post.version || DATA.meta.version)}</span>
            </div>
            <h3 class="devlog-title" style="margin-top:0.6rem;">${escapeHtml(title)}</h3>
          </div>

          <div class="voice-player" id="${playerId}">
            <button class="play-btn" title="Listen"
              onclick="toggleVoicePlayer('${playerId}', '${postAudio ? encodeURIComponent(postAudio) : ""}', '${encodeURIComponent(script)}')">
              <span class="play-icon" id="icon-${playerId}">▶</span>
            </button>
            <div class="voice-waveform">
              <div class="wave-bars">${barsHtml}</div>
              <div class="voice-meta-row">
                <span id="status-${playerId}">🎙️ Voice Digest</span>
                <span>${currentLang === "ru" ? "Автор:" : "By:"} ${escapeHtml(post.author || "Vladimir Rybalsky")}</span>
              </div>
            </div>
            <button class="speed-btn" onclick="cyclePlaybackSpeed(this)">${playbackSpeed}x</button>
          </div>

          <p class="devlog-summary">${formatMarkdownInline(summary)}</p>
        </article>`;
      })
      .join("");

    // Кнопка показать больше / свернуть
    const moreBtnHtml = restPosts.length > 3
      ? `<div class="devlog-more-wrapper">
          <button class="btn btn-secondary" onclick="toggleDevlogExpand()">
            ${devlogExpanded ? t("devlog_show_less") : t("devlog_show_all")}
          </button>
         </div>`
      : "";

    container.innerHTML = featHtml + `<div class="devlog-grid">${gridHtml}</div>` + moreBtnHtml;
  }

  /* ========================================================================
     2. Voice Player & SpeechSynthesis
     ======================================================================== */
  window.toggleVoicePlayer = function (playerId, encodedAudioUrl, encodedScript) {
    const audioUrl = encodedAudioUrl ? decodeURIComponent(encodedAudioUrl) : "";
    const scriptText = encodedScript ? decodeURIComponent(encodedScript) : "";

    if (activePlayerId === playerId) {
      stopAllAudio();
      return;
    }

    stopAllAudio();
    activePlayerId = playerId;

    const playerEl = document.getElementById(playerId);
    const iconEl = document.getElementById(`icon-${playerId}`);
    const statusEl = document.getElementById(`status-${playerId}`);

    if (playerEl) playerEl.classList.add("playing");
    if (iconEl) iconEl.textContent = "⏸";
    if (statusEl) statusEl.textContent = currentLang === "ru" ? "🔊 Воспроизведение..." : "🔊 Playing voice review...";

    if (audioUrl) {
      activeAudioElement = new Audio(audioUrl);
      activeAudioElement.playbackRate = playbackSpeed;
      activeAudioElement.onended = () => stopAllAudio();
      activeAudioElement.onerror = () => speakWithBrowserTTS(scriptText);
      activeAudioElement.play().catch(() => speakWithBrowserTTS(scriptText));
      return;
    }

    speakWithBrowserTTS(scriptText);
  };

  function speakWithBrowserTTS(text) {
    if (!("speechSynthesis" in window)) {
      alert("TTS not supported by browser. Drop .mp3/.wav in website/audio/.");
      stopAllAudio();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === "ru" ? "ru-RU" : "en-US";
    utterance.rate = playbackSpeed;

    const voices = window.speechSynthesis.getVoices();
    const prefVoice =
      voices.find((v) => v.lang.startsWith(currentLang) && (v.name.includes("Google") || v.name.includes("Natural"))) ||
      voices.find((v) => v.lang.startsWith(currentLang));
    if (prefVoice) utterance.voice = prefVoice;

    utterance.onend = () => stopAllAudio();
    utterance.onerror = () => stopAllAudio();
    window.speechSynthesis.speak(utterance);
  }

  function stopAllAudio() {
    if (activeAudioElement) {
      activeAudioElement.pause();
      activeAudioElement = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (activePlayerId) {
      const prevEl = document.getElementById(activePlayerId);
      const prevIcon = document.getElementById(`icon-${activePlayerId}`);
      const prevStatus = document.getElementById(`status-${activePlayerId}`);
      if (prevEl) prevEl.classList.remove("playing");
      if (prevIcon) prevIcon.textContent = "▶";
      if (prevStatus) prevStatus.textContent = currentLang === "ru" ? "🎙️ Нажмите ▶ для прослушивания" : "🎙️ Click ▶ to listen";
      activePlayerId = null;
    }
  }

  window.cyclePlaybackSpeed = function (btnEl) {
    const speeds = [1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    playbackSpeed = speeds[nextIdx];
    document.querySelectorAll(".speed-btn").forEach((b) => (b.textContent = `${playbackSpeed}x`));
    if (activeAudioElement) {
      activeAudioElement.playbackRate = playbackSpeed;
    }
  };

  window.playLatestReleaseVoice = function () {
    const devlogSection = document.getElementById("devlog");
    if (devlogSection) devlogSection.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const firstPlayBtn = document.querySelector("#devlog-container .play-btn");
      if (firstPlayBtn) firstPlayBtn.click();
    }, 350);
  };

  /* ========================================================================
     3. Changelog Rendering (Bilingual)
     ======================================================================== */
  window.filterChangelog = function (tag, btnEl) {
    currentChangelogTag = tag;
    document.querySelectorAll("#changelog-tags .filter-chip").forEach((c) => c.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    renderChangelog();
  };

  window.renderChangelog = function () {
    const container = document.getElementById("changelog-timeline");
    if (!container) return;

    const query = (document.getElementById("changelog-search")?.value || "").trim().toLowerCase();
    const releases = (DATA.releases || []).filter((rel) => {
      if (currentChangelogTag !== "ALL" && !(rel.tags || []).includes(currentChangelogTag)) {
        return false;
      }
      if (!query) return true;
      const haystack = `${rel.version} ${rel.subtitle} ${JSON.stringify(rel.sections)}`.toLowerCase();
      return haystack.includes(query);
    });

    if (!releases.length) {
      container.innerHTML = `<p style="color:var(--text-secondary);">${currentLang === "ru" ? "Релизов не найдено." : "No releases found."}</p>`;
      return;
    }

    container.innerHTML = releases
      .map((rel, idx) => {
        const isCollapsed = idx > 2 && !query;
        const voiceText = currentLang === "en" && rel.voice_summary_en ? rel.voice_summary_en : (rel.voice_summary || rel.subtitle);
        const encodedVoice = encodeURIComponent(voiceText);
        const playerId = `rel-voice-${rel.version.replace(/\./g, "_")}`;

        const tagsHtml = (rel.tags || [])
          .map((t) => `<span class="devlog-badge" style="font-size:0.7rem; padding:0.15rem 0.55rem;">${escapeHtml(t)}</span>`)
          .join("");

        // Выбираем секции на текущем языке
        const sections = currentLang === "en" && rel.sections_en ? rel.sections_en : (rel.sections || []);
        const sectionsHtml = sections
          .map(
            (sec) => `
            <div class="rel-sec-box">
              <h4>${escapeHtml(sec.title)}</h4>
              <ul>
                ${(sec.items || []).map((item) => `<li>${formatMarkdownInline(item)}</li>`).join("")}
              </ul>
            </div>`
          )
          .join("");

        return `
        <div class="release-card ${rel.is_latest ? "latest" : ""} ${isCollapsed ? "collapsed" : ""}" id="rel-card-${idx}">
          <div class="release-header" onclick="toggleReleaseCard(${idx})">
            <div class="release-title-row">
              <span class="release-ver">v${escapeHtml(rel.version)}</span>
              <span class="devlog-date">${escapeHtml(rel.date)}</span>
              <span class="release-sub">${escapeHtml(rel.subtitle)}</span>
              ${rel.is_latest ? `<span class="devlog-badge" style="background:rgba(16,185,129,0.18); color:#34d399; border-color:rgba(16,185,129,0.4);">LATEST</span>` : ""}
            </div>
            <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;" onclick="event.stopPropagation()">
              const relAudio = currentLang === "en" && (rel.audio_file_en || rel.audio_url_en)
                ? (rel.audio_file_en || rel.audio_url_en)
                : (rel.audio_file || rel.audio_url);

              return `
              ${tagsHtml}
              <button class="btn btn-secondary btn-sm" id="${playerId}"
                onclick="toggleVoicePlayer('${playerId}', '${relAudio ? encodeURIComponent(relAudio) : ""}', '${encodedVoice}')">
                <span id="icon-${playerId}">🔊</span> ${currentLang === "ru" ? "Слушать" : "Listen"}
              </button>
              <button class="btn btn-secondary btn-sm" onclick="toggleReleaseCard(${idx})">↕️</button>
            </div>
          </div>
          <div class="release-sections">
            ${sectionsHtml}
          </div>
        </div>`;
      })
      .join("");
  };

  window.toggleReleaseCard = function (idx) {
    const card = document.getElementById(`rel-card-${idx}`);
    if (card) card.classList.toggle("collapsed");
  };

  window.toggleAllReleases = function (collapse) {
    document.querySelectorAll(".release-card").forEach((c) => {
      if (collapse) c.classList.add("collapsed");
      else c.classList.remove("collapsed");
    });
  };

  /* ========================================================================
     4. Projects Showcase
     ======================================================================== */
  window.filterProjects = function (stackType, btnEl) {
    currentProjectFilter = stackType;
    btnEl?.parentElement?.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    renderShowcase();
  };

  function renderShowcase() {
    const container = document.getElementById("showcase-container");
    if (!container) return;

    const list = (DATA.showcase || []).filter((p) => {
      if (currentProjectFilter === "all") return true;
      return p.stack_type === currentProjectFilter;
    });

    container.innerHTML = list
      .map(
        (p) => `
      <div class="project-card">
        <div>
          <div class="project-top">
            <span class="stack-badge">${escapeHtml(p.stack)}</span>
            <span class="cost-badge">${escapeHtml(p.cost)}</span>
          </div>
          <h3 style="margin: 0.75rem 0 0.35rem; font-size:1.1rem;">#${p.id}. ${escapeHtml(p.name)}</h3>
          <p style="color:var(--text-secondary); font-size:0.86rem;">${formatMarkdownInline(p.overview)}</p>
        </div>
        <div>
          <div style="font-size:0.76rem; color:#94a3b8; margin-bottom:0.45rem;">
            ${t("showcase_verif_label")} <b style="color:#e2e8f0;">${escapeHtml(p.verification)}</b>
          </div>
          <div class="project-cmd">
            <span>$ ${escapeHtml(p.command)}</span>
            <span style="font-size:0.68rem; color:var(--text-muted);">100% Auto</span>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  /* ========================================================================
     5. Studio Simulation
     ======================================================================== */
  const AGENT_STEPS = {
    ru: [
      { role: "planner", tag: "[PLANNER]", msg: "Декомпозиция цели в граф задач (DAG: 4 атомарных узла)...", verdict: "STAGE 1/5: PLANNING DAG" },
      { role: "designer", tag: "[DESIGNER]", msg: "Генерация UI дизайн-токенов, палитры и чистых векторных SVG...", verdict: "STAGE 2/5: UI/UX DESIGN" },
      { role: "coder", tag: "[CODER]", msg: "Запись рабочего кода через edit_protocol в изолированную песочницу...", verdict: "STAGE 3/5: IMPLEMENTATION" },
      { role: "tester", tag: "[TESTER]", msg: "Запуск pytest в нативном UTF-8 Sandbox: 24/24 passed (100% Green)!", verdict: "STAGE 4/5: QA VERIFICATION" },
      { role: "reviewer", tag: "[REVIEWER]", msg: "5D Scorecard: 9.6/10 (APPROVE) ➔ Scoped Git Commit выполнен!", verdict: "VERDICT: APPROVE (9.6 / 10)" },
    ],
    en: [
      { role: "planner", tag: "[PLANNER]", msg: "Decomposing goal into atomic Directed Acyclic Graph (DAG: 4 nodes)...", verdict: "STAGE 1/5: PLANNING DAG" },
      { role: "designer", tag: "[DESIGNER]", msg: "Generating UI tokens, aesthetics and Anti-Slop vector SVG icons...", verdict: "STAGE 2/5: UI/UX DESIGN" },
      { role: "coder", tag: "[CODER]", msg: "Writing idiomatic code through atomic edit_protocol in isolated sandbox...", verdict: "STAGE 3/5: IMPLEMENTATION" },
      { role: "tester", tag: "[TESTER]", msg: "Running pytest in UTF-8 sandbox: 24/24 passed (100% Green) + Launch OK!", verdict: "STAGE 4/5: QA VERIFICATION" },
      { role: "reviewer", tag: "[REVIEWER]", msg: "5D Scorecard: 9.6/10 (APPROVE) ➔ Scoped Git Commit staged!", verdict: "VERDICT: APPROVE (9.6 / 10)" },
    ],
  };

  window.selectDemoAgent = function (role) {
    const roles = ["planner", "designer", "coder", "tester", "reviewer"];
    roles.forEach((r) => {
      const card = document.getElementById(`demo-agent-${r}`);
      const pill = document.getElementById(`state-${r}`);
      if (r === role) {
        card?.classList.add("active");
        if (pill) pill.textContent = "ACTIVE";
      } else {
        card?.classList.remove("active");
        if (pill) pill.textContent = "IDLE";
      }
    });

    const steps = AGENT_STEPS[currentLang] || AGENT_STEPS.ru;
    const stepInfo = steps.find((s) => s.role === role);
    if (stepInfo) {
      appendDemoLog(stepInfo.role, stepInfo.tag, stepInfo.msg);
      setText("demo-verdict", stepInfo.verdict);
    }
  };

  function appendDemoLog(role, tag, msg) {
    const logBox = document.getElementById("demo-logs");
    if (!logBox) return;
    const now = new Date().toTimeString().slice(0, 8);
    const line = document.createElement("div");
    line.className = "log-line";
    line.innerHTML = `<span class="log-time">[${now}]</span><span class="log-tag ${role}">${tag}</span><span>${escapeHtml(msg)}</span>`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  }

  window.runDemoSimulation = function () {
    if (demoTimer) {
      clearInterval(demoTimer);
      demoTimer = null;
    }
    const logBox = document.getElementById("demo-logs");
    if (logBox) logBox.innerHTML = "";

    const steps = AGENT_STEPS[currentLang] || AGENT_STEPS.ru;
    let stepIndex = 0;
    selectDemoAgent(steps[0].role);

    demoTimer = setInterval(() => {
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(demoTimer);
        demoTimer = null;
        return;
      }
      selectDemoAgent(steps[stepIndex].role);
    }, 1100);
  };

  /* ========================================================================
     6. Voice Recorder Modal
     ======================================================================== */
  window.openRecorderModal = function () {
    document.getElementById("recorder-modal")?.classList.add("open");
  };

  window.closeRecorderModal = function () {
    document.getElementById("recorder-modal")?.classList.remove("open");
  };

  window.startBrowserRecording = async function () {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "audio/webm" });
        recordedBlobUrl = URL.createObjectURL(blob);

        const preview = document.getElementById("recorded-audio-preview");
        if (preview) {
          preview.src = recordedBlobUrl;
          preview.style.display = "block";
        }

        const dlLink = document.getElementById("download-audio-link");
        if (dlLink) {
          const dateSlug = new Date().toISOString().slice(0, 10);
          dlLink.href = recordedBlobUrl;
          dlLink.download = `blog-${dateSlug}.webm`;
          dlLink.style.display = "inline-flex";
        }

        setText("rec-status", currentLang === "ru" ? "✅ Запись готова!" : "✅ Voice recorded!");
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setText("rec-status", currentLang === "ru" ? "🔴 Идёт запись с микрофона..." : "🔴 Recording microphone audio...");
      document.getElementById("btn-start-rec").style.display = "none";
      document.getElementById("btn-stop-rec").style.display = "inline-flex";
    } catch (err) {
      setText("rec-status", "⚠️ Mic error: " + err.message);
    }
  };

  window.stopBrowserRecording = function () {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    document.getElementById("btn-start-rec").style.display = "inline-flex";
    document.getElementById("btn-stop-rec").style.display = "none";
  };

  window.publishLocalPost = function () {
    const title = document.getElementById("post-title")?.value.trim() || (currentLang === "ru" ? "Свежий обзор студии" : "Fresh Studio Review");
    const summary = document.getElementById("post-summary")?.value.trim() || "Devlog update...";

    const newPost = {
      id: "local-" + Date.now(),
      version: DATA.meta?.version || "0.13.0",
      date: new Date().toISOString().slice(0, 10),
      title: title,
      title_en: title,
      author: DATA.meta?.author || "Vladimir Rybalsky",
      badge: currentLang === "ru" ? "🎙️ Авторский обзор" : "🎙️ Voice Update",
      badge_en: "🎙️ Voice Update",
      audio_url: recordedBlobUrl || null,
      duration: recordedBlobUrl ? "Audio Memo" : "AI Voice",
      voice_script: summary,
      voice_script_en: summary,
      summary: summary,
      summary_en: summary,
      highlights: [],
    };

    const saved = JSON.parse(localStorage.getItem("ai_team_custom_devlog") || "[]");
    saved.unshift(newPost);
    localStorage.setItem("ai_team_custom_devlog", JSON.stringify(saved));

    renderDevlog();
    closeRecorderModal();
  };

  document.addEventListener("DOMContentLoaded", initSite);
})();
