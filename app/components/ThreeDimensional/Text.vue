<script setup lang="ts">
import * as THREE from 'three'
import { TextGeometry, type TextGeometryParameters } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
// import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { CopyShader } from 'three/addons/shaders/CopyShader.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'

interface TextLettersOptions extends TextGeometryParameters {
  color: number
  metalness: number
  roughness: number
  letterSpacing: number
  transmission: number
  ior: number
  emissive: number
  emissiveIntensity: number
}

const threeDimensionalText = ref<HTMLDivElement | null>(null)

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  loader: FontLoader,
  dirLight: THREE.DirectionalLight,
  titleLettersGroup: THREE.Group,
  subtitleLettersGroup: THREE.Group,
  composer: EffectComposer

const init = () => {
  // Scene
  scene = new THREE.Scene()
  // Camera
  camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000,
  )
  camera.position.z = 8
  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight - 200)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  if (threeDimensionalText.value) {
    threeDimensionalText.value.appendChild(renderer.domElement)
  }
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera)) // First pass: render the scene

  // Unreal Bloom Pass (Adjust strength, radius, threshold for desired glow)
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight - 200), // Resolution
    1.5, // strength (How intense the glow is)
    0.4, // radius (How far the glow spreads)
    0.85, // threshold (Only pixels brighter than this will glow, 0=all pixels, 1=only brightest)
  )
  bloomPass.renderToScreen = false // Add this line!
  composer.addPass(bloomPass)
  const copyPass = new ShaderPass(CopyShader)
  copyPass.renderToScreen = true // Make this the final pass

  composer.addPass(copyPass)
  // RGBE Loader
  // const rgbeLoader = new RGBELoader()
  // rgbeLoader.load('textures/nebula.hdr', (texture) => {
  //   texture.mapping = THREE.EquirectangularReflectionMapping

  //   scene.environment = texture
  // })
  // Loader
  loader = new FontLoader()
  loader.load('fonts/aboreto-regular.json', (font) => {
    const create3DTextLetters = (
      textString: string,
      options: TextLettersOptions,
      startingY: number,
      kerningMap: { [key: string]: number } = {},
    ) => {
      const group = new THREE.Group()
      let totalWidth = 0

      const chars = textString.split('')

      chars.forEach((char, index) => {
        const isSpace = char === ' '
        let charGeometry
        let charWidth

        if (isSpace) {
          charGeometry = new THREE.BufferGeometry()
          charWidth = options.size! * 0.5
        }
        else {
          charGeometry = new TextGeometry(char, {
            font: options.font,
            size: options.size,
            depth: options.depth,
            curveSegments: options.curveSegments,
            bevelEnabled: options.bevelEnabled,
            bevelThickness: options.bevelThickness,
            bevelSize: options.bevelSize,
            bevelOffset: options.bevelOffset,
            bevelSegments: options.bevelSegments,
          })

          charGeometry.computeBoundingBox()
          charWidth = charGeometry.boundingBox!.max.x - charGeometry.boundingBox!.min.x
          if (!Number.isFinite(charWidth) || charWidth <= 0) {
            charWidth = options.size! * 0.7
          }
        }

        if (!isSpace) {
          const letterMaterial = new THREE.MeshPhysicalMaterial({
            color: options.color,
            metalness: options.metalness,
            roughness: options.roughness,
            transparent: true,
            opacity: 1,
            transmission: options.transmission,
            ior: options.ior,
            emissive: options.emissive,
            emissiveIntensity: options.emissiveIntensity,
          })
          const letterMesh = new THREE.Mesh(charGeometry, letterMaterial)
          letterMesh.position.x = totalWidth
          letterMesh.receiveShadow = true
          group.add(letterMesh)
        }

        let kerningAdjustment = 0

        if (index < chars.length - 1) {
          const pair = char + chars[index + 1]
          if (kerningMap[pair]) {
            kerningAdjustment = kerningMap[pair]
          }
        }

        totalWidth += charWidth + options.letterSpacing + kerningAdjustment
      })

      group.children.forEach((child) => {
        child.position.x -= totalWidth / 2
        child.position.y = startingY
      })

      return group
    }

    const titleOptions = {
      font,
      size: 0.8,
      depth: 0.1,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 8,
      color: 0xd0f9fd,
      metalness: 0.8,
      roughness: 0.3,
      letterSpacing: 0.1,
      transmission: 0.95,
      ior: 1.5,
      emissive: 0x0066ff,
      emissiveIntensity: 1.5,
    }
    const titleKerning = {
      nt: 0.1,
      te: -0.1,
      th: -0.1,
    }
    titleLettersGroup = create3DTextLetters('Enter the cosmos', titleOptions, 0.7, titleKerning)
    scene.add(titleLettersGroup)

    const subtitleOptions = {
      font,
      size: 0.2,
      depth: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 4,
      color: 0xd0f9fd,
      metalness: 0.6,
      roughness: 0.5,
      letterSpacing: 0.04,
      transmission: 0.8,
      ior: 1.4,
      emissive: 0x4400aa,
      emissiveIntensity: 0.8,
    }
    const subtitleKerning = {
      xp: -0.04,
      th: -0.04,
      at: -0.05,
      ap: -0.05,
      ti: -0.05,
      ve: -0.05,
    }
    subtitleLettersGroup = create3DTextLetters('Explore the forces that shape my creative universe.', subtitleOptions, -0.4, subtitleKerning)
    scene.add(subtitleLettersGroup)

    threeDimensionalTextOnScroll('.index__section', titleLettersGroup, subtitleLettersGroup)
  })
  // Lighting
  dirLight = new THREE.DirectionalLight(0xffffff, 4)
  dirLight.position.set(0, 0, 5)
  scene.add(dirLight)
}

const animate = () => {
  requestAnimationFrame(animate)
  composer.render()
  // renderer.render(scene, camera)
}

onMounted(() => {
  init()
  animate()
})
</script>

<template>
  <div
    ref="threeDimensionalText"
    class="three-dimensional-text"
  />
</template>

<style scoped lang="scss">
.three-dimensional-text {
  width: 100vw;
}
</style>
