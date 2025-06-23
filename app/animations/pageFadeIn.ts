import { gsap } from 'gsap'

const pageFadeIn = (element: HTMLElement | null) => {
  if (element) {
    const tl = gsap.timeline()
    tl.from(element,
      {
        opacity: 0,
        duration: 2,
      })
      .to(element, {
        opacity: 1,
        duration: 2,
      })
  }
}

export default pageFadeIn
