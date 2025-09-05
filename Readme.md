# Kenneth Chua - Personal Portfolio

A modern, interactive portfolio website showcasing my expertise as a Cloud Specialist and Full-Stack Developer. This project demonstrates proficiency in modern web technologies and cloud-based solutions.

**Cloud Specialist @ PointStar | Google Cloud Professional Developer**

## About Kenneth

Passionate Software Engineer specializing in cloud-based solutions with 4+ years of experience delivering enterprise-grade applications. Currently serving as a Cloud Specialist at PointStar, focusing on Google Cloud technologies, AI/ML integration, and DevOps CI/CD implementations.

**Key Achievements:**
- Technical Lead for Full Stack Project delivered to Singapore Government Agency
- Google Cloud Professional Cloud Architect & Developer Certified
- Delivered multiple Python automation projects and no-code solutions

## Features

- **Interactive Hero Section:** A captivating, full-screen digital playground built with WebGL, featuring a dynamic particle nebula that reacts to mouse movements and clicks.
- **Smooth Scrolling Single-Page Application:** A seamless user experience with smooth scrolling navigation between sections.
- **Animated Sections:** Sections and elements animate into view as the user scrolls, creating a dynamic and engaging experience.
- **Modern UI/UX:** A clean and modern design built with `shadcn-vue` and Tailwind CSS.
- **Featured Projects:** A grid of my best projects with details and links to live demos and GitHub repositories.
- **Contact Form:** A functional contact form for easy communication.

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
The portfolio uses a modular data approach organized by section for better maintainability:

**`src/data/hero.js`** - Hero section content:
```javascript
export const heroData = {
  name: "Kenneth",
  title: "Software Engineer & Cloud Specialist",
  subtitle: "Delivering Google Cloud solutions with 4+ years of experience...",
  buttons: { projects: "View Projects", contact: "Get In Touch" }
}
```

**`src/data/contact.js`** - Contact section content:
```javascript
export const contactData = {
  title: "Get In Touch",
  heading: "Let's work together",
  description: "I'm always interested in new opportunities...",
  contactInfo: { email, linkedin, github, linkedinDisplay },
  form: { name: "Name", email: "Email", message: "Message", submit: "Send Message", submitting: "Sending..." }
}
```

**`src/data/footer.js`** - Footer section content:
```javascript
export const footerData = {
  name: "Kenneth",
  title: "Cloud Specialist & Full-Stack Developer",
  contactInfo: { email, linkedin, github }
}
```

**`src/data/personal.js`** - About section personal information:
```javascript
export const personalInfo = {
  name: "Kenneth",
  description: [...], // Multi-paragraph bio
  achievements: [...], // Key professional achievements
  skills: [...] // Core technology skills array
}
```

**`src/data/skills.js`** - Technical skills organized by category:
```javascript
// Exports: cloudSkills, backendSkills, frontendSkills, databaseSkills, toolsSkills
// Each category includes: title, icon, color, skills array with levels
// Plus certifications array with Google Cloud credentials
```

**`src/data/projects.js`** - Portfolio project showcase:
```javascript
export const projects = [
  {
    id, title, description, technologies,
    githubUrl, liveUrl, imageUrl, 
    status, year, aiAssisted
  }
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


## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Cloud Deployment

### Vercel (Recommended for Vue.js)

```sh
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Auto-deployment on git push (connect GitHub repo)
vercel --prod
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Kenneth Chua** - Cloud Specialist & Full-Stack Developer

- 📧 Email: me@kennethchua.com
- 💼 [LinkedIn](https://www.linkedin.com/in/kenneth-chua/)
- 💻 [GitHub](https://github.com/kennethchua1998)
- 🌍 Location: Penang, Malaysia
- 🔗 Portfolio: [Live Demo](https://your-portfolio-url.com)