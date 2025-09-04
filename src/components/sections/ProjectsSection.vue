<template>
  <section id="projects" class="py-20 glass-section relative overflow-hidden" ref="projectsSection">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl font-bold text-center mb-16 text-emerald-400">
        Featured Projects
      </h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-wrapper"
          :class="{ 'animate-in': animatedProjects[index] }"
          :style="{ animationDelay: `${index * 200}ms` }"
        >
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'

const projectsSection = ref(null)
const animatedProjects = ref({})
const isVisible = ref(false)

// Animate projects on scroll
const animateProjects = () => {
  projects.forEach((project, index) => {
    setTimeout(() => {
      animatedProjects.value[index] = true
    }, index * 200) // Stagger by 200ms - slightly longer
  })
}

// Intersection Observer for scroll trigger
const setupScrollTrigger = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          setTimeout(() => animateProjects(), 200)
        }
      })
    },
    { threshold: 0.2 }
  )
  
  if (projectsSection.value) {
    observer.observe(projectsSection.value)
  }
}

onMounted(() => {
  setupScrollTrigger()
})

const projects = [
  {
    id: 1,
    title: 'Singapore Government Full-Stack Application',
    description: 'Technical Lead for enterprise-grade application delivered to Singapore Government Agency using modern cloud technologies',
    technologies: ['Google Cloud Platform', 'Full-Stack Development', 'API Integration', 'DevOps CI/CD'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: '/project-gov.jpg',
    status: 'Enterprise Project'
  },
  {
    id: 2,
    title: 'Python Automation Suite',
    description: 'Multiple Python automation projects delivered to Singapore Christian Organization for workflow optimization',
    technologies: ['Python', 'Automation', 'API Integration', 'Data Processing'],
    githubUrl: 'https://github.com/kenneth-chua/python-automation',
    liveUrl: null,
    imageUrl: '/project-automation.jpg',
    status: 'Client Project'
  },
  {
    id: 3,
    title: 'No-Code AppSheet Application',
    description: 'Custom business application built using Google AppSheet for Malaysia GLC organization',
    technologies: ['Google AppSheet', 'No-Code Platform', 'Business Logic', 'Data Management'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: '/project-appsheet.jpg',
    status: 'No-Code Solution'
  },
  {
    id: 4,
    title: 'Interactive Portfolio Website',
    description: 'Modern Vue.js portfolio with Three.js WebGL animations and responsive design',
    technologies: ['Vue.js 3', 'Three.js', 'Tailwind CSS', 'WebGL'],
    githubUrl: 'https://github.com/kenneth-chua/portfolio-website',
    liveUrl: 'https://your-portfolio-url.com',
    imageUrl: '/project-portfolio.jpg',
    status: 'Personal Project'
  },
  {
    id: 5,
    title: 'Motorola DSP Audio Firmware',
    description: 'Firmware development for Curve Wi-Fi Enhanced Business Radio with DSP audio processing',
    technologies: ['C/C++', 'DSP Programming', 'Firmware Development', 'Embedded Systems'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: '/project-firmware.jpg',
    status: 'Hardware Project'
  },
  {
    id: 6,
    title: 'E-Commerce Web Applications',
    description: 'Web applications and services development during internship at National Instruments',
    technologies: ['Java', 'Web Services', 'PL/SQL', 'Agile Development'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: '/project-ecommerce.jpg',
    status: 'Internship Project'
  },
]
</script>

<style scoped>
.project-wrapper {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
  transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.project-wrapper.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Enhanced hover effects */
.project-wrapper.animate-in:hover {
  transform: translateY(-10px) scale(1.03);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Subtle floating animation */
.project-wrapper.animate-in {
  animation: subtleFloat 8s ease-in-out infinite;
}

@keyframes subtleFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(0.5deg);
  }
  50% {
    transform: translateY(-3px) rotate(0deg);
  }
  75% {
    transform: translateY(-7px) rotate(-0.5deg);
  }
}

/* Stagger floating animations */
.project-wrapper:nth-child(1) { animation-delay: 0s; }
.project-wrapper:nth-child(2) { animation-delay: 1.3s; }
.project-wrapper:nth-child(3) { animation-delay: 2.6s; }
.project-wrapper:nth-child(4) { animation-delay: 3.9s; }
.project-wrapper:nth-child(5) { animation-delay: 5.2s; }
.project-wrapper:nth-child(6) { animation-delay: 6.5s; }

/* Pause floating on hover */
.project-wrapper:hover {
  animation-play-state: paused;
}

/* 3D entrance effects */
.project-wrapper:nth-child(even) {
  transform: translateY(50px) scale(0.9) rotateX(15deg);
}

.project-wrapper:nth-child(odd) {
  transform: translateY(50px) scale(0.9) rotateX(-15deg);
}

.project-wrapper.animate-in:nth-child(even),
.project-wrapper.animate-in:nth-child(odd) {
  transform: translateY(0) scale(1) rotateX(0deg);
}
</style>