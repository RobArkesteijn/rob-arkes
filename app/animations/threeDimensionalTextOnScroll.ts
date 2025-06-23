import type * as THREE from 'three'
import { gsap } from 'gsap'

function threeDimensionalTextOnScroll(
  trigger: string,
  titleLettersGroup: THREE.Group,
  subtitleLettersGroup: THREE.Group,
): void {
  const allPositions = [
    ...titleLettersGroup.children.map(c => c.position),
    ...subtitleLettersGroup.children.map(c => c.position),
  ]

  const allRotations = [
    ...titleLettersGroup.children.map(c => c.rotation),
    ...subtitleLettersGroup.children.map(c => c.rotation),
  ]

  const allScales = [
    ...titleLettersGroup.children.map(c => c.scale),
    ...subtitleLettersGroup.children.map(c => c.scale),
  ]

  const allMaterials = [
    ...titleLettersGroup.children.map(c => (c as THREE.Mesh).material as THREE.Material),
    ...subtitleLettersGroup.children.map(c => (c as THREE.Mesh).material as THREE.Material),
  ]

  // const allLetters = [
  //   ...titleLettersGroup.children,
  //   ...subtitleLettersGroup.children,
  // ]

  gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top-=100px top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      pinnedContainer: trigger,
    },
  })
    .to(allPositions, {
      // x: (_i, target) => target.x * -1,
      y: (_i, target) => target.y * -2,
      // z: (_i, target) => target.z * -1,
      stagger: {
        each: 0.05,
        from: 'start',
      },
    })
    .to(allRotations, {
      // x: (_i, target) => target.x + 5,
      y: (_i, target) => target.y + 5,
      // z: (_i, target) => target.z + 0.1,
      stagger: {
        each: 0.05,
        from: 'start',
      },
    }, '<')
    .to(allScales, {
      x: () => 4,
      y: () => 4,
      z: () => 4,
      stagger: {
        each: 0.05,
        from: 'start',
      },
    }, '<')
    .to(allMaterials, {
      opacity: 0,
      stagger: {
        each: 0.05,
        from: 'start',
      },
    }, '<')
}

export default threeDimensionalTextOnScroll
