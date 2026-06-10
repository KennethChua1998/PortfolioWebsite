<template>
  <section
    id="projects"
    ref="projectsSection"
    class="py-22 bg-surface-container-low relative overflow-hidden"
  >
    <div class="section-container">
      <!-- Section Label -->
      <p class="editorial-label mb-4">Curated Archives</p>
      <h2 class="font-serif text-display-md font-bold text-on-surface mb-2">
        Featured Projects
      </h2>
      <p class="font-sans text-body-lg text-on-surface/60 max-w-2xl mb-8">
        A curated selection of projects showcasing cloud architecture, full-stack development, and technical problem-solving.
      </p>

      <div
        class="projects-grid gap-8"
        :class="projects.length <= 2 ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-2 lg:grid-cols-3'"
      >
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-wrapper"
          :class="{ 'animate-in': animatedProjects[index] }"
        >
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { projects } from '@/data/projects.js'
import { useScrollTrigger } from '@/composables/useScrollTrigger.js'

const projectsSection = ref(null)
const animatedProjects = ref({})

const animateProjects = () => {
  projects.forEach((project, index) => {
    setTimeout(() => {
      animatedProjects.value[index] = true
    }, index * 150)
  })
}

useScrollTrigger(projectsSection, () => setTimeout(() => animateProjects(), 200))
</script>

<style scoped>
.projects-grid {
  display: grid;
}

.project-wrapper {
  display: grid;
  grid-row: span 7;
  grid-template-rows: subgrid;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
              transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.project-wrapper.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
