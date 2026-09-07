# Firas Ben Khalifa — Personal Portfolio

**Live site:** [firas191.github.io/Portfolio_Mohamed_Firas_Ben_Khalifa](https://firas191.github.io/Portfolio_Mohamed_Firas_Ben_Khalifa/)

Portfolio of a Data Science & AI engineering student at ESPRIT, showcasing AI/ML projects, professional experience and NVIDIA Deep Learning Institute certifications.

## Features

- **Bilingual** — instant English / French toggle, preference saved between visits
- **Language-aware CV** — English selects `Resume_Firas_Ben_Khalifa.pdf`, French selects `Curriculum_Vitae_Firas_Ben_Khalifa.pdf`; both are previewable in an in-page modal with download and open-in-tab actions
- **Dark & light mode** — theme switcher with a custom-designed light palette, applied before first paint
- **Projects** — filterable by category (Agentic AI, Computer Vision, Machine Learning, Full-Stack), with links to the GitHub repositories
- **Verifiable certifications** — every NVIDIA DLI certificate card links to its official verification page
- **Hash-routed sections** — every section has its own URL (`#resume`, `#portfolio`, …) so links are shareable and the back button works
- Fully responsive, no frameworks, no build step — plain HTML, CSS and vanilla JavaScript

## Structure

```
index.html                     single page, five tab-switched sections
assets/css/style.css           all styles, incl. light theme and CV modal
assets/js/script.js            navigation, i18n, theme, filtering, CV modal
assets/images/                 project cover art (SVG) + favicon
Resume_Firas_Ben_Khalifa.pdf              English CV
Curriculum_Vitae_Firas_Ben_Khalifa.pdf    French CV
```

## Highlighted projects

| Project | Domain |
| --- | --- |
| [SkillBridge AI](https://github.com/firas191/SkillBridge-AI) | Agentic AI recruitment & education copilot |
| AIGIS *(private)* | Multimodal CNN + RAG assistant for structural diagnosis |
| AgriSmart *(private)* | Mobile-first smart farming platform with AI agents |
| [FraudShield](https://github.com/firas191/FraudShield) | Federated learning fraud detection with differential privacy |
| [InsightFlow AI](https://github.com/firas191/InsightFlow-AI) | Enterprise pulse agent over support tickets |
| [Mini-Devin](https://github.com/firas191/Mini-Devin) | Autonomous software-engineering agent (SWE-bench Lite) |
| [Face Emotion Recognition](https://github.com/firas191/Image-Captioning) | Real-time emotion recognition + scene captioning |

## Running locally

No dependencies. Serve the folder with any static server, for example:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly with `file://` works too, but PDF previews behave better over HTTP.)

## Contact

- Email: [firasbenkhellifa@gmail.com](mailto:firasbenkhellifa@gmail.com)
- LinkedIn: [firasbenkhalifa](https://www.linkedin.com/in/firasbenkhalifa/)
- GitHub: [firas191](https://github.com/firas191)

## Credits

Built on the [vCard personal portfolio template](https://github.com/codewithsadee/vcard-personal-portfolio) by [codewithsadee](https://github.com/codewithsadee) (MIT license), heavily customized: bilingual i18n system, light theme, certifications page, language-aware CV modal, project cover art and more.
