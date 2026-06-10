import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollTrigger(target, onTrigger, { threshold = 0.15 } = {}) {
  const isVisible = ref(false)
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible.value) {
            isVisible.value = true
            onTrigger?.()
            observer.disconnect()
          }
        })
      },
      { threshold }
    )
    if (target.value) {
      observer.observe(target.value)
    }
  })

  onUnmounted(() => observer?.disconnect())

  return { isVisible }
}
