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
│   │   ├── ui/             # Base UI components
│   │   ├── sections/       # Page sections (Hero, About, Projects, Skills)
│   │   └── layout/         # Layout components
│   ├── data/               # Static data files (skills, projects, etc.)
│   ├── stores/             # Pinia stores for state management
│   └── assets/             # Static assets
├── public/                 # Static public assets
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

## Architecture

This project follows modern Vue.js best practices:

- **Single File Components** with `<script setup>` syntax
- **Composition API** for better logic reuse
- **Component-based architecture** with clear separation of concerns
- **Data-driven UI** with dynamic skill categories and project listings
- **Responsive design** with Tailwind CSS


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

- 📧 Email: [Your Email]
- 💼 [LinkedIn](https://www.linkedin.com/in/kenneth-chua/)
- 🌍 Location: Penang, Malaysia
- 🔗 Portfolio: [Live Demo](https://your-portfolio-url.com)