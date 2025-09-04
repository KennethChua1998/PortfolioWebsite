<template>
  <div ref="container" class="fixed inset-0 z-0" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, animationId
let nodes = []
let connections = []
let nodeGeometry, nodeMaterial
let mousePosition = { x: 0, y: 0 }

const config = {
  nodeCount: 80,
  maxDistance: 120,
  nodeColor: 0x00ff88,
  connectionColor: 0x00cc66,
  nodeSize: 2,
  animationSpeed: 0.5,
  mouseInfluence: 100
}

onMounted(() => {
  initThreeJS()
  createNetwork()
  animate()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onWindowResize)
  
  if (renderer) {
    renderer.dispose()
  }
})

function initThreeJS() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  
  container.value.appendChild(renderer.domElement)
  
  camera.position.z = 300
}

function createNetwork() {
  // Create node geometry and material
  nodeGeometry = new THREE.SphereGeometry(config.nodeSize, 8, 6)
  nodeMaterial = new THREE.MeshBasicMaterial({ 
    color: config.nodeColor,
    transparent: true,
    opacity: 0.8
  })
  
  // Create nodes
  for (let i = 0; i < config.nodeCount; i++) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
    
    // Random position
    node.position.x = (Math.random() - 0.5) * 800
    node.position.y = (Math.random() - 0.5) * 600
    node.position.z = (Math.random() - 0.5) * 400
    
    // Random velocity
    node.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * config.animationSpeed,
      (Math.random() - 0.5) * config.animationSpeed,
      (Math.random() - 0.5) * config.animationSpeed
    )
    
    nodes.push(node)
    scene.add(node)
  }
  
  // Create connection lines
  updateConnections()
}

function updateConnections() {
  // Remove existing connections
  connections.forEach(line => scene.remove(line))
  connections = []
  
  // Create new connections based on distance
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = nodes[i].position.distanceTo(nodes[j].position)
      
      if (distance < config.maxDistance) {
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array([
          nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
          nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
        ])
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        
        const material = new THREE.LineBasicMaterial({
          color: config.connectionColor,
          transparent: true,
          opacity: Math.max(0.1, 1 - distance / config.maxDistance) * 0.6
        })
        
        const line = new THREE.Line(geometry, material)
        connections.push(line)
        scene.add(line)
      }
    }
  }
}

function animate() {
  animationId = requestAnimationFrame(animate)
  
  // Update node positions
  nodes.forEach(node => {
    // Apply velocity
    node.position.add(node.velocity)
    
    // Bounce off boundaries
    if (node.position.x > 400 || node.position.x < -400) {
      node.velocity.x *= -1
    }
    if (node.position.y > 300 || node.position.y < -300) {
      node.velocity.y *= -1
    }
    if (node.position.z > 200 || node.position.z < -200) {
      node.velocity.z *= -1
    }
    
    // Mouse influence
    const mouseInfluence = new THREE.Vector3(
      mousePosition.x - node.position.x,
      mousePosition.y - node.position.y,
      0
    )
    
    const distance = mouseInfluence.length()
    if (distance < config.mouseInfluence) {
      mouseInfluence.normalize()
      mouseInfluence.multiplyScalar((config.mouseInfluence - distance) * 0.01)
      node.velocity.add(mouseInfluence)
    }
    
    // Damping
    node.velocity.multiplyScalar(0.99)
  })
  
  // Update connections every few frames for performance
  if (Math.random() < 0.1) {
    updateConnections()
  }
  
  // Add subtle camera movement
  camera.position.x = Math.sin(Date.now() * 0.0005) * 50
  camera.position.y = Math.cos(Date.now() * 0.0003) * 30
  camera.lookAt(0, 0, 0)
  
  renderer.render(scene, camera)
}

function onMouseMove(event) {
  mousePosition.x = (event.clientX / window.innerWidth) * 800 - 400
  mousePosition.y = -(event.clientY / window.innerHeight) * 600 + 300
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>

<style scoped>
/* Component styles handled in template */
</style>