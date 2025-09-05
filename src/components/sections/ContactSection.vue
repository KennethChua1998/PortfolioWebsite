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
            <!-- Success/Error Message -->
            <div 
              v-if="showMessage" 
              class="mb-6 p-4 rounded-lg transition-all duration-300"
              :class="{
                'bg-green-900/20 border border-green-500/30 text-green-300': messageType === 'success',
                'bg-red-900/20 border border-red-500/30 text-red-300': messageType === 'error'
              }"
            >
              <p class="text-sm">{{ messageText }}</p>
            </div>
            
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
const showMessage = ref(false)
const messageType = ref('') // 'success' or 'error'
const messageText = ref('')

// Form validation
const validateForm = () => {
  const errors = []
  
  if (!form.value.name.trim()) {
    errors.push(contactData.messages.validation.nameRequired)
  }
  
  if (!form.value.email.trim()) {
    errors.push(contactData.messages.validation.emailRequired)
  } else if (!isValidEmail(form.value.email)) {
    errors.push(contactData.messages.validation.emailInvalid)
  }
  
  if (!form.value.message.trim()) {
    errors.push(contactData.messages.validation.messageRequired)
  }
  
  return errors
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const showNotification = (type, text) => {
  messageType.value = type
  messageText.value = text
  showMessage.value = true
  
  // Hide message after 5 seconds
  setTimeout(() => {
    showMessage.value = false
  }, 5000)
}

const handleSubmit = async () => {
  // Validate form
  const errors = validateForm()
  if (errors.length > 0) {
    showNotification('error', errors[0])
    return
  }

  isSubmitting.value = true
  
  try {
    // Prepare form data for Web3Forms
    const formData = new FormData()
    formData.append('access_key', contactData.form.publicKey)
    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    formData.append('message', form.value.message)
    formData.append('from_name', 'Portfolio Contact Form')
    formData.append('subject', `New message from ${form.value.name}`)
    
    // Submit to Web3Forms
    const response = await fetch(contactData.form.apiUrl, {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    
    if (result.success) {
      // Success - reset form and show success message
      form.value = {
        name: '',
        email: '',
        message: ''
      }
      showNotification('success', contactData.messages.success)
    } else {
      throw new Error(result.message || 'Form submission failed')
    }
    
  } catch (error) {
    console.error('Form submission error:', error)
    showNotification('error', contactData.messages.error)
  } finally {
    isSubmitting.value = false
  }
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