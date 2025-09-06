import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)
  const primaryColor = ref('#3b82f6')
  const accentColor = ref('#10b981')

  const theme = computed(() => ({
    isDark: isDark.value,
    primaryColor: primaryColor.value,
    accentColor: accentColor.value,
  }))

  const initTheme = () => {
    // Initialize dark theme (can be expanded for theme persistence)
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme)
      isDark.value = parsed.isDark
      primaryColor.value = parsed.primaryColor
      accentColor.value = parsed.accentColor
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    saveTheme()
  }

  const updateColors = (primary, accent) => {
    primaryColor.value = primary
    accentColor.value = accent
    saveTheme()
  }

  const saveTheme = () => {
    localStorage.setItem(
      'portfolio-theme',
      JSON.stringify({
        isDark: isDark.value,
        primaryColor: primaryColor.value,
        accentColor: accentColor.value,
      })
    )
  }

  return {
    isDark,
    primaryColor,
    accentColor,
    theme,
    initTheme,
    toggleTheme,
    updateColors,
  }
})
