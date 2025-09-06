<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-75 translate-y-4"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-75 translate-y-4"
  >
    <button
      v-if="showBackToTop"
      class="fixed bottom-8 right-8 z-50 glass-card p-4 rounded-full text-white hover:text-gray-200 transition-all duration-300 group"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <ChevronUp
        :size="24"
        class="transform group-hover:scale-110 transition-transform duration-300"
      />
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronUp } from 'lucide-vue-next'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 600
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
button:hover {
  transform: translateY(-2px) scale(1.05);
}

button:active {
  transform: translateY(0) scale(0.95);
}
</style>
