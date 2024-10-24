import { gsap } from 'gsap-trial'

const pageFadeIn = (element: HTMLElement | null) => {
  if (element) {
    gsap.to(element,
      {
        opacity: 1,
        duration: 2,
      },
    )
  }
}

export default pageFadeIn