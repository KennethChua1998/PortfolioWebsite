<template>
  <div v-if="enabled" aria-hidden="true">
    <div
      class="cursor-dot"
      :class="{ 'cursor-hidden': !visible, 'cursor-pressed': isPressed }"
      :style="{ transform: `translate3d(${dot.x}px, ${dot.y}px, 0)` }"
    ></div>
    <div
      class="cursor-ring"
      :class="{ 'cursor-hidden': !visible, 'cursor-active': isHovering, 'cursor-pressed': isPressed }"
      :style="{ transform: `translate3d(${ring.x}px, ${ring.y}px, 0)` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'

const enabled = ref(false)
const visible = ref(false)
const isHovering = ref(false)
const isPressed = ref(false)
const dot = reactive({ x: -100, y: -100 })
const ring = reactive({ x: -100, y: -100 })

let rafId = null
let reducedMotion = false

const onMove = e => {
  visible.value = true
  dot.x = e.clientX
  dot.y = e.clientY
  if (reducedMotion) {
    ring.x = e.clientX
    ring.y = e.clientY
  }
  isHovering.value = !!e.target.closest?.(INTERACTIVE)
}

const onLeave = () => (visible.value = false)
const onEnter = () => (visible.value = true)
const onDown = () => (isPressed.value = true)
const onUp = () => (isPressed.value = false)

const trail = () => {
  ring.x += (dot.x - ring.x) * 0.18
  ring.y += (dot.y - ring.y) * 0.18
  rafId = requestAnimationFrame(trail)
}

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return
  enabled.value = true
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.documentElement.classList.add('has-custom-cursor')
  document.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
  document.addEventListener('mousedown', onDown)
  document.addEventListener('mouseup', onUp)
  if (!reducedMotion) rafId = requestAnimationFrame(trail)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  document.documentElement.classList.remove('has-custom-cursor')
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('mouseenter', onEnter)
  document.removeEventListener('mousedown', onDown)
  document.removeEventListener('mouseup', onUp)
})
</script>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  border-radius: 9999px;
  will-change: transform;
}

.cursor-dot {
  width: 7px;
  height: 7px;
  margin: -3.5px 0 0 -3.5px;
  background: #154212;
  transition: opacity 0.25s ease, width 0.2s ease, height 0.2s ease;
}

.cursor-ring {
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border: 1.5px solid rgba(116, 91, 24, 0.55);
  transition: opacity 0.25s ease, width 0.25s ease, height 0.25s ease,
              margin 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.cursor-ring.cursor-active {
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  border-color: rgba(21, 66, 18, 0.5);
  background: rgba(116, 91, 24, 0.08);
}

.cursor-pressed.cursor-ring {
  width: 26px;
  height: 26px;
  margin: -13px 0 0 -13px;
}

.cursor-pressed.cursor-dot {
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
}

.cursor-hidden {
  opacity: 0;
}
</style>
