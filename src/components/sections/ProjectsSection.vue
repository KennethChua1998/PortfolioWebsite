<template>
  <section
    id="projects"
    ref="projectsSection"
    class="py-20 glass-section relative overflow-hidden"
  >
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
import { projects } from '@/data/projects.js'

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
    entries => {
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
