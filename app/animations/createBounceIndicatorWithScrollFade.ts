import gsap from 'gsap-trial'
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'

interface ScrollFadeOptions {
  fadeOutDuration?: number
  fadeInDuration?: number
  fadeOutOpacity?: number
  fadeInOpacity?: number
  scrollStopDelay?: number
}

interface BounceOptions {
  y?: number
  duration?: number
  ease?: string
  id?: string
}

const createBounceWithScrollFade = (
  selector: HTMLElement,
  bounceOptions: BounceOptions = {},
  scrollFadeOptions: ScrollFadeOptions = {},
): (() => void) => {
  createBounceIndicator(selector, bounceOptions)

  const {
    fadeOutDuration = 0.2,
    fadeInDuration = 0.5,
    fadeOutOpacity = 0,
    fadeInOpacity = 1,
    scrollStopDelay = 500,
  } = scrollFadeOptions

  let scrollTimeout: ReturnType<typeof setTimeout> | null = null

  const scrollTrigger = ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: () => {
      if (scrollTimeout) clearTimeout(scrollTimeout)

      gsap.to(selector, {
        opacity: fadeOutOpacity,
        duration: fadeOutDuration,
        overwrite: 'auto',
      })

      scrollTimeout = setTimeout(() => {
        gsap.to(selector, {
          opacity: fadeInOpacity,
          duration: fadeInDuration,
          overwrite: 'auto',
        })
      }, scrollStopDelay)
    },
  })

  return () => {
    scrollTrigger.kill()
    if (scrollTimeout) clearTimeout(scrollTimeout)
  }
}

export default createBounceWithScrollFade
