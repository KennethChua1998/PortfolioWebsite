<template>
  <div id="app" class="min-h-screen bg-slate-950 relative overflow-hidden">
    <!-- Network Background Animation -->
    <NetworkAnimation />

    <!-- Main Content -->
    <div class="relative z-10">
      <AppHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <AppFooter />
      <BackToTop />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme.js'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import NetworkAnimation from '@/components/webgl/NetworkAnimation.vue'
import BackToTop from '@/components/ui/BackToTop.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>