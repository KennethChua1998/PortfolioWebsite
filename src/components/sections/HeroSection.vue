<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center pt-34 pb-22 bg-surface overflow-hidden"
  >
    <div class="section-container w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Column: Headline -->
        <div>
          <p
            class="editorial-label mb-6 text-secondary hero-anim"
            :class="{ 'hero-visible': isLoaded }"
            style="transition-delay: 0.1s"
          >
            Google Cloud Specialist
          </p>
          <h1
            class="font-serif text-display-lg md:text-[4.5rem] font-bold text-on-surface leading-tight mb-8 hero-anim"
            :class="{ 'hero-visible': isLoaded }"
            style="transition-delay: 0.25s"
          >
            <span class="sr-only">{{ heroData.name }}: </span>{{ heroData.headline }}<br />
            <span class="italic text-gold">{{ heroData.headlineAccent }}</span>
          </h1>
          <p
            class="font-sans text-body-lg text-on-surface/70 max-w-lg mb-10 hero-anim"
            :class="{ 'hero-visible': isLoaded }"
            style="transition-delay: 0.45s"
          >
            {{ heroData.subtitle }}
          </p>
          <div
            class="flex flex-wrap gap-4 hero-anim"
            :class="{ 'hero-visible': isLoaded }"
            style="transition-delay: 0.6s"
          >
            <a href="#projects" class="btn-primary" @click.prevent="smoothScroll('#projects')">
              {{ heroData.buttons.projects }}
            </a>
            <a href="#contact" class="btn-secondary" @click.prevent="smoothScroll('#contact')">
              {{ heroData.buttons.contact }}
            </a>
          </div>
        </div>

        <!-- Right Column: Clean Profile Photo -->
        <div
          class="flex justify-center lg:justify-end hero-anim"
          :class="{ 'hero-visible': isLoaded }"
          style="transition-delay: 0.4s"
        >
          <div class="w-72 md:w-96 aspect-[7/6] rounded-lg overflow-hidden shadow-tincture-lg">
            <img
              src="/profile_pic.webp"
              :alt="heroData.name"
              class="profile-img w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { heroData } from '@/data/hero.js'
import { smoothScroll } from '@/utils/scroll.js'

const isLoaded = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})
</script>

<style scoped>
.hero-anim {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1),
              transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hero-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Warm editorial tone, slightly lifted contrast — consistent with project cards */
.profile-img {
  filter: contrast(0.92) brightness(1.04) saturate(0.85) sepia(0.08);
}
</style>
