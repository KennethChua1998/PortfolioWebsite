<template>
  <section id="contact" class="py-20 glass-section relative overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-emerald-400">
          {{ contactData.title }}
        </h2>
        
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-semibold text-white mb-4">
                {{ contactData.heading }}
              </h3>
              <p class="text-gray-300 leading-relaxed">
                {{ contactData.description }}
              </p>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <Mail :size="20" class="text-emerald-400" />
                <a 
                  :href="`mailto:${contactData.contactInfo.email}`"
                  class="text-gray-200 hover:text-emerald-400 transition-colors"
                >
                  {{ contactData.contactInfo.email }}
                </a>
              </div>
              
              <div class="flex items-center gap-4">
                <Linkedin :size="20" class="text-emerald-400" />
                <a 
                  :href="contactData.contactInfo.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-200 hover:text-emerald-400 transition-colors"
                >
                  {{ contactData.contactInfo.linkedinDisplay }}
                </a>
              </div>
              
              <div class="flex items-center gap-4">
                <Github :size="20" class="text-emerald-400" />
                <a 
                  :href="contactData.contactInfo.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-200 hover:text-emerald-400 transition-colors"
                >
                  {{ contactData.contactInfo.github.replace('https://github.com/', 'github.com/') }}
                </a>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="contact-form p-10 rounded-2xl relative z-10">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-200 mb-2">
                  {{ contactData.form.name }}
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 glass-input text-white rounded-lg border-0 focus:outline-none transition-all duration-300"
                >
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-200 mb-2">
                  {{ contactData.form.email }}
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 glass-input text-white rounded-lg border-0 focus:outline-none transition-all duration-300"
                >
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-200 mb-2">
                  {{ contactData.form.message }}
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  required
                  class="w-full px-4 py-3 glass-input text-white rounded-lg border-0 focus:outline-none transition-all duration-300 resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full glass-card px-6 py-3 rounded-lg font-medium text-emerald-400 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? contactData.form.submitting : contactData.form.submit }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Mail, Linkedin, Github } from 'lucide-vue-next'
import { contactData } from '@/data/contact.js'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    message: ''
  }
  
  isSubmitting.value = false
  
  // Show success message (you can implement proper notification)
  alert('Message sent successfully!')
}
</script>

<style scoped>
.contact-form {
  background: linear-gradient(145deg,
    rgba(59, 130, 246, 0.08) 0%,
    rgba(15, 23, 42, 0.1) 50%,
    rgba(147, 51, 234, 0.06) 100%);
  backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 
    0 20px 60px rgba(59, 130, 246, 0.2),
    0 8px 16px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.glass-input {
  background: rgba(15, 23, 42, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-input:focus {
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(40px) saturate(200%);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}
</style>