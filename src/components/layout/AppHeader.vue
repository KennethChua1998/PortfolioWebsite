<template>
  <header class="fixed top-0 w-full z-50 glass-section">
    <nav class="section-container py-4">
      <div class="flex items-center justify-between">
        <a href="#hero" class="flex items-center hover:opacity-80 transition-opacity duration-300" @click="scrollToTop">
          <img src="/favicon.svg?v=1" alt="Website Logo" class="w-8 h-8" />
        </a>

        <ul class="hidden md:flex space-x-2">
          <li v-for="item in navItems" :key="item.label">
            <a
              :href="item.href"
              class="px-4 py-2 rounded-lg text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
              @click="smoothScroll"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <button
          class="md:hidden p-2 rounded-lg text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
          @click="toggleMobileMenu"
        >
          <Menu :size="24" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.label">
            <a
              :href="item.href"
              class="block px-4 py-3 rounded-lg text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const scrollToTop = event => {
  event.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const smoothScroll = event => {
  event.preventDefault()
  const target = event.target
  const element = document.querySelector(target.getAttribute('href'))
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>
