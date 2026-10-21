/**
 * AI-Team Studio — Official Showcase & Devlog Frontend Engine
 * Поддерживает:
 *  - Автоматический рендеринг данных из data/site_data.js
 *  - Кастомный аудиоплеер (реальные аудиофайлы + браузерный голосовой синтезатор SpeechSynthesis)
 *  - Интерактивную симуляцию работы 5 агентов студии
 *  - Запись голосовых обзоров прямо с микрофона через MediaRecorder API
 */

(function () {
  const DATA = window.STUDIO_SITE_DATA || {
    meta: { name: "AI-Team Studio", version: "0.13.0", author: "Vladimir Rybalsky" },
    metrics: { total_releases: 14, total_tests: 167, last_synced: "—" },
    devlog: [],
    releases: [],
    showcase: [],
  };

  let activeAudioElement = null;
  let activePlayerId = null;
  let playbackSpeed = 1.0;
  let currentChangelogTag = "ALL";
  let currentProjectFilter = "all";
  let demoTimer = null;

  // Запись с микрофона
  let mediaRecorder = null;
  let recordedChunks = [];
  let recordedBlobUrl = null;

  function initSite() {
    // 1. Обновляем шапку и метрики из pyproject.toml и репозитория
    const ver = DATA.meta?.version || "0.13.0";
    const latestRel = DATA.releases?.[0];
    setText("nav-version", `v${ver}`);
    setText("metric-version", `v${ver}`);
    setText("metric-releases", String(DATA.metrics?.total_releases || DATA.releases?.length || 14));
    setText("metric-tests", `${DATA.metrics?.total_tests || 167}+`);
    setText("footer-sync-time", DATA.metrics?.last_synced || "только что");

    if (latestRel) {
      setText(
        "hero-release-banner",
        `Актуальный релиз v${latestRel.version} (${latestRel.date}) • ${latestRel.subtitle}`
      );
    }

    // 2. Рендерим секции
    renderDevlog();
    renderChangelog();
    renderShowcase();
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
    // Возвращаем разрешенные теги <b> и <code> если они уже были или парсим **bold** и `code`
    s = s.replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/g, "<b>$1</b>");
    s = s.replace(/&lt;code&gt;(.*?)&lt;\/code&gt;/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    return s;
  }

  /* ========================================================================
     1. Рендеринг Дневника разработки (Голосовые и текстовые обзоры)
     ======================================================================== */
  function renderDevlog() {
    const container = document.getElementById("devlog-container");
    if (!container) return;

    const savedCustomPosts = JSON.parse(localStorage.getItem("ai_team_custom_devlog") || "[]");
    const posts = [...savedCustomPosts, ...(DATA.devlog || [])];

    if (!posts.length) {
      container.innerHTML = `<p style="color:var(--text-secondary);">Пока нет опубликованных обзоров.</p>`;
      return;
    }

    container.innerHTML = posts
      .map((post, idx) => {
        const playerId = `player-devlog-${idx}`;
        const barsHtml = Array.from({ length: 28 })
          .map((_, i) => {
            const h = 25 + ((i * 17 + idx * 13) % 65);
            return `<span class="wave-bar" style="height:${h}%"></span>`;
          })
          .join("");

        const highlightsHtml =
          post.highlights && post.highlights.length
            ? `<ul class="devlog-highlights">
                ${post.highlights.map((h) => `<li>${formatMarkdownInline(h)}</li>`).join("")}
               </ul>`
            : "";

        const modeLabel = post.audio_url
          ? `🎵 Аудиозапись (${post.duration || "WAV/MP3"})`
          : `🎙️ ИИ-озвучка обзора (${post.duration || "RU Voice"})`;

        const encodedScript = encodeURIComponent(post.voice_script || post.summary || post.title);
        const encodedAudio = post.audio_url ? encodeURIComponent(post.audio_url) : "";

        return `
        <article class="devlog-card">
          <div class="devlog-top">
            <span class="devlog-badge">${escapeHtml(post.badge || "🎙️ Обзор")}</span>
            <span class="devlog-date">${escapeHtml(post.date)} • v${escapeHtml(post.version || DATA.meta.version)}</span>
          </div>

          <h3 class="devlog-title">${escapeHtml(post.title)}</h3>

          <!-- Встроенный голосовой плеер -->
          <div class="voice-player" id="${playerId}">
            <button class="play-btn" title="Прослушать голосовой обзор"
              onclick="toggleVoicePlayer('${playerId}', '${encodedAudio}', '${encodedScript}')">
              <span class="play-icon" id="icon-${playerId}">▶</span>
            </button>
            <div class="voice-waveform">
              <div class="wave-bars">${barsHtml}</div>
              <div class="voice-meta-row">
                <span id="status-${playerId}">${modeLabel}</span>
                <span>Автор: ${escapeHtml(post.author || "Vladimir Rybalsky")}</span>
              </div>
            </div>
            <button class="speed-btn" onclick="cyclePlaybackSpeed(this)" title="Скорость воспроизведения">
              ${playbackSpeed}x
            </button>
          </div>

          <p class="devlog-summary">${formatMarkdownInline(post.summary)}</p>
          ${highlightsHtml}
        </article>`;
      })
      .join("");
  }

  /* ========================================================================
     2. Универсальный Аудиоплеер (Реальный MP3/WAV + Браузерный TTS Fallback)
     ======================================================================== */
  window.toggleVoicePlayer = function (playerId, encodedAudioUrl, encodedScript) {
    const audioUrl = encodedAudioUrl ? decodeURIComponent(encodedAudioUrl) : "";
    const scriptText = encodedScript ? decodeURIComponent(encodedScript) : "";

    // Если нажали на уже играющий плеер — ставим на паузу/стоп
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
    if (statusEl) statusEl.textContent = "🔊 Воспроизведение голосового обзора...";

    // Вариант А: Если есть реальный аудиофайл (.mp3 / .wav / .ogg / blob)
    if (audioUrl) {
      activeAudioElement = new Audio(audioUrl);
      activeAudioElement.playbackRate = playbackSpeed;
      activeAudioElement.onended = () => stopAllAudio();
      activeAudioElement.onerror = () => {
        // Если файл не найден, плавно переключаемся на синтез речи
        speakWithBrowserTTS(scriptText);
      };
      activeAudioElement.play().catch(() => speakWithBrowserTTS(scriptText));
      return;
    }

    // Вариант Б: Озвучка текста через встроенный голосовой движок
    speakWithBrowserTTS(scriptText);
  };

  function speakWithBrowserTTS(text) {
    if (!("speechSynthesis" in window)) {
      alert("Ваш браузер не поддерживает синтез речи. Прикрепите MP3/WAV файл в папку website/audio/.");
      stopAllAudio();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = playbackSpeed;

    // Выбираем лучший русский голос, если доступен
    const voices = window.speechSynthesis.getVoices();
    const ruVoice =
      voices.find((v) => v.lang.startsWith("ru") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Dmitry") || v.name.includes("Maxim"))) ||
      voices.find((v) => v.lang.startsWith("ru"));
    if (ruVoice) utterance.voice = ruVoice;

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
      if (prevStatus) prevStatus.textContent = "🎙️ Нажмите ▶ для прослушивания";
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
     3. Рендеринг Истории Версий (Changelog Timeline)
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
      container.innerHTML = `<p style="color:var(--text-secondary);">По вашему запросу версий не найдено.</p>`;
      return;
    }

    container.innerHTML = releases
      .map((rel, idx) => {
        const isCollapsed = idx > 2 && !query; // Первые 3 версии развернуты по умолчанию
        const encodedVoice = encodeURIComponent(rel.voice_summary || rel.subtitle);
        const playerId = `rel-voice-${rel.version.replace(/\./g, "_")}`;

        const tagsHtml = (rel.tags || [])
          .map((t) => `<span class="devlog-badge" style="font-size:0.7rem; padding:0.15rem 0.55rem;">${escapeHtml(t)}</span>`)
          .join("");

        const sectionsHtml = (rel.sections || [])
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
            <div style="display:flex; align-items:center; gap:0.5rem;" onclick="event.stopPropagation()">
              ${tagsHtml}
              <button class="btn btn-secondary btn-sm" id="${playerId}"
                onclick="toggleVoicePlayer('${playerId}', '${rel.audio_file ? encodeURIComponent(rel.audio_file) : ""}', '${encodedVoice}')">
                <span id="icon-${playerId}">🔊</span> Слушать
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
     4. Витрина Боевых Проектов (Battle-Tested Showcase)
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
          <h3 style="margin: 0.85rem 0 0.4rem; font-size:1.15rem;">#${p.id}. ${escapeHtml(p.name)}</h3>
          <p style="color:var(--text-secondary); font-size:0.88rem;">${formatMarkdownInline(p.overview)}</p>
        </div>
        <div>
          <div style="font-size:0.78rem; color:#94a3b8; margin-bottom:0.5rem;">
            ✅ Верификация: <b style="color:#e2e8f0;">${escapeHtml(p.verification)}</b>
          </div>
          <div class="project-cmd">
            <span>$ ${escapeHtml(p.command)}</span>
            <span style="font-size:0.7rem; color:var(--text-muted);">100% Auto</span>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  /* ========================================================================
     5. Интерактивный Симулятор Студии в Hero-окне
     ======================================================================== */
  const AGENT_STEPS = [
    {
      role: "planner",
      tag: "[PLANNER]",
      msg: "Декомпозиция цели в граф задач (DAG: 4 атомарных узла)...",
      verdict: "STAGE 1/5: PLANNING DAG",
    },
    {
      role: "designer",
      tag: "[DESIGNER]",
      msg: "Генерация UI дизайн-токенов, палитры и чистых векторных SVG...",
      verdict: "STAGE 2/5: UI/UX DESIGN",
    },
    {
      role: "coder",
      tag: "[CODER]",
      msg: "Запись рабочего кода через edit_protocol в изолированную песочницу...",
      verdict: "STAGE 3/5: IMPLEMENTATION",
    },
    {
      role: "tester",
      tag: "[TESTER]",
      msg: "Запуск pytest в нативном UTF-8 Sandbox: 24/24 passed (100% Green)!",
      verdict: "STAGE 4/5: QA VERIFICATION",
    },
    {
      role: "reviewer",
      tag: "[REVIEWER]",
      msg: "5D Scorecard: 9.6/10 (APPROVE) ➔ Scoped Git Commit выполнен!",
      verdict: "VERDICT: APPROVE (9.6 / 10)",
    },
  ];

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

    const stepInfo = AGENT_STEPS.find((s) => s.role === role);
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

    let stepIndex = 0;
    selectDemoAgent(AGENT_STEPS[0].role);

    demoTimer = setInterval(() => {
      stepIndex++;
      if (stepIndex >= AGENT_STEPS.length) {
        clearInterval(demoTimer);
        demoTimer = null;
        return;
      }
      selectDemoAgent(AGENT_STEPS[stepIndex].role);
    }, 1100);
  };

  /* ========================================================================
     6. Модальное окно записи голосового обзора (MediaRecorder API)
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

        setText("rec-status", "✅ Запись готова! Прослушайте ниже или сохраните в папку website/audio/");
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setText("rec-status", "🔴 Идёт запись с микрофона... Говорите!");
      document.getElementById("btn-start-rec").style.display = "none";
      document.getElementById("btn-stop-rec").style.display = "inline-flex";
    } catch (err) {
      setText("rec-status", "⚠️ Не удалось получить доступ к микрофону: " + err.message);
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
    const title = document.getElementById("post-title")?.value.trim() || "Свежий обзор разработки AI-Team Studio";
    const summary =
      document.getElementById("post-summary")?.value.trim() ||
      "Делюсь текущим прогрессом разработки студии и планами на следующий релиз.";

    const newPost = {
      id: "local-" + Date.now(),
      version: DATA.meta?.version || "0.13.0",
      date: new Date().toISOString().slice(0, 10),
      title: title,
      author: DATA.meta?.author || "Vladimir Rybalsky",
      badge: "🎙️ Авторский обзор",
      audio_url: recordedBlobUrl || null,
      duration: recordedBlobUrl ? "Голосовая запись" : "ИИ-озвучка",
      voice_script: summary,
      summary: summary,
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
