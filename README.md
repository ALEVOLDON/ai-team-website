<div align="center">

# ⚡ AI-Team Studio
### Autonomous Multi-Agent Desktop Software Development Suite

[![Version](https://img.shields.io/badge/version-v0.13.0-blue.svg)](https://alevoldon.github.io/ai-team-website/)
[![Status](https://img.shields.io/badge/status-active%20development-brightgreen.svg)]()
[![Pytest](https://img.shields.io/badge/pytest-197%20passed-emerald.svg)]()
[![Releases](https://img.shields.io/badge/releases-14%20versions-cyan.svg)](https://alevoldon.github.io/ai-team-website/#changelog)
[![Stacks](https://img.shields.io/badge/stacks-Python%20%7C%20Node.js%20%7C%20Web-blue.svg)]()
[![Inference](https://img.shields.io/badge/inference-Local%20GPU%20%7C%20Cloud%20LPUs-orange.svg)]()
[![Voice](https://img.shields.io/badge/voice-Gemini%203.8%20Flash%20TTS-purple.svg)]()
[![License: Commercial](https://img.shields.io/badge/license-Commercial%20Pro-yellow.svg)]()

---

**Languages / Языки:**  
**[English](README.md)** • **[Русский](README_RU.md)**

🌐 **Interactive Live Website & Voice Devlog:** [alevoldon.github.io/ai-team-website](https://alevoldon.github.io/ai-team-website/)

---

</div>

## 🌟 What is AI-Team Studio?

**AI-Team Studio** is a commercial autonomous desktop software development suite where you act as **Team Lead / Product Manager**. Instead of typing lines of code manually, you define a single high-level objective. A specialized crew of 5 autonomous AI agents handles the complete engineering lifecycle from DAG architecture to scoped Git commits:

```mermaid
graph TD
    User([🎯 User Objective / Prompt]) --> Planner[📐 Lead Architect / Planner]
    Planner -->|Task DAG Breakdown| Orchestrator{⚡ Orchestrator}
    
    subgraph Autonomous Engineering Loop
        Orchestrator --> Designer[🎨 UI/UX Designer]
        Orchestrator --> Coder[💻 Senior Coder]
        Designer -->|Design Tokens & Clean SVG| Coder
        Coder -->|UTF-8 Sandbox File Actions| Tester[🧪 QA Tester]
        Tester -->|Pytest & Runtime Verification| Reviewer[🔍 Tech Lead Reviewer]
        
        Reviewer -->|Verdict: APPROVE ≥ 8.0| GitManager[📦 Scoped Git Commit]
        Reviewer -->|Verdict: REWORK 6.0-7.9| Coder
        Reviewer -->|Verdict: REPLAN < 6.0| Planner
    end
    
    GitManager -->|Next DAG Task| Orchestrator
```

---

## ✨ Key Capabilities & Studio Modules

### 1. 🤖 Specialized 5-Agent Crew
* **📐 Lead Architect (Planner):** Scans the project workspace and decomposes goals into a Directed Acyclic Graph (DAG) of atomic tasks with explicit dependencies.
* **🎨 UI/UX Designer:** Crafts cohesive color palettes, typography tokens, layout hierarchy, and pure vector SVG assets (Anti-Slop Protocol).
* **💻 Senior Coder:** Implements complete, idiomatic code without `# TODO` placeholders via an atomic edit protocol.
* **🧪 QA Tester:** Executes tests inside a strict, isolated native UTF-8 sandbox (`pytest`, `node --test`, smoke launch verification).
* **🔍 Tech Lead Reviewer:** Evaluates code across a **5-Dimensional Quality Matrix** (Architecture, Tests, Requirements, Quality, Security) before triggering scoped Git commits.

### 2. 🎙️ Two-Way Voice Dialogue (Gemini 3.8 Flash TTS & Push-to-Talk)
* Real-time expressive speech synthesis in English and Russian.
* Hands-free push-to-talk voice commands: talk to the Lead Architect through your microphone, and hear spoken architectural feedback and status updates out loud.
* Automatic quota cascade fallback pool prevents 429 quota errors.

### 3. 💰 BYOK Model (Bring Your Own Key) & Near-Zero Running Cost
* **100% Privacy:** Runs completely offline on consumer GPUs (via LM Studio or Ollama) with zero code telemetry leaving your machine.
* **Ultra-Affordable Cloud:** Native support for DeepSeek V3, Google Gemini (Free Tier), NVIDIA Nemotron, and OpenRouter. Building a full project typically costs between **$0.00** and **$0.01**.

### 4. 🖥️ Cyber-Dark Desktop Studio (WebView2)
* VS Code-inspired dark UI, streaming agent reasoning tokens, live DAG task graph, 8-bit vector animated pixel-art agent sprites, and real-time tok/s telemetry.

### 5. 🛡️ Dual-Repo Security Isolation (Zero Source Code Leakage)
* Core studio source code and intellectual property remain 100% private in local development.
* The public website repository only hosts presentation metadata, changelog logs, and voice devlogs, completely eliminating accidental source leaks.

### 6. 🔄 Auto-Sync Metadata Engine (`sync_website.py`)
* Automatically parses release changelogs, test suites (197+ tests), and project metrics to synchronize the website and devlogs with zero manual maintenance.

---

## 🌐 Website & Public Presentation Features

The public showcase website ([alevoldon.github.io/ai-team-website](https://alevoldon.github.io/ai-team-website/)) provides:
* **🕹️ Interactive Simulator:** Experience real agent pipeline transitions (Planner ➔ Designer ➔ Coder ➔ Tester ➔ Reviewer) with live logs and diff views.
* **🎙️ Voice Devlog & Podcast:** 14 audio release reviews with interactive waveform visualization, speed controls (0.75x–2.0x), and spoken transcripts.
* **📜 Full Changelog Matrix:** All 14 releases (`v0.1.0` through `v0.13.0`) with tag-based filtering (`ALL`, `DESKTOP`, `VOICE`, `CORE`, `TESTING`, `SHOWCASE`).
* **🌐 100% Bilingual Interface:** Instant switching between English and Russian across all cards, badges, and modals.
* **📱 Adaptive Cyber Design:** Responsive masonry layouts, mobile drawer navigation, and a 4-column system status footer.

---

## 🎮 Battle-Tested Autonomous Showcase

Projects built, tested, and verified 100% autonomously by AI-Team Studio without manual coding:

| # | Project | Stack | Overview | Verification | LLM Tokens & Cost |
|---|---|---|---|---|---|
| 1 | **Password & Hash Guard** | 🐍 Python | Complexity validator, bcrypt & argon2 hashing | 100% pytest | 18k tok • ~$0.005 |
| 2 | **Tic-Tac-Toe Minimax AI** | 🐍 Python | Terminal game with unbeatable Minimax bot | 100% pytest | 21k tok • ~$0.006 |
| 3 | **Battle City (NES Dendy 8-bit)** | 🐍 Python | Retro arcade: player tank, enemy AI, destructible blocks | 100% pytest + Smoke | 40k tok • ~$0.010 |
| 4 | **FinCalc CLI Suite** | 🐍 Python | Financial calculator: compound interest, loan schedules | 100% pytest | 86k tok • ~$0.015 |
| 5 | **Number Guessing Arena** | 🐍 Python | Interactive CLI game with dynamic hints & leaderboards | 100% pytest | 19k tok • ~$0.004 |
| 6 | **Rogue-lite Dungeon Crawler** | 🐍 Python | Procedural turn-based RPG with character progression | 100% pytest | 144k tok • ~$0.024 |
| 7 | **Habit & Task Tracker** | 🟨 Node.js | Multi-stack habit tracker with JSON persistence | 22/22 node:test | 43k tok • **$0.008** |

---

## 💎 Commercial Pricing & Licensing

| Tier | Price | Highlights |
|---|---|---|
| **Public Showcase** | **$0** (Free Access) | Browse all release reviews, audio devlogs, changelogs, and autonomous project showcases. |
| **AI-Team Pro Studio** | **$19 one-time** *(Early Bird, regular $29)* | Native Desktop Windows GUI (WebView2), all 5 AI agents, Push-to-Talk voice chat, 100% offline local GPU inference, lifetime updates. |
| **Team / Agency Edition** | **$49 lifetime** | Everything in Pro Studio, custom agent roles & system prompts, multi-stack enhancements, and priority founder support. |

---

## 👤 Author & Copyright

**Author, Founder & Architect:** **Vladimir Rybalsky**  
👉 **Live Web App & Voice Demos:** [alevoldon.github.io/ai-team-website](https://alevoldon.github.io/ai-team-website/)

---

## 📄 License

Showcase website and presentation layer distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
