<template>
  <div class="min-h-screen bg-surface relative">
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
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
</script>
