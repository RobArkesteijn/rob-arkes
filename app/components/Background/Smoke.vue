<script setup lang="ts">
import * as THREE from 'three'
import colorVariables from '@/assets/exports/colors.json'
import { navigationItems } from '@/data/Navigation'

const animationActive = useAnimationActive()
const route = useRoute()

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  clock: THREE.Clock,
  delta: number,
  smokeGeo: THREE.PlaneGeometry

const smokeParticles: THREE.Mesh[] = []
let smokeMaterial: THREE.MeshLambertMaterial
const defaultTexturePath = '/cosmic-cloud.png'
const cameraZPosition = 1050
const fadeDuration = 2
const backgroundColor = colorVariables.variables.find(el => el.name === '$night')?.value
const smokeColor = colorVariables.variables.find(el => el.name === '$dim-gray')?.value

const smokeDiv = ref<HTMLDivElement | null>(null)

const init = () => {
  clock = new THREE.Clock()

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  )
  camera.position.z = 950

  scene.background = new THREE.Color(backgroundColor)

  scene.add(camera)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-1, 0, 1)
  scene.add(light)

  const loader = new THREE.TextureLoader()
  loader.crossOrigin = ''

  const smokeTexture = loader.load(defaultTexturePath)

  smokeMaterial = new THREE.MeshLambertMaterial({
    map: smokeTexture,
    color: new THREE.Color(smokeColor),
    transparent: true,
    opacity: 0,
  })

  smokeGeo = new THREE.PlaneGeometry(400, 400)

  for (let p = 0; p < 150; p++) {
    const particle = new THREE.Mesh(smokeGeo, smokeMaterial.clone())
    particle.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 1000 - 100,
    )
    particle.rotation.z = Math.random() * 360
    scene.add(particle)
    smokeParticles.push(particle)
  }

  if (smokeDiv.value) {
    smokeDiv.value.appendChild(renderer.domElement)
  }
}

const updateSmokeTexture = (texturePath: string) => {
  const loader = new THREE.TextureLoader()
  const newTexture = loader.load(texturePath)

  smokeParticles.forEach((particle) => {
    const material = particle.material as THREE.MeshLambertMaterial
    material.map = newTexture
    material.needsUpdate = true
  })
}

const animate = () => {
  delta = clock.getDelta()
  requestAnimationFrame(animate)

  if (animationActive.value) {
    evolveSmoke()
    render()
  }
}

const evolveSmoke = () => {
  const elapsedTime = clock.getElapsedTime()

  let sp = smokeParticles.length
  while (sp--) {
    const particle = smokeParticles[sp]
    if (particle) {
      particle.rotation.z += delta * 0.05

      if ((particle.material as THREE.Material).opacity < 1) {
        (particle.material as THREE.Material).opacity = Math.min(1, elapsedTime / fadeDuration)
      }
    }
  }
}

const render = () => {
  renderer.render(scene, camera)
}

const handleResize = () => {
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

onMounted(() => {
  init()
  animate()

  window.addEventListener('resize', handleResize)

  watch(
    () => route.path,
    (newPath) => {
      const matchingNavItem = navigationItems.find(item => item.link === newPath)
      const texturePath = matchingNavItem ? matchingNavItem.image : defaultTexturePath
      updateSmokeTexture(texturePath)

      const zPosition = matchingNavItem?.z_position ?? cameraZPosition
      if (camera) {
        camera.position.z = zPosition
      }
    },
    { immediate: true },
  )
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div
    ref="smokeDiv"
    class="smoke-background"
  />
</template>

<style lang="scss" scoped>
.smoke-background {
  height: 100%;
  width: 100%;
  z-index: -1;
  position: relative;
}
</style>
