<template>
  <section
    id="about"
    ref="aboutSection"
    class="py-22 bg-surface-container-low relative overflow-hidden"
  >
    <div class="section-container">
      <!-- Section Label -->
      <p
        class="editorial-label mb-4 text-center"
        :class="{ 'animate-in': isVisible }"
      >
        Professional Dossier
      </p>
      <h2
        class="font-serif text-display-md font-bold text-center text-on-surface mb-16 about-title"
        :class="{ 'animate-in': isVisible }"
      >
        About {{ personalInfo.firstName }}
      </h2>

      <div class="grid lg:grid-cols-5 gap-16 items-start">
        <!-- Left Column: Bio Text (3 cols) -->
        <div class="lg:col-span-3 space-y-8">
          <!-- Professional Bio -->
          <div>
            <h3 class="editorial-label mb-4">Professional Bio</h3>
            <div class="space-y-5">
              <p
                v-for="(desc, index) in personalInfo.description"
                :key="index"
                class="font-sans text-body-lg text-on-surface/80 leading-relaxed about-text"
                :class="{ 'animate-in': animatedElements[`text${index + 1}`] }"
              >
                {{ desc }}
              </p>
            </div>
          </div>

          <!-- Key Achievements -->
          <div
            class="tonal-card p-8 achievements-card"
            :class="{ 'animate-in': animatedElements.achievements }"
          >
            <h3 class="font-serif text-headline-sm font-semibold text-on-surface mb-5">
              Key Achievements
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(achievement, index) in personalInfo.achievements"
                :key="index"
                class="flex items-start gap-3 achievement-item"
                :class="{
                  'animate-in': animatedElements[`achievement${index + 1}`],
                }"
              >
                <span class="text-primary mt-1 font-serif">&bull;</span>
                <span class="font-sans text-body-lg text-on-surface/80">{{ achievement }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Technical Proficiencies (2 cols) -->
        <div class="lg:col-span-2">
          <h3 class="editorial-label mb-4">Technical Proficiencies</h3>
          <div
            class="flex flex-wrap gap-3 skills-container"
            :class="{ 'animate-in': animatedElements.skills }"
          >
            <span
              v-for="(skill, index) in personalInfo.skills"
              :key="skill"
              class="chip skill-chip"
              :class="{ 'animate-in': animatedElements[`skill${index}`] }"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Pull Quote -->
          <blockquote
            class="pull-quote mt-10"
            :class="{ 'animate-in': animatedElements.quote }"
          >
            &ldquo;The archive is not a quiet place of memory, but a vibrant engine for future innovation.&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { personalInfo } from '@/data/personal.js'

const aboutSection = ref(null)
const isVisible = ref(false)
const animatedElements = ref({})

onMounted(() => {
  setupScrollTrigger()
})

const setupScrollTrigger = () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          triggerAnimations()
        }
      })
    },
    { threshold: 0.15 }
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
    { key: 'skills', delay: 1200 },
    { key: 'quote', delay: 1500 },
  ]

  animations.forEach(({ key, delay }) => {
    setTimeout(() => {
      animatedElements.value[key] = true
    }, delay)
  })

  personalInfo.skills.forEach((skill, index) => {
    setTimeout(
      () => {
        animatedElements.value[`skill${index}`] = true
      },
      1300 + index * 60
    )
  })
}
</script>

<style scoped>
.about-title {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.about-title.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.about-text {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.about-text.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.achievements-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.achievements-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.achievement-item {
  opacity: 0;
  transform: translateX(-15px);
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.achievement-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.skills-container {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.skills-container.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.skill-chip {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.skill-chip.animate-in {
  opacity: 1;
  transform: scale(1);
}

.pull-quote {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.pull-quote.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
