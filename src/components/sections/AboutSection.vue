<template>
  <section id="about" class="py-20 glass-section relative overflow-hidden" ref="aboutSection">
    <div class="section-container">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-emerald-400 about-title"
            :class="{ 'animate-in': isVisible }">
          About {{ personalInfo.name }}
        </h2>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <p 
              v-for="(desc, index) in personalInfo.description" 
              :key="index"
              class="text-lg text-gray-200 leading-relaxed about-text"
              :class="{ 'animate-in': animatedElements[`text${index + 1}`] }"
            >
              {{ desc }}
            </p>
            
            <div class="about-glass-card p-8 rounded-xl mt-8 relative z-10 achievements-card"
                 :class="{ 'animate-in': animatedElements.achievements }">
              <h3 class="text-xl font-semibold text-emerald-300 mb-4">Key Achievements</h3>
              <ul class="space-y-2 text-gray-300">
                <li 
                  v-for="(achievement, index) in personalInfo.achievements" 
                  :key="index"
                  class="flex items-start gap-2 achievement-item"
                  :class="{ 'animate-in': animatedElements[`achievement${index + 1}`] }"
                >
                  <span class="text-green-400 mt-1">•</span>
                  {{ achievement }}
                </li>
              </ul>
            </div>
            
            <div class="flex flex-wrap gap-2 skills-container"
                 :class="{ 'animate-in': animatedElements.skills }">
              <span 
                v-for="(skill, index) in personalInfo.skills" 
                :key="skill"
                class="px-4 py-2 skill-pill text-emerald-300 rounded-full text-sm"
                :class="{ 'animate-in': animatedElements[`skill${index}`] }"
                :style="{ animationDelay: `${index * 50}ms` }"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <div class="relative profile-section"
               :class="{ 'animate-in': animatedElements.profile }">
            <div class="w-80 h-80 mx-auto bg-gradient-to-br from-primary-600 to-accent-600 rounded-full opacity-20 blur-3xl"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-64 h-64 bg-dark-800 rounded-full border-2 border-primary-400 flex items-center justify-center">
                <User :size="80" class="text-primary-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { User } from 'lucide-vue-next'
import { personalInfo } from '@/data/personal.js'

const aboutSection = ref(null)
const isVisible = ref(false)
const animatedElements = ref({})

onMounted(() => {
  setupScrollTrigger()
})

const setupScrollTrigger = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          triggerAnimations()
        }
      })
    },
    { threshold: 0.2 }
  )
  
  if (aboutSection.value) {
    observer.observe(aboutSection.value)
  }
}

const triggerAnimations = () => {
  const animations = [
    { key: 'text1', delay: 200 },
    { key: 'text2', delay: 400 },
    { key: 'achievements', delay: 600 },
    { key: 'achievement1', delay: 800 },
    { key: 'achievement2', delay: 900 },
    { key: 'achievement3', delay: 1000 },
    { key: 'achievement4', delay: 1100 },
    { key: 'skills', delay: 1300 },
    { key: 'profile', delay: 1500 }
  ]

  animations.forEach(({ key, delay }) => {
    setTimeout(() => {
      animatedElements.value[key] = true
    }, delay)
  })

  personalInfo.skills.forEach((skill, index) => {
    setTimeout(() => {
      animatedElements.value[`skill${index}`] = true
    }, 1400 + (index * 50))
  })
}
</script>

<style scoped>
.about-glass-card {
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
}

.skill-pill {
  background: rgba(15, 23, 42, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.skill-pill:hover {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.15) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(15, 23, 42, 0.15) 100%);
  backdrop-filter: blur(35px) saturate(220%);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

/* Animation styles */
.about-title {
  opacity: 0;
  transform: translateY(-30px);
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.about-title.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.about-text {
  opacity: 0;
  transform: translateX(-40px);
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.about-text.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.achievements-card {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.achievements-card.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.achievement-item {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.achievement-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.skills-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.skills-container.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.skill-pill.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.profile-section {
  opacity: 0;
  transform: translateX(40px) scale(0.9);
  transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.profile-section.animate-in {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Subtle pulse animation for profile icon */
.profile-section.animate-in .text-primary-400 {
  animation: subtlePulse 3s ease-in-out infinite;
}

@keyframes subtlePulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>