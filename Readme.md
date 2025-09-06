# Kenneth Chua - Personal Portfolio

[![CI/CD Pipeline](https://github.com/KennethChua1998/Portfolio-Website/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/KennethChua1998/Portfolio-Website/actions)
[![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)

Modern Vue.js website with Three.js WebGL animations and responsive design. You are currently viewing this project.

**Cloud Specialist @ PointStar | Google Cloud Professional Certified**

## About Kenneth

Passionate Software Engineer specializing in cloud-based solutions with 4+ years of experience developing and delivering applications. Currently serving as a Cloud Specialist at PointStar, focusing on Google Cloud technologies.

I specialize in AI/ML integration, API development, and DevOps CI/CD implementations. My technical expertise includes full-stack development with modern JavaScript frameworks, Python automation, and cloud application modernization.

**Key Achievements:**

- Technical Lead for full-stack projects in cross-functional teams
- Google Cloud Professional Certified
- Delivered Python automation solutions and no-code platforms

## Features

- **WebGL Three.js Animation:** Interactive hero section with mouse-responsive particle system
- **Glass-morphism Design:** Modern UI with glass-effect components and smooth animations
- **Vue 3 Composition API:** Built with modern Vue.js patterns and reactive state management
- **Section-based Data Architecture:** No static text in templates - all content organized in data files
- **Web3Forms Integration:** Functional contact form with real-time submission
- **Development Tools:** ESLint, Prettier, and Vitest configured for code quality

## Technologies Used

| Category       | Technology                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **Framework**  | [Vue.js 3](https://vuejs.org/) with Composition API                                             |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/) for responsive design                                  |
| **3D/WebGL**   | [Three.js](https://threejs.org/) for interactive animations                                     |
| **Animations** | [GSAP](https://greensock.com/gsap/) for smooth transitions                                      |
| **Icons**      | [Lucide Vue](https://lucide.dev/) for modern iconography                                        |
| **State**      | [Pinia](https://pinia.vuejs.org/) + [VueUse](https://vueuse.org/) for reactive state management |
| **Build Tool** | [Vite](https://vitejs.dev/) for fast development and optimized builds                           |
| **Testing**    | [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/)                 |
| **Dev Tools**  | ESLint + Prettier for code quality                                                              |

## Project Structure

```
portfolio-website/
├── src/
│   ├── components/          # Reusable Vue.js components
│   │   ├── ui/             # Base UI components (BackToTop, ProjectCard)
│   │   ├── sections/       # Page sections (Hero, About, Projects, Skills, Contact)
│   │   ├── layout/         # Layout components (AppHeader, AppFooter)
│   │   └── webgl/          # Three.js/WebGL components (NetworkAnimation)
│   ├── composables/        # Vue 3 composables (useThreeJS)
│   ├── data/               # Static data configuration organized by section
│   │   ├── hero.js         # Hero section data (name, title, subtitle, buttons)
│   │   ├── contact.js      # Contact section data (title, description, form labels)
│   │   ├── footer.js       # Footer data (name, title, contact links)
│   │   ├── personal.js     # About section data (bio, achievements, skills)
│   │   ├── skills.js       # Technical skills grouped by category
│   │   └── projects.js     # Project portfolio data
│   ├── stores/             # Pinia stores (theme management)
│   ├── types/              # Type definitions
│   └── assets/             # Static assets
├── public/                 # Static public assets (images, favicon)
└── docs/                   # Project documentation
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (which includes npm)
- [Vue.js 3](https://vuejs.org/) knowledge recommended

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/kenneth-chua/portfolio-website.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd portfolio-website
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Run the development server**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

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

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Format code
npm run format
```

## Architecture & Data Organization

This project follows modern Vue.js best practices with a well-structured data layer:

### Vue.js Architecture

- **Single File Components** with `<script setup>` syntax
- **Composition API** for better logic reuse and state management
- **Component-based architecture** with clear separation of concerns
- **Responsive design** with Tailwind CSS and glass-morphism effects

### Data Structure

The portfolio uses a modular data approach organized by section. All data files are centralized in `src/data/` with no static text in templates:

**`src/data/personal.js`** - Central source of personal information:

```javascript
export const personalInfo = {
  name: 'Kenneth Chua',
  firstName: 'Kenneth',
  description: [
    'Passionate Software Engineer specializing in cloud-based solutions with 4+ years of experience...',
    'I specialize in AI/ML integration, API development, and DevOps CI/CD implementations...'
  ],
  achievements: [
    'Technical Lead for full-stack projects in cross-functional teams',
    'Google Cloud Professional Certified',
    'Delivered Python automation solutions and no-code platforms'
  ],
  skills: ['Google Cloud Platform', 'JavaScript', 'Python', 'REST APIs', ...]
}
```

**`src/data/hero.js`** - Hero section (imports name from personal.js):

```javascript
import { personalInfo } from './personal.js'
export const heroData = {
  name: personalInfo.name,
  title: 'Cloud Specialist & Full-Stack Software Engineer',
  subtitle: 'Passionate about building scalable cloud solutions...',
  buttons: { projects: 'View Projects', contact: 'Get In Touch' },
}
```

**`src/data/contact.js`** - Contact section with Web3Forms integration:

```javascript
export const contactData = {
  title: 'Get In Touch',
  description:
    "I'm always interested in new opportunities and exciting projects...",
  form: {
    publicKey: '6b4a4d7c-bb9b-4c29-ac8e-80c3d79f9817',
    apiUrl: 'https://api.web3forms.com/submit',
  },
}
```

**`src/data/footer.js`** - Footer section (imports name from personal.js):

```javascript
import { personalInfo } from './personal.js'
export const footerData = {
  name: personalInfo.name,
  title: 'Cloud Specialist & Full-Stack Software Engineer',
  contactInfo: { email: 'me@kennethchua.com', linkedin: '...', github: '...' },
}
```

**`src/data/projects.js`** - Featured projects with enhanced descriptions:

```javascript
export const projects = [
  {
    title: 'Bursa Malaysia Website Scrapper',
    description:
      'Python web scraping script that extracts stock listings and financial data from the Bursa Malaysia website. Collects data for market analysis and research. Educational Purposes Only.',
    technologies: ['Python', 'Selenium', 'Data Collection'],
    githubUrl: 'https://github.com/KennethChua1998/BursaMalaysiaWebScrapper',
    imageUrl: '/project_screenshot/bursa_scrapper.png',
  },
]
```

### Component Integration

Each component imports data from its corresponding section-specific data file:

- **HeroSection.vue**: Uses `heroData` for name, title, subtitle, and button text
- **ContactSection.vue**: Uses `contactData` for titles, descriptions, contact info, and form labels
- **AppFooter.vue**: Uses `footerData` for footer content and social links
- **AboutSection.vue**: Uses `personalInfo` for bio, achievements, and skills with scroll animations
- **SkillsSection.vue**: Uses skill category exports with progress indicators
- **ProjectsSection.vue**: Uses `projects` array for project cards with technology badges
- **WebGL Integration**: Three.js particle system with interactive mouse animations

### Benefits of Section-Based Data Organization

- **Maintainability**: Easy to update content for specific sections
- **Scalability**: Add new sections without affecting existing data
- **Developer Experience**: Clear separation of concerns
- **Content Management**: Non-technical users can easily update section content
- **Type Safety**: Each section can have its own TypeScript interfaces

## 🚨 No Static Text Policy

**CRITICAL RULE: NO static text should be hardcoded in HTML/Vue templates!**

All text content must be stored in the corresponding data files:

### ✅ Correct Approach:

```vue
<!-- ✅ GOOD: Text from data file -->
<h1>{{ heroData.name }}</h1>
<p>{{ heroData.title }}</p>
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
- **Non-technical Updates**: Content can be updated without touching Vue components

### Data File Mapping:

- Names, titles, descriptions → Use full names from data files
- Button text → Store in respective section data
- Form labels → Store in `contactData.form`
- Error messages → Store in data files (not hardcoded)

## Testing

Comprehensive test suite using Vitest and Vue Test Utils with 100% test coverage.

### Test Structure

```
tests/
├── components/          # Vue component tests
│   └── ProjectCard.test.js
├── stores/             # Pinia store tests
│   └── theme.test.js
├── data/               # Data validation tests
│   ├── projects.test.js
│   └── skills.test.js
└── composables/        # Composable function tests
    └── useThreeJS.test.js
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run specific test file
npx vitest tests/components/ProjectCard.test.js
```

### Test Coverage

- **Components (8 tests)**: ProjectCard rendering, props, events, error handling
- **Stores (9 tests)**: Theme management, localStorage, state mutations
- **Data Validation (22 tests)**: Projects structure, skills integrity, certifications
- **Composables (10 tests)**: Three.js functions, initialization, cleanup

### Test Configuration

- **Framework**: Vitest with jsdom environment for Vue component testing
- **Vue Testing**: @vue/test-utils for component mount and interaction
- **Mocking**: Vi mocks for localStorage, Three.js, and browser APIs
- **Assertions**: Expect API with custom matchers for comprehensive validation

**Current Status**: ✅ 49 tests passing (100% success rate)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Cloud Deployment

### Google Cloud Run (Recommended)

This project includes automated deployment to Google Cloud Run via GitHub Actions.

#### Required Service Account Permissions (Least Privilege):

Use these minimal predefined roles:
- **`roles/run.developer`** - Deploy and manage Cloud Run services (not admin)
- **`roles/storage.objectAdmin`** - Push/pull container images only
- **`roles/iam.serviceAccountUser`** - Act as Cloud Run service account

#### Quick Setup:
```bash
# Replace with your project ID and region
PROJECT_ID="your-project-id"
REGION="us-central1"
SA_EMAIL="github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com"

# 1. Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# 2. Create Artifact Registry repository
gcloud artifacts repositories create portfolio \
    --repository-format=docker \
    --location=$REGION \
    --description="Docker repository for portfolio app"

# 3. Assign minimal roles for deployment
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/run.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/iam.serviceAccountUser"
```

#### GitHub Secrets Required:
- **`GCP_PROJECT_ID`** - Your Google Cloud project ID
- **`GCP_SA_KEY`** - Service account key JSON file content

#### Manual Deployment:
```bash
# Build and deploy manually
gcloud run deploy portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Kenneth Chua** - Cloud Specialist & Full-Stack Software Engineer

- 📧 Email: me@kennethchua.com
- 💼 [LinkedIn](https://www.linkedin.com/in/kenneth-chua/)
- 💻 [GitHub](https://github.com/kennethchua1998)
- 🌍 Location: Penang, Malaysia
- 🔗 Portfolio: [Live Demo](https://kennethchua.com)
