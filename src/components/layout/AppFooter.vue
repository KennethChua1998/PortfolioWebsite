<template>
  <footer class="bg-gray-900 border-t border-gray-800 py-12">
    <div class="section-container">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <div class="text-2xl font-bold text-emerald-400 mb-2">
            {{ footerData.name }}
          </div>
          <p class="text-gray-400 text-sm">
            {{ footerData.title }}
          </p>
        </div>

        <div class="flex space-x-6">
          <a
            :href="footerData.contactInfo.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <Github :size="20" />
          </a>

          <a
            :href="footerData.contactInfo.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <Linkedin :size="20" />
          </a>

          <a
            :href="`mailto:${footerData.contactInfo.email}`"
            class="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <Mail :size="20" />
          </a>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-800 text-center">
        <p class="text-gray-500 text-sm">
          © {{ currentYear }} {{ footerData.name }}.
          {{ footerData.copyright }}.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import { footerData } from '@/data/footer.js'

const currentYear = computed(() => new Date().getFullYear())
</script>
