<template>
  <section
    id="skills"
    ref="skillsSection"
    class="py-20 glass-section relative overflow-hidden"
  >
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-emerald-400">
          Core Skills & Technologies
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div
            v-for="skillCategory in skillCategories"
            :key="skillCategory.title"
            class="skill-category"
          >
            <div class="flex items-center mb-4">
              <component
                :is="iconComponents[skillCategory.icon]"
                :size="24"
                :class="getIconColor(skillCategory.color)"
              />
              <h3 class="text-xl font-semibold text-white ml-3">
                {{ skillCategory.title }}
              </h3>
            </div>
            <div class="space-y-3">
              <div
                v-for="skill in skillCategory.skills"
                :key="skill.name"
                class="skill-item"
              >
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span
                    :class="
                      getSkillColor(skill.level, skillCategory.color).text
                    "
                    >{{ animatedSkills[skill.name] || 0 }}%</span
                  >
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div
                    :class="`bg-gradient-to-r ${getSkillColor(skill.level, skillCategory.color).bg} h-2 rounded-full transition-all duration-1000`"
                    :style="{ width: (animatedSkills[skill.name] || 0) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div class="mt-16">
          <h3 class="text-4xl font-bold text-center mb-8 text-emerald-400">
            Certifications
          </h3>
          <div class="flex flex-wrap justify-center gap-6">
            <div
              v-for="cert in certifications"
              :key="cert.name"
              class="certification-badge"
            >
              <Award :size="20" class="text-emerald-400 mr-2" />
              <span class="text-white font-semibold">{{ cert.name }}</span>
              <span class="text-gray-400 text-sm ml-2">{{ cert.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

const skillsSection = ref(null)
const animatedSkills = ref({})
const isVisible = ref(false)

// Icon component mapping
const iconComponents = {
  Cloud,
  Code,
  Monitor,
  Database,
  Settings,
}

// Combine all skill categories for easy iteration
const skillCategories = [
  cloudSkills,
  frontendSkills,
  backendSkills,
  databaseSkills,
  toolsSkills,
]

// Different color schemes for each category
const getSkillColor = (level, color) => {
  const colorSchemes = {
    blue: {
      90: { text: 'text-blue-300', bg: 'from-blue-400 to-cyan-400' },
      85: { text: 'text-blue-400', bg: 'from-blue-500 to-cyan-500' },
      80: { text: 'text-cyan-400', bg: 'from-blue-600 to-cyan-600' },
      75: { text: 'text-cyan-500', bg: 'from-cyan-600 to-blue-700' },
      default: { text: 'text-cyan-600', bg: 'from-cyan-700 to-blue-800' },
    },
    emerald: {
      90: { text: 'text-emerald-300', bg: 'from-emerald-400 to-green-400' },
      85: { text: 'text-emerald-400', bg: 'from-emerald-500 to-green-500' },
      80: { text: 'text-green-400', bg: 'from-emerald-600 to-green-600' },
      75: { text: 'text-green-500', bg: 'from-green-600 to-emerald-700' },
      default: { text: 'text-green-600', bg: 'from-green-700 to-emerald-800' },
    },
    purple: {
      90: { text: 'text-purple-300', bg: 'from-purple-400 to-pink-400' },
      85: { text: 'text-purple-400', bg: 'from-purple-500 to-pink-500' },
      80: { text: 'text-pink-400', bg: 'from-purple-600 to-pink-600' },
      75: { text: 'text-pink-500', bg: 'from-pink-600 to-purple-700' },
      default: { text: 'text-pink-600', bg: 'from-pink-700 to-purple-800' },
    },
    orange: {
      90: { text: 'text-orange-300', bg: 'from-orange-400 to-red-400' },
      85: { text: 'text-orange-400', bg: 'from-orange-500 to-red-500' },
      80: { text: 'text-red-400', bg: 'from-orange-600 to-red-600' },
      75: { text: 'text-red-500', bg: 'from-red-600 to-orange-700' },
      default: { text: 'text-red-600', bg: 'from-red-700 to-orange-800' },
    },
    amber: {
      90: { text: 'text-amber-300', bg: 'from-amber-400 to-yellow-400' },
      85: { text: 'text-amber-400', bg: 'from-amber-500 to-yellow-500' },
      80: { text: 'text-yellow-400', bg: 'from-amber-600 to-yellow-600' },
      75: { text: 'text-yellow-500', bg: 'from-yellow-600 to-amber-700' },
      default: { text: 'text-yellow-600', bg: 'from-yellow-700 to-amber-800' },
    },
  }

  const scheme = colorSchemes[color] || colorSchemes.emerald
  if (level >= 90) return scheme[90]
  if (level >= 85) return scheme[85]
  if (level >= 80) return scheme[80]
  if (level >= 75) return scheme[75]
  return scheme.default
}

// Get icon color based on color scheme
const getIconColor = color => {
  const iconColors = {
    blue: 'text-blue-400 mr-3',
    emerald: 'text-emerald-400 mr-3',
    purple: 'text-purple-400 mr-3',
    orange: 'text-orange-400 mr-3',
    amber: 'text-amber-400 mr-3',
  }
  return iconColors[color] || 'text-emerald-400 mr-3'
}

// Animate skill percentages on scroll
const animateSkills = () => {
  const skills = [
    ...cloudSkills.skills,
    ...backendSkills.skills,
    ...frontendSkills.skills,
    ...databaseSkills.skills,
    ...toolsSkills.skills,
  ]

  skills.forEach((skill, index) => {
    const startTime = Date.now() + index * 50 // Faster stagger - 50ms instead of 100ms
    const duration = 1200 // Faster - 1.2 seconds instead of 2

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (elapsed < 0) {
        requestAnimationFrame(animate)
        return
      }

      // Smoother easing function - elastic ease-out
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

// Intersection Observer for scroll trigger
const setupScrollTrigger = () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          setTimeout(() => animateSkills(), 200)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (skillsSection.value) {
    observer.observe(skillsSection.value)
  }
}

onMounted(() => {
  setupScrollTrigger()
})
</script>

<style scoped>
.skill-category {
  @apply p-6 rounded-xl relative z-10;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(15, 23, 42, 0.1) 100%
  );
  backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-category::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
}

.skill-category::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  pointer-events: none;
  border-radius: inherit;
}

.skill-category:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(15, 23, 42, 0.15) 100%
  );
  backdrop-filter: blur(35px) saturate(220%);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow:
    0 20px 60px rgba(255, 255, 255, 0.15),
    0 12px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.skill-item {
  @apply mb-4 last:mb-0;
}

.certification-badge {
  @apply flex items-center px-6 py-3 rounded-full border-0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(15, 23, 42, 0.1) 100%
  );
  backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.certification-badge:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(15, 23, 42, 0.15) 100%
  );
  backdrop-filter: blur(35px) saturate(220%);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
</style>
