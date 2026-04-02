<template>
  <div class="group tonal-card overflow-hidden card-grid h-full">
    <!-- Row 1: Project Image -->
    <div class="relative h-52 overflow-hidden">
      <img
        v-if="project.imageUrl"
        :src="project.imageUrl"
        :alt="project.title"
        class="project-img absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        @error="handleImageError"
      />
      <div v-if="project.imageUrl" class="project-img-overlay absolute inset-0 pointer-events-none transition-opacity duration-500"></div>
      <div
        v-else-if="project.confidential"
        class="w-full h-full flex items-center justify-center bg-neutral-800/60"
      >
        <div class="flex flex-col items-center space-y-3">
          <div class="p-4 rounded bg-neutral-700/50">
            <ShieldAlert :size="32" class="text-neutral-400" />
          </div>
          <p class="font-sans text-body-md text-neutral-400 uppercase tracking-widest">Confidential</p>
        </div>
      </div>
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-surface-container-high"
      >
        <div class="flex flex-col items-center space-y-3">
          <div class="p-4 rounded bg-surface-container">
            <Code :size="32" class="text-on-surface/30" />
          </div>
          <p class="font-sans text-body-md text-on-surface/40">Project Preview</p>
        </div>
      </div>
    </div>

    <!-- Row 2: Title -->
    <h3 class="px-6 pt-5 font-serif text-title-lg font-semibold text-on-surface self-start">
      {{ project.title }}
    </h3>

    <!-- Row 3: Description -->
    <p class="px-6 pt-2 font-sans text-body-md text-on-surface/70 leading-relaxed self-start">
      {{ project.description }}
    </p>

    <!-- Row 4: Spacer (1fr — absorbs remaining space) -->
    <div class="spacer"></div>

    <!-- Row 5: Meta (year, status) -->
    <div class="px-6 pt-3 flex items-center flex-wrap gap-x-2 gap-y-1 font-sans text-label-md text-on-surface/50 uppercase tracking-widest self-end">
      <span v-if="project.year">{{ project.year }}</span>
      <span v-if="project.year && project.status" class="text-on-surface/30">&middot;</span>
      <span v-if="project.status">{{ project.status }}</span>
      <span v-if="project.aiAssisted && (project.year || project.status)" class="text-on-surface/30">&middot;</span>
      <span v-if="project.aiAssisted" class="text-primary/70">{{ project.aiLabel || 'AI-Assisted' }}</span>
    </div>

    <!-- Row 6: Chips -->
    <div class="px-6 pt-2 flex flex-wrap gap-2 content-start self-start">
      <span
        v-for="tech in project.technologies"
        :key="tech"
        class="chip text-xs"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Row 7: Links -->
    <div class="px-6 pb-5 pt-3 flex gap-4 self-end border-t border-outline-variant/15 mx-6">
      <a
        v-if="project.githubUrl"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-tertiary text-xs"
      >
        <Github :size="14" class="inline mr-1" />
        View Code
      </a>

      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-tertiary text-xs"
      >
        <ExternalLink :size="14" class="inline mr-1" />
        Live Demo
      </a>

      <a
        v-if="project.slidesUrl"
        :href="project.slidesUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-tertiary text-xs"
      >
        <Presentation :size="14" class="inline mr-1" />
        Slides
      </a>

      <span
        v-if="!project.githubUrl && !project.liveUrl && !project.slidesUrl"
        class="font-sans text-body-md text-on-surface/40 italic"
      >
        Confidential Project
      </span>
    </div>
  </div>
</template>

<script setup>
import { Code, Github, ExternalLink, Presentation, ShieldAlert } from 'lucide-vue-next'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const handleImageError = event => {
  event.target.style.display = 'none'
}
</script>

<style scoped>
/* Grid layout: each card row aligns via subgrid in parent */
.card-grid {
  display: grid;
  grid-row: span 7;
  grid-template-rows: subgrid;
}
.spacer {
  /* 1fr row absorbs remaining space — keeps description tight to title */
}

/* Warm desaturated filter for consistent image tone */
.project-img {
  filter: saturate(0.6) brightness(0.9) sepia(0.15);
}
.project-img-overlay {
  background: linear-gradient(
    to bottom,
    rgba(40, 35, 25, 0.12) 0%,
    rgba(40, 35, 25, 0.25) 100%
  );
  opacity: 1;
}
/* Lift filter on hover to reveal original */
.group:hover .project-img {
  filter: saturate(1) brightness(1) sepia(0);
}
.group:hover .project-img-overlay {
  opacity: 0;
}
</style>
