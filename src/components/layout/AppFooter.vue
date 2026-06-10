<template>
  <footer class="bg-surface-container-high py-12">
    <div class="section-container">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <div class="font-serif text-title-lg font-semibold text-on-surface mb-1">
            Bibliotheca Archive
          </div>
          <p class="font-sans text-body-md text-on-surface/50">
            Curated by {{ footerData.name }} &mdash; {{ footerData.title }}
          </p>
        </div>

        <div class="flex items-center space-x-6">
          <a
            :href="footerData.contactInfo.github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            class="text-on-surface/40 hover:text-primary transition-colors"
          >
            <Github :size="18" />
          </a>

          <a
            :href="footerData.contactInfo.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            class="text-on-surface/40 hover:text-primary transition-colors"
          >
            <Linkedin :size="18" />
          </a>

          <a
            :href="`mailto:${footerData.contactInfo.email}`"
            aria-label="Send email"
            class="text-on-surface/40 hover:text-primary transition-colors"
          >
            <Mail :size="18" />
          </a>
        </div>
      </div>

      <div class="mt-8 pt-8 text-center space-y-2" style="border-top: 1px solid rgba(194, 201, 187, 0.2);">
        <p class="font-sans text-body-md text-on-surface/40">
          &copy; {{ currentYear }} {{ footerData.name }}.
          {{ footerData.copyright }}.
        </p>
        <VisitCounter />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import { footerData } from '@/data/footer.js'
import VisitCounter from '@/components/ui/VisitCounter.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
