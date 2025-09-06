import { ref } from 'vue'
import * as THREE from 'three'

export function useThreeJS() {
  const scene = ref()
  const camera = ref()
  const renderer = ref()
  const particles = ref()
  const animationId = ref()

  const initScene = async canvas => {
    // Scene setup
    scene.value = new THREE.Scene()

    // Camera setup
    camera.value = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.value.position.z = 5

    // Renderer setup
    renderer.value = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.value.setSize(window.innerWidth, window.innerHeight)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Resize handler
    window.addEventListener('resize', onWindowResize)

    // Mouse interaction
    window.addEventListener('mousemove', onMouseMove)
  }

  const onWindowResize = () => {
    if (!camera.value || !renderer.value) return

    camera.value.aspect = window.innerWidth / window.innerHeight
    camera.value.updateProjectionMatrix()
    renderer.value.setSize(window.innerWidth, window.innerHeight)
  }

  const onMouseMove = event => {
    if (!particles.value) return

    const mouseX = (event.clientX / window.innerWidth) * 2 - 1
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

    particles.value.rotation.x = mouseY * 0.1
    particles.value.rotation.y = mouseX * 0.1
  }

  const animateScene = () => {
    if (!renderer.value || !scene.value || !camera.value || !particles.value) {
      return
    }

    // Rotate particles
    particles.value.rotation.x += 0.001
    particles.value.rotation.y += 0.002

    renderer.value.render(scene.value, camera.value)
    animationId.value = requestAnimationFrame(animateScene)
  }

  const disposeScene = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }

    window.removeEventListener('resize', onWindowResize)
    window.removeEventListener('mousemove', onMouseMove)

    if (particles.value) {
      particles.value.geometry.dispose()
      if (particles.value.material instanceof THREE.Material) {
        particles.value.material.dispose()
      }
    }

    if (renderer.value) {
      renderer.value.dispose()
    }
  }

  return {
    initScene,
    animateScene,
    disposeScene,
  }
}
