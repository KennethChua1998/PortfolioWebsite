<template>
  <section id="skills" class="py-20 glass-section relative overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-emerald-400">
          Core Skills & Technologies
        </h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Cloud & DevOps -->
          <div class="skill-category">
            <div class="flex items-center mb-4">
              <Cloud :size="24" class="text-emerald-400 mr-3" />
              <h3 class="text-xl font-semibold text-white">Cloud & DevOps</h3>
            </div>
            <div class="space-y-3">
              <div v-for="skill in cloudSkills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span class="text-emerald-400">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-1000"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Programming -->
          <div class="skill-category">
            <div class="flex items-center mb-4">
              <Code :size="24" class="text-green-400 mr-3" />
              <h3 class="text-xl font-semibold text-white">Programming</h3>
            </div>
            <div class="space-y-3">
              <div v-for="skill in programmingSkills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span class="text-green-400">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Frontend -->
          <div class="skill-category">
            <div class="flex items-center mb-4">
              <Monitor :size="24" class="text-emerald-400 mr-3" />
              <h3 class="text-xl font-semibold text-white">Frontend</h3>
            </div>
            <div class="space-y-3">
              <div v-for="skill in frontendSkills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span class="text-emerald-400">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-emerald-600 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tools & Workflow -->
          <div class="skill-category">
            <div class="flex items-center mb-4">
              <Settings :size="24" class="text-orange-400 mr-3" />
              <h3 class="text-xl font-semibold text-white">Tools & Workflow</h3>
            </div>
            <div class="space-y-3">
              <div v-for="skill in toolsSkills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span class="text-orange-400">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                    :style="{ width: skill.level + '%' }"
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
import { Cloud, Code, Monitor, Settings, Award } from 'lucide-vue-next'

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