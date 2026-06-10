# Kenneth Chua - Personal Portfolio

[![CI/CD Pipeline](https://github.com/KennethChua1998/Portfolio-Website/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/KennethChua1998/Portfolio-Website/actions)
[![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)

Modern Vue.js portfolio built around a high-end editorial design system ("The Digital Archivist" — see [designs/DESIGN.md](designs/DESIGN.md)), deployed to Google Cloud Run. You are currently viewing this project.

**Cloud Specialist @ PointStar | Google Cloud Professional Certified**

## About Kenneth

Full-Stack Developer building scalable web applications since 2021. Currently serving as a Cloud Specialist at PointStar, delivering Google Cloud Platform solutions across SEA.

I specialize in full-stack web development, AI/ML integration, and REST API development. My technical expertise spans modern JavaScript frameworks, backend development, and cloud-native architecture.

**Key Achievements:**

- Google Cloud Professional Developer Certified
- Technical Expert Badge - Build with Vertex AI
- Delivered enterprise solutions across cross-functional teams

## Features

- **Editorial Design System:** Warm, archival aesthetic with serif/sans typography pairing — rules documented in `designs/DESIGN.md`
- **Custom Cursor:** Dot-and-ring cursor in the site palette (mouse devices only, respects reduced-motion)
- **Scroll-Triggered Animations:** Sections animate in via a shared `useScrollTrigger` composable
- **Section-based Data Architecture:** No static text in templates — all content organized in data files
- **Web3Forms Integration:** Functional contact form with real-time submission
- **Development Tools:** ESLint, Prettier, and Vitest configured for code quality

## Technologies Used

| Category       | Technology                                                                      |
| -------------- | ------------------------------------------------------------------------------- |
| **Framework**  | [Vue.js 3](https://vuejs.org/) with Composition API                             |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/) for responsive design                  |
| **Animations** | CSS3 transitions and keyframes for smooth animations                            |
| **Icons**      | [Lucide Vue](https://lucide.dev/) for modern iconography                        |
| **Build Tool** | [Vite](https://vitejs.dev/) for fast development and optimized builds           |
| **Testing**    | [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) |
| **Dev Tools**  | ESLint + Prettier for code quality                                              |

## Project Structure

```
portfolio-website/
├── src/
│   ├── components/          # Reusable Vue.js components
│   │   ├── ui/             # Base UI components (BackToTop, ProjectCard, CustomCursor)
│   │   ├── sections/       # Page sections (Hero, About, Skills, Projects, Contact)
│   │   └── layout/         # Layout components (AppHeader, AppFooter)
│   ├── composables/        # Vue 3 composables (useScrollTrigger)
│   ├── data/               # Static data configuration organized by section
│   │   ├── hero.js         # Hero section data (name, title, subtitle, buttons)
│   │   ├── contact.js      # Contact section data + shared contact info
│   │   ├── footer.js       # Footer data (imports from personal.js / contact.js)
│   │   ├── personal.js     # About section data (bio, achievements, skills)
│   │   ├── skills.js       # Technical skills grouped by category
│   │   └── projects.js     # Project portfolio data
│   └── utils/              # Shared helpers (scroll.js)
├── designs/                # Design system documentation + mockups
├── public/                 # Static public assets (images, favicon)
└── tests/                  # Vitest test suite
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (which includes npm)
- [Vue.js 3](https://vuejs.org/) knowledge recommended

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/KennethChua1998/Portfolio-Website.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd Portfolio-Website
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Run the development server**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:8080`.

### Vue.js Development Commands

```sh
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Serve production build
npm run serve

# Lint and fix code
npm run lint

# Run tests (watch mode; use `npx vitest run` for a single pass)
npm run test

# Run tests with UI
npm run test:ui

# Format code
npm run format
```

## Architecture & Data Organization

This project is a single-page Vue 3 app — `App.vue` composes the section components directly (no router, no global store). Content lives in a modular data layer:

- **Single File Components** with `<script setup>` syntax
- **Composition API** with shared composables (`useScrollTrigger`) and utils (`utils/scroll.js`)
- **Component-based architecture** with clear separation of concerns
- **Responsive design** with Tailwind CSS tokens implementing the editorial design system

### Data Structure

All data files are centralized in `src/data/` with no static text in templates. `personal.js` is the source of truth for identity and the dynamically computed years of experience; `hero.js` and `footer.js` import from it, and `footer.js` shares contact links with `contact.js`.

### Component Integration

- **HeroSection.vue**: Uses `heroData` for headline, subtitle, and button text
- **AboutSection.vue**: Uses `personalInfo` for bio, achievements, and skills with scroll animations
- **SkillsSection.vue**: Uses skill category exports with progress indicators
- **ProjectsSection.vue**: Uses `projects` array for project cards with technology badges
- **ContactSection.vue**: Uses `contactData` for titles, contact info, and form labels
- **AppFooter.vue**: Uses `footerData` for footer content and social links

## 🚨 No Static Text Policy

**CRITICAL RULE: NO static text should be hardcoded in HTML/Vue templates!**

All text content must be stored in the corresponding data files:

### ✅ Correct Approach:

```vue
<!-- ✅ GOOD: Text from data file -->
<h1>{{ heroData.headline }}</h1>
<p>{{ heroData.subtitle }}</p>
<button>{{ heroData.buttons.contact }}</button>
```

### ❌ Incorrect Approach:

```vue
<!-- ❌ BAD: Hardcoded static text -->
<h1>Kenneth Chua</h1>
<p>Cloud Specialist & Full-Stack Developer</p>
<button>Get In Touch</button>
```

### Why This Matters:

- **Content Management**: All content changes happen in one place (data files)
- **Consistency**: Prevents text duplication and inconsistencies
- **Internationalization**: Makes future i18n implementation easy
- **Maintenance**: Developers don't need to hunt through templates for text changes

## Testing

Test suite using Vitest and Vue Test Utils.

### Test Structure

```
tests/
├── components/          # Vue component tests (ProjectCard, BackToTop, AppFooter)
├── composables/         # Composable tests (useScrollTrigger)
├── data/                # Data validation tests (projects, skills, personal)
└── utils/               # Helper tests (scroll)
```

### Running Tests

```bash
# Run all tests once
npx vitest run

# Watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run specific test file
npx vitest tests/components/ProjectCard.test.js
```

## Cloud Deployment

### Google Cloud Run

This project deploys automatically to Google Cloud Run (`asia-southeast1`) via GitHub Actions: tests + lint + build run on every push, and pushes to `master` build the Docker image and deploy it. The production bundle is built inside the Docker image — `dist/` is not committed.

#### Required Service Account Permissions (Least Privilege):

- **`roles/run.developer`** - Deploy and manage Cloud Run services (not admin)
- **`roles/artifactregistry.writer`** - Push container images
- **`roles/iam.serviceAccountUser`** - Act as Cloud Run service account

#### GitHub Secrets Required:

- **`GCP_PROJECT_ID`** - Your Google Cloud project ID
- **`GCP_SA_KEY`** - Service account key JSON file content

#### Manual Deployment:

```bash
gcloud run deploy portfolio \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port 8080
```

---

## Contact

**Kenneth Chua** - Cloud Specialist & Full-Stack Software Engineer

- 📧 Email: me@kennethchua.com
- 💼 [LinkedIn](https://www.linkedin.com/in/kenneth-chua/)
- 💻 [GitHub](https://github.com/kennethchua1998)
- 🌍 Location: Penang, Malaysia
- 🔗 Portfolio: [Live Demo](https://kennethchua.com)
