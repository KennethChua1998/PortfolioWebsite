<template>
  <header class="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/15">
    <nav class="section-container py-4">
      <div class="flex items-center justify-between">
        <!-- Brand -->
        <a
          href="#hero"
          class="font-serif text-lg font-semibold text-on-surface hover:text-primary transition-colors duration-300"
          @click.prevent="scrollToTop()"
        >
          Bibliotheca Archive
        </a>

        <!-- Desktop Nav -->
        <ul class="hidden md:flex items-center space-x-1">
          <li v-for="item in navItems" :key="item.label" class="relative">
            <a
              :href="item.href"
              class="px-4 py-2 font-sans text-body-md transition-colors duration-300"
              :class="activeSection === item.href ? 'text-primary font-medium' : 'text-on-surface/70 hover:text-primary'"
              @click.prevent="smoothScroll(item.href)"
            >
              {{ item.label }}
            </a>
            <span
              v-if="activeSection === item.href"
              class="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full transition-all duration-300"
            ></span>
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-on-surface/70 hover:text-primary transition-colors duration-300"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          @click="toggleMobileMenu"
        >
          <component :is="isMobileMenuOpen ? X : MenuIcon" :size="24" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition name="menu-slide">
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4">
          <ul class="space-y-1">
            <li v-for="item in navItems" :key="item.label">
              <a
                :href="item.href"
                class="block px-4 py-3 font-sans text-body-md rounded transition-all duration-300"
                :class="activeSection === item.href ? 'text-primary bg-primary/5 font-medium' : 'text-on-surface/70 hover:text-primary hover:bg-surface-container-low'"
                @click="closeMobileMenu"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu as MenuIcon, X } from 'lucide-vue-next'
import { smoothScroll, scrollToTop } from '@/utils/scroll.js'

const isMobileMenuOpen = ref(false)
const activeSection = ref('')

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

// Scroll-spy to highlight active nav item
const sectionIds = navItems.map(item => item.href)

const updateActiveSection = () => {
  const scrollY = window.scrollY + 120

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const section = document.querySelector(sectionIds[i])
    if (section && section.offsetTop <= scrollY) {
      activeSection.value = sectionIds[i]
      return
    }
  }
  activeSection.value = ''
}

let scrollHandler = null

onMounted(() => {
  scrollHandler = () => requestAnimationFrame(updateActiveSection)
  window.addEventListener('scroll', scrollHandler, { passive: true })
  updateActiveSection()
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

</script>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
