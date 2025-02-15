import gsap from 'gsap-trial'

interface BounceOptions {
  y?: number
  duration?: number
  ease?: string
  id?: string
}

const createBounceIndicator = (selector: HTMLElement, options: BounceOptions = {}): void => {
  const { y = -10, duration = 1, ease = 'power1.inOut', id = undefined } = options

  gsap.to(selector, {
    y: y,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: ease,
    id: id,
  })
}

export default createBounceIndicator
