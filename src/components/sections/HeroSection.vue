<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Three.js Canvas -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
    />
    
    <!-- Hero Content -->
    <div class="relative z-10 section-container text-center">
      <div class="animate-fade-in">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 gradient-text">
          {{ heroData.name }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
          {{ heroData.title }}
        </p>
        <p class="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
          {{ heroData.subtitle }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" class="glass-card px-8 py-4 rounded-xl text-emerald-400 font-semibold hover:text-white transition-all duration-300">
            {{ heroData.buttons.projects }}
          </a>
          <a href="#contact" class="glass-card px-8 py-4 rounded-xl text-gray-300 font-semibold hover:text-emerald-400 transition-all duration-300">
            {{ heroData.buttons.contact }}
          </a>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThreeJS } from '@/composables/useThreeJS.js'
import { heroData } from '@/data/hero.js'

const canvasRef = ref()

const { initScene, animateScene, disposeScene } = useThreeJS()

onMounted(async () => {
  if (canvasRef.value) {
    await initScene(canvasRef.value)
    animateScene()
  }
})

onUnmounted(() => {
  disposeScene()
})
</script>