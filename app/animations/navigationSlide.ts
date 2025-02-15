import { gsap } from 'gsap-trial'

const navigationSlide = (element: HTMLElement | null, active: boolean) => {
  if (element) {
    const buttons = element.querySelectorAll('.button')

    gsap.to(buttons, {
      x: active ? 0 : '100% + 20px',
      opacity: active ? 1 : 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.1,
    })
  }
}

export default navigationSlide
