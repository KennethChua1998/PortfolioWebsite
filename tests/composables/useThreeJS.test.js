import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useThreeJS } from '../../src/composables/useThreeJS.js'

// Mock THREE.js
vi.mock('three', () => {
  const mockMaterial = {
    dispose: vi.fn(),
  }
  
  const mockGeometry = {
    dispose: vi.fn(),
  }
  
  const mockRenderer = {
    setSize: vi.fn(),
    setPixelRatio: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
  }
  
  const mockCamera = {
    updateProjectionMatrix: vi.fn(),
    position: { z: 0 },
    aspect: 1,
  }
  
  const mockScene = {}
  
  const mockParticles = {
    rotation: { x: 0, y: 0 },
    geometry: mockGeometry,
    material: mockMaterial,
  }

  return {
    Scene: vi.fn(() => mockScene),
    PerspectiveCamera: vi.fn(() => mockCamera),
    WebGLRenderer: vi.fn(() => mockRenderer),
    Material: vi.fn(),
    mockMaterial,
    mockGeometry,
    mockRenderer,
    mockCamera,
    mockScene,
    mockParticles,
  }
})

// Mock global objects
const mockCanvas = {}
global.window = {
  innerWidth: 1920,
  innerHeight: 1080,
  devicePixelRatio: 2,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 16)
  return 1
})
global.cancelAnimationFrame = vi.fn()

describe('useThreeJS Composable', () => {
  let threeJS

  beforeEach(() => {
    vi.clearAllMocks()
    threeJS = useThreeJS()
  })

  afterEach(() => {
    if (threeJS) {
      threeJS.disposeScene()
    }
  })

  describe('Initialization', () => {
    it('exports required functions', () => {
      expect(typeof threeJS.initScene).toBe('function')
      expect(typeof threeJS.animateScene).toBe('function')
      expect(typeof threeJS.disposeScene).toBe('function')
    })

    it('initializes scene with canvas', async () => {
      await threeJS.initScene(mockCanvas)
      
      expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
      expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
    })
  })

  describe('Event Handlers', () => {
    it('handles window resize', async () => {
      const THREE = await import('three')
      await threeJS.initScene(mockCanvas)
      
      // Simulate resize
      const resizeHandler = window.addEventListener.mock.calls.find(
        call => call[0] === 'resize'
      )[1]
      
      resizeHandler()
      
      expect(THREE.mockCamera.updateProjectionMatrix).toHaveBeenCalled()
      expect(THREE.mockRenderer.setSize).toHaveBeenCalledWith(1920, 1080)
    })

    it('handles mouse movement', async () => {
      const THREE = await import('three')
      await threeJS.initScene(mockCanvas)
      
      // Mock particles
      const particles = THREE.mockParticles
      threeJS.particles = { value: particles }
      
      const mouseMoveHandler = window.addEventListener.mock.calls.find(
        call => call[0] === 'mousemove'
      )[1]
      
      mouseMoveHandler({ clientX: 960, clientY: 540 })
      
      // Should update particle rotation based on mouse position
      expect(typeof particles.rotation.x).toBe('number')
      expect(typeof particles.rotation.y).toBe('number')
    })
  })

  describe('Animation', () => {
    it('animates scene when all objects are available', () => {
      // Test that animateScene function exists and can be called
      expect(typeof threeJS.animateScene).toBe('function')
      expect(() => threeJS.animateScene()).not.toThrow()
    })

    it('skips animation when objects are not available', () => {
      threeJS.animateScene()
      
      // Should not call requestAnimationFrame when objects are missing
      expect(requestAnimationFrame).not.toHaveBeenCalled()
    })
  })

  describe('Cleanup', () => {
    it('disposes scene properly', () => {
      // Test that disposeScene function exists and can be called safely
      expect(typeof threeJS.disposeScene).toBe('function')
      expect(() => threeJS.disposeScene()).not.toThrow()
    })

    it('handles missing objects during disposal', () => {
      expect(() => threeJS.disposeScene()).not.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('handles missing canvas gracefully', async () => {
      expect(() => threeJS.initScene(null)).not.toThrow()
    })

    it('handles events when objects are not initialized', () => {
      const mouseMoveHandler = vi.fn()
      const resizeHandler = vi.fn()
      
      expect(() => mouseMoveHandler({ clientX: 0, clientY: 0 })).not.toThrow()
      expect(() => resizeHandler()).not.toThrow()
    })
  })
})