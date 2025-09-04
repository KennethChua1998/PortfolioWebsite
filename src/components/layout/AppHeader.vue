<template>
  <header class="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-gray-800">
    <nav class="section-container py-4">
      <div class="flex items-center justify-between">
        <div class="text-xl font-bold text-emerald-400">
          KC
        </div>
        
        <ul class="hidden md:flex space-x-8">
          <li v-for="item in navItems" :key="item.label">
            <a 
              :href="item.href"
              class="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
              @click="smoothScroll"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
        
        <button 
          @click="toggleMobileMenu"
          class="md:hidden text-gray-300 hover:text-gray-50"
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
              class="block py-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
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

const smoothScroll = (event) => {
  event.preventDefault()
  const target = event.target
  const element = document.querySelector(target.getAttribute('href'))
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>