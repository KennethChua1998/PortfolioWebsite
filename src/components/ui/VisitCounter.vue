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

const read = async url => {
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return typeof data.count === 'number' ? data.count : null
}

onMounted(async () => {
  try {
    // Count each browser session once; reloads and dev mode only read.
    // The plain read 400s if the counter doesn't exist yet, so fall back
    // to /up (which creates-and-reads) before giving up.
    const shouldIncrement = !import.meta.env.DEV && !sessionStorage.getItem(SESSION_KEY)
    let value = await read(shouldIncrement ? `${COUNTER_URL}/up` : COUNTER_URL)
    if (value === null && !shouldIncrement) value = await read(`${COUNTER_URL}/up`)
    if (value === null) return
    count.value = value
    if (shouldIncrement) sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // counter is decorative — stay hidden if the API is unreachable
  }
})
</script>
