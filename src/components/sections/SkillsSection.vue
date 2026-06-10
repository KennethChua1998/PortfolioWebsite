<template>
  <section
    id="skills"
    ref="skillsSection"
    class="py-22 bg-surface relative overflow-hidden"
  >
    <div class="section-container">
      <!-- Section Label -->
      <p class="editorial-label mb-4">Technical Insights</p>
      <h2 class="font-serif text-display-md font-bold text-on-surface mb-6">
        Core Skills &amp;<br />Technologies
      </h2>
      <p class="font-sans text-body-lg text-on-surface/60 max-w-2xl mb-16">
        A comprehensive index of technical competencies, refined through years of enterprise cloud architecture and full-stack development.
      </p>

      <!-- Skills Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div
          v-for="skillCategory in skillCategories"
          :key="skillCategory.title"
          class="tonal-card p-8"
        >
          <div class="flex items-center gap-3 mb-6">
            <component
              :is="iconComponents[skillCategory.icon]"
              :size="20"
              class="text-primary"
            />
            <h3 class="font-serif text-title-lg font-semibold text-on-surface">
              {{ skillCategory.title }}
            </h3>
          </div>
          <div class="space-y-4">
            <div
              v-for="skill in skillCategory.skills"
              :key="skill.name"
              class="skill-item"
            >
              <div class="flex justify-between mb-1.5">
                <span class="font-sans text-body-md text-on-surface/80">{{ skill.name }}</span>
                <span class="font-sans text-body-md text-on-surface/50">{{ animatedSkills[skill.name] || 0 }}%</span>
              </div>
              <div class="w-full bg-surface-container-high rounded-full h-1.5">
                <div
                  class="h-1.5 rounded-full transition-all duration-1000"
                  :class="getBarColor(skillCategory.color)"
                  :style="{ width: (animatedSkills[skill.name] || 0) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <h3 class="font-serif text-headline-md font-bold text-on-surface text-center mb-8">
          Verified Expertise
        </h3>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="cert in certifications"
            :key="cert.name"
            class="chip"
          >
            <Award :size="16" class="mr-2 text-secondary" />
            <span>{{ cert.name }}</span>
            <span class="ml-2 opacity-60">{{ cert.period }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import {
  Cloud,
  Code,
  Monitor,
  Settings,
  Award,
  Database,
} from 'lucide-vue-next'
import {
  cloudSkills,
  backendSkills,
  frontendSkills,
  databaseSkills,
  toolsSkills,
  certifications,
} from '@/data/skills.js'
import { useScrollTrigger } from '@/composables/useScrollTrigger.js'

const skillsSection = ref(null)
const animatedSkills = ref({})

const iconComponents = {
  Cloud,
  Code,
  Monitor,
  Database,
  Settings,
}

const skillCategories = [
  cloudSkills,
  frontendSkills,
  backendSkills,
  databaseSkills,
  toolsSkills,
]

const getBarColor = (color) => {
  const colors = {
    blue: 'bar-cloud',       // Cloud skills - forest green
    purple: 'bar-frontend',  // Frontend - teal
    emerald: 'bar-backend',  // Backend - dark slate
    orange: 'bar-data',      // Data - warm gold
    amber: 'bar-tools',      // Tools - rich brown
  }
  return colors[color] || 'bar-cloud'
}

const animateSkills = () => {
  const skills = [
    ...cloudSkills.skills,
    ...backendSkills.skills,
    ...frontendSkills.skills,
    ...databaseSkills.skills,
    ...toolsSkills.skills,
  ]

  skills.forEach((skill, index) => {
    const startTime = Date.now() + index * 50
    const duration = 1200

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (elapsed < 0) {
        requestAnimationFrame(animate)
        return
      }

      const easedProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

      animatedSkills.value[skill.name] = Math.floor(skill.level * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  })
}

useScrollTrigger(
  skillsSection,
  () => setTimeout(() => animateSkills(), 200),
  { threshold: 0.2 }
)
</script>

<style scoped>
/* Distinct colors per skill category for visual differentiation */
.bar-cloud {
  background: #154212;
}

.bar-frontend {
  background: #1a6b5a;
}

.bar-backend {
  background: #2d3c3b;
}

.bar-data {
  background: #745b18;
}

.bar-tools {
  background: #5c4d1e;
}
</style>
