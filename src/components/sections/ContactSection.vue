<template>
  <section id="contact" class="py-22 bg-surface relative overflow-hidden">
    <div class="section-container">
      <div class="max-w-4xl mx-auto">
        <!-- Section Label -->
        <p class="editorial-label mb-4 text-center">Correspondence</p>
        <h2 class="font-serif text-display-md font-bold text-center text-on-surface mb-16">
          Initiate Communication
        </h2>

        <div class="grid md:grid-cols-2 gap-16">
          <!-- Contact Info -->
          <div class="space-y-8">
            <div>
              <h3 class="font-serif text-headline-sm font-semibold text-on-surface mb-4">
                {{ contactData.heading }}
              </h3>
              <p class="font-sans text-body-lg text-on-surface/70 leading-relaxed">
                {{ contactData.description }}
              </p>
            </div>

            <div class="space-y-5">
              <div class="flex items-center gap-4">
                <Mail :size="18" class="text-primary" />
                <a
                  :href="`mailto:${contactData.contactInfo.email}`"
                  class="font-sans text-body-lg text-on-surface/80 hover:text-primary transition-colors"
                >
                  {{ contactData.contactInfo.email }}
                </a>
              </div>

              <div class="flex items-center gap-4">
                <Linkedin :size="18" class="text-primary" />
                <a
                  :href="contactData.contactInfo.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-sans text-body-lg text-on-surface/80 hover:text-primary transition-colors"
                >
                  {{ contactData.contactInfo.linkedinDisplay }}
                </a>
              </div>

              <div class="flex items-center gap-4">
                <Github :size="18" class="text-primary" />
                <a
                  :href="contactData.contactInfo.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-sans text-body-lg text-on-surface/80 hover:text-primary transition-colors"
                >
                  {{
                    contactData.contactInfo.github.replace(
                      'https://github.com/',
                      'github.com/'
                    )
                  }}
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="tonal-card p-8">
            <!-- Success/Error Message -->
            <div
              v-if="showMessage"
              class="mb-6 p-4 rounded transition-all duration-300"
              :class="{
                'bg-primary/10 text-primary':
                  messageType === 'success',
                'bg-red-50 text-red-800':
                  messageType === 'error',
              }"
            >
              <p class="font-sans text-body-md">{{ messageText }}</p>
            </div>

            <form class="space-y-6" @submit.prevent="handleSubmit">
              <div>
                <label
                  for="name"
                  class="editorial-label block mb-2"
                >
                  {{ contactData.form.name }}
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="ghost-input"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="editorial-label block mb-2"
                >
                  {{ contactData.form.email }}
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="ghost-input"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  for="message"
                  class="editorial-label block mb-2"
                >
                  {{ contactData.form.message }}
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  required
                  class="ghost-input resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{
                  isSubmitting
                    ? contactData.form.submitting
                    : contactData.form.submit
                }}
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
  message: '',
})

const isSubmitting = ref(false)
const showMessage = ref(false)
const messageType = ref('')
const messageText = ref('')

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

const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const showNotification = (type, text) => {
  messageType.value = type
  messageText.value = text
  showMessage.value = true

  setTimeout(() => {
    showMessage.value = false
  }, 5000)
}

const handleSubmit = async () => {
  const errors = validateForm()
  if (errors.length > 0) {
    showNotification('error', errors[0])
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('access_key', contactData.form.publicKey)
    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    formData.append('message', form.value.message)
    formData.append('from_name', 'Portfolio Contact Form')
    formData.append('subject', `New message from ${form.value.name}`)

    const response = await fetch(contactData.form.apiUrl, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      form.value = { name: '', email: '', message: '' }
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
