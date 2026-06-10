<template>
  <span
    v-if="count !== null"
    class="font-sans text-label-md uppercase tracking-widest text-on-surface/40"
  >
    {{ footerData.visitsLabel }} &mdash; {{ count.toLocaleString() }}
  </span>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { footerData } from '@/data/footer.js'

const COUNTER_URL = 'https://api.counterapi.dev/v1/kennethchua-com/site-visits'
const SESSION_KEY = 'visit-counted'

const count = ref(null)

onMounted(async () => {
  try {
    // Count each browser session once; reloads and dev mode only read
    const shouldIncrement = !import.meta.env.DEV && !sessionStorage.getItem(SESSION_KEY)
    const res = await fetch(shouldIncrement ? `${COUNTER_URL}/up` : COUNTER_URL)
    if (!res.ok) return
    const data = await res.json()
    if (typeof data.count === 'number') {
      count.value = data.count
      if (shouldIncrement) sessionStorage.setItem(SESSION_KEY, '1')
    }
  } catch {
    // counter is decorative — stay hidden if the API is unreachable
  }
})
</script>
