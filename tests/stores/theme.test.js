import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useThemeStore } from '../../src/stores/theme.js'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

vi.stubGlobal('localStorage', localStorageMock)

describe('Theme Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  it('initializes with default values', () => {
    const themeStore = useThemeStore()
    
    expect(themeStore.isDark).toBe(true)
    expect(themeStore.primaryColor).toBe('#3b82f6')
    expect(themeStore.accentColor).toBe('#10b981')
  })

  it('computes theme object correctly', () => {
    const themeStore = useThemeStore()
    
    expect(themeStore.theme).toEqual({
      isDark: true,
      primaryColor: '#3b82f6',
      accentColor: '#10b981',
    })
  })

  it('toggles theme correctly', () => {
    const themeStore = useThemeStore()
    
    expect(themeStore.isDark).toBe(true)
    themeStore.toggleTheme()
    expect(themeStore.isDark).toBe(false)
    themeStore.toggleTheme()
    expect(themeStore.isDark).toBe(true)
  })

  it('updates colors correctly', () => {
    const themeStore = useThemeStore()
    
    themeStore.updateColors('#ff0000', '#00ff00')
    
    expect(themeStore.primaryColor).toBe('#ff0000')
    expect(themeStore.accentColor).toBe('#00ff00')
  })

  it('saves theme to localStorage when toggling', () => {
    const themeStore = useThemeStore()
    
    themeStore.toggleTheme()
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'portfolio-theme',
      JSON.stringify({
        isDark: false,
        primaryColor: '#3b82f6',
        accentColor: '#10b981',
      })
    )
  })

  it('saves theme to localStorage when updating colors', () => {
    const themeStore = useThemeStore()
    
    themeStore.updateColors('#123456', '#789abc')
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'portfolio-theme',
      JSON.stringify({
        isDark: true,
        primaryColor: '#123456',
        accentColor: '#789abc',
      })
    )
  })

  it('initializes from localStorage when available', () => {
    const savedTheme = {
      isDark: false,
      primaryColor: '#custom1',
      accentColor: '#custom2',
    }
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedTheme))
    
    const themeStore = useThemeStore()
    themeStore.initTheme()
    
    expect(themeStore.isDark).toBe(false)
    expect(themeStore.primaryColor).toBe('#custom1')
    expect(themeStore.accentColor).toBe('#custom2')
  })

  it('handles invalid localStorage data gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json')
    
    const themeStore = useThemeStore()
    
    expect(() => themeStore.initTheme()).toThrow()
    // Default values should remain unchanged if JSON parsing fails
    expect(themeStore.isDark).toBe(true)
    expect(themeStore.primaryColor).toBe('#3b82f6')
    expect(themeStore.accentColor).toBe('#10b981')
  })

  it('handles missing localStorage gracefully', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const themeStore = useThemeStore()
    themeStore.initTheme()
    
    // Should keep default values when no saved theme exists
    expect(themeStore.isDark).toBe(true)
    expect(themeStore.primaryColor).toBe('#3b82f6')
    expect(themeStore.accentColor).toBe('#10b981')
  })
})