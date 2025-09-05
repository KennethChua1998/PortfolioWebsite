<template>
  <div class="group project-card rounded-xl overflow-hidden relative z-10 flex flex-col h-full">
    <!-- Project Image -->
    <div class="relative h-48 overflow-hidden flex-shrink-0 rounded-t-xl">
      <img 
        v-if="project.imageUrl" 
        :src="project.imageUrl" 
        :alt="project.title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        @error="handleImageError"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <div class="flex flex-col items-center space-y-3">
          <div class="p-4 rounded-full bg-gray-700/50 backdrop-blur-sm">
            <Code :size="32" class="text-gray-400" />
          </div>
          <p class="text-gray-400 text-sm font-medium">Project Preview</p>
        </div>
      </div>
      
      <!-- Subtle overlay only on hover -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      
      <!-- Tags appear only on hover -->
      <div class="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="flex flex-wrap gap-2 items-center">
          <span v-if="project.status" class="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
            {{ project.status }}
          </span>
          <span v-if="project.year" class="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
            {{ project.year }}
          </span>
          <span v-if="project.aiAssisted" class="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
            AI-Assisted
          </span>
        </div>
      </div>
    </div>
    
    <!-- Project Content -->
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold text-white mb-3">
        {{ project.title }}
      </h3>
      
      <p class="text-gray-300 mb-4 text-sm leading-relaxed flex-grow text-justify">
        {{ project.description }}
      </p>
      
      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-3 py-1 skill-pill text-emerald-300 text-xs rounded-full"
        >
          {{ tech }}
        </span>
      </div>
      
      <!-- Links -->
      <div class="flex gap-3 mt-auto">
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200"
        >
          <Github :size="16" />
          <span class="text-sm">Code</span>
        </a>
        
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200"
        >
          <ExternalLink :size="16" />
          <span class="text-sm">Live Demo</span>
        </a>
        
        <span 
          v-if="!project.githubUrl && !project.liveUrl"
          class="text-gray-500 text-sm italic"
        >
          Confidential Project
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Code, Github, ExternalLink } from 'lucide-vue-next'

defineProps({
  project: {
    type: Object,
    required: true
  }
})

const handleImageError = (event) => {
  console.warn('Failed to load project image:', event.target.src)
  // Hide the image element on error
  event.target.style.display = 'none'
}
</script>

<style scoped>
.project-card {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 51, 234, 0.05) 50%,
    rgba(15, 23, 42, 0.1) 100%);
  backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.4), 
    transparent);
}

.project-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%,
    rgba(59, 130, 246, 0.05) 100%);
  pointer-events: none;
  border-radius: inherit;
}

.project-card:hover {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.15) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(15, 23, 42, 0.15) 100%);
  backdrop-filter: blur(35px) saturate(220%);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 
    0 20px 60px rgba(59, 130, 246, 0.25),
    0 12px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.glass {
  background: rgba(15, 23, 42, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.skill-pill {
  background: rgba(15, 23, 42, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-pill:hover {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.15) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(15, 23, 42, 0.15) 100%);
  backdrop-filter: blur(35px) saturate(220%);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}
</style>