<template>
  <section id="skills" class="py-20 glass-section relative overflow-hidden" ref="skillsSection">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-emerald-400">
          Core Skills & Technologies
        </h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Cloud & DevOps -->
          <div class="skill-category">
            <div class="flex items-center mb-4">
              <Cloud :size="24" class="text-blue-400 mr-3" />
              <h3 class="text-xl font-semibold text-white">Cloud & DevOps</h3>
            </div>
            <div class="space-y-3">
              <div v-for="skill in cloudSkills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span :class="getSkillColor(skill.level, 'cloud').text">{{ animatedSkills[skill.name] || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    :class="`bg-gradient-to-r ${getSkillColor(skill.level, 'cloud').bg} h-2 rounded-full transition-all duration-1000`"
                    :style="{ width: (animatedSkills[skill.name] || 0) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Programming -->
          <div class="skill-category">
            <div class="flex items-center mb-4">
              <Code :size="24" class="text-emerald-400 mr-3" />
              <h3 class="text-xl font-semibold text-white">Programming</h3>
            </div>
            <div class="space-y-3">
              <div v-for="skill in programmingSkills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span :class="getSkillColor(skill.level, 'programming').text">{{ animatedSkills[skill.name] || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    :class="`bg-gradient-to-r ${getSkillColor(skill.level, 'programming').bg} h-2 rounded-full transition-all duration-1000`"
                    :style="{ width: (animatedSkills[skill.name] || 0) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Frontend -->
          <div class="skill-category">
            <div class="flex items-center mb-4">
              <Monitor :size="24" class="text-purple-400 mr-3" />
              <h3 class="text-xl font-semibold text-white">Frontend</h3>
            </div>
            <div class="space-y-3">
              <div v-for="skill in frontendSkills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span :class="getSkillColor(skill.level, 'frontend').text">{{ animatedSkills[skill.name] || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    :class="`bg-gradient-to-r ${getSkillColor(skill.level, 'frontend').bg} h-2 rounded-full transition-all duration-1000`"
                    :style="{ width: (animatedSkills[skill.name] || 0) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tools & Workflow -->
          <div class="skill-category">
            <div class="flex items-center mb-4">
              <Settings :size="24" class="text-amber-400 mr-3" />
              <h3 class="text-xl font-semibold text-white">Tools & Workflow</h3>
            </div>
            <div class="space-y-3">
              <div v-for="skill in toolsSkills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span :class="getSkillColor(skill.level, 'tools').text">{{ animatedSkills[skill.name] || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    :class="`bg-gradient-to-r ${getSkillColor(skill.level, 'tools').bg} h-2 rounded-full transition-all duration-1000`"
                    :style="{ width: (animatedSkills[skill.name] || 0) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div class="mt-16">
          <h3 class="text-2xl font-bold text-center mb-8 text-white">Certifications</h3>
          <div class="flex flex-wrap justify-center gap-6">
            <div class="certification-badge">
              <Award :size="20" class="text-emerald-400 mr-2" />
              <span class="text-white font-semibold">Google Cloud Professional Developer</span>
              <span class="text-gray-400 text-sm ml-2">(2023-2025)</span>
            </div>
            <div class="certification-badge">
              <Award :size="20" class="text-emerald-400 mr-2" />
              <span class="text-white font-semibold">Technical Expert Badge - Build with Vertex AI</span>
              <span class="text-gray-400 text-sm ml-2">(2025-2026)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Cloud, Code, Monitor, Settings, Award } from 'lucide-vue-next'

const skillsSection = ref(null)
const animatedSkills = ref({})
const isVisible = ref(false)

// Different color schemes for each category
const getSkillColor = (level, category) => {
  const colorSchemes = {
    cloud: {
      90: { text: 'text-blue-300', bg: 'from-blue-400 to-cyan-400' },
      85: { text: 'text-blue-400', bg: 'from-blue-500 to-cyan-500' },
      80: { text: 'text-cyan-400', bg: 'from-blue-600 to-cyan-600' },
      75: { text: 'text-cyan-500', bg: 'from-cyan-600 to-blue-700' },
      default: { text: 'text-cyan-600', bg: 'from-cyan-700 to-blue-800' }
    },
    programming: {
      90: { text: 'text-emerald-300', bg: 'from-emerald-400 to-green-400' },
      85: { text: 'text-emerald-400', bg: 'from-emerald-500 to-green-500' },
      80: { text: 'text-green-400', bg: 'from-emerald-600 to-green-600' },
      75: { text: 'text-green-500', bg: 'from-green-600 to-emerald-700' },
      default: { text: 'text-green-600', bg: 'from-green-700 to-emerald-800' }
    },
    frontend: {
      90: { text: 'text-purple-300', bg: 'from-purple-400 to-pink-400' },
      85: { text: 'text-purple-400', bg: 'from-purple-500 to-pink-500' },
      80: { text: 'text-pink-400', bg: 'from-purple-600 to-pink-600' },
      75: { text: 'text-pink-500', bg: 'from-pink-600 to-purple-700' },
      default: { text: 'text-pink-600', bg: 'from-pink-700 to-purple-800' }
    },
    tools: {
      90: { text: 'text-amber-300', bg: 'from-amber-400 to-orange-400' },
      85: { text: 'text-amber-400', bg: 'from-amber-500 to-orange-500' },
      80: { text: 'text-orange-400', bg: 'from-amber-600 to-orange-600' },
      75: { text: 'text-orange-500', bg: 'from-orange-600 to-amber-700' },
      default: { text: 'text-orange-600', bg: 'from-orange-700 to-amber-800' }
    }
  }
  
  const scheme = colorSchemes[category] || colorSchemes.programming
  if (level >= 90) return scheme[90]
  if (level >= 85) return scheme[85]
  if (level >= 80) return scheme[80]
  if (level >= 75) return scheme[75]
  return scheme.default
}

// Animate skill percentages on scroll
const animateSkills = () => {
  const skills = [...cloudSkills, ...programmingSkills, ...frontendSkills, ...toolsSkills]
  
  skills.forEach((skill, index) => {
    const startTime = Date.now() + (index * 50) // Faster stagger - 50ms instead of 100ms
    const duration = 1200 // Faster - 1.2 seconds instead of 2
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      if (elapsed < 0) {
        requestAnimationFrame(animate)
        return
      }
      
      // Smoother easing function - elastic ease-out
      const easedProgress = progress < 0.5 
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
    (entries) => {
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

const cloudSkills = [
  { name: 'Google Cloud Platform', level: 90 },
  { name: 'Containerization', level: 85 },
  { name: 'CI/CD DevOps', level: 80 },
  { name: 'Application Modernization', level: 85 }
]

const programmingSkills = [
  { name: 'JavaScript', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'Java', level: 75 },
  { name: 'REST APIs', level: 90 }
]

const frontendSkills = [
  { name: 'Vue.js 3', level: 85 },
  { name: 'HTML5/CSS3', level: 90 },
  { name: 'Responsive Design', level: 85 },
  { name: 'Three.js', level: 70 }
]

const toolsSkills = [
  { name: 'Git', level: 90 },
  { name: 'Jira', level: 85 },
  { name: 'Agile Development', level: 80 },
  { name: 'Database Design', level: 75 }
]
</script>

<style scoped>
.skill-category {
  @apply p-6 rounded-xl relative z-10;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 51, 234, 0.05) 50%,
    rgba(15, 23, 42, 0.1) 100%);
  backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.15),
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
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.4), 
    transparent);
}

.skill-category::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%,
    rgba(59, 130, 246, 0.05) 100%);
  pointer-events: none;
  border-radius: inherit;
}

.skill-category:hover {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.15) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(15, 23, 42, 0.15) 100%);
  backdrop-filter: blur(35px) saturate(220%);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 
    0 20px 60px rgba(59, 130, 246, 0.25),
    0 12px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.skill-item {
  @apply mb-4 last:mb-0;
}

.certification-badge {
  @apply flex items-center px-6 py-3 rounded-full border-0;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 51, 234, 0.05) 50%,
    rgba(15, 23, 42, 0.1) 100%);
  backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.certification-badge:hover {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.15) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(15, 23, 42, 0.15) 100%);
  backdrop-filter: blur(35px) saturate(220%);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}
</style>