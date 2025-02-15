import { gsap } from 'gsap-trial'

const gridFadeIn = (element: Element) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top-=100px top',
      end: 'bottom top',
      pin: true,
      scrub: 0.5,
      // snap: {
      //   snapTo: 0.5,
      //   duration: { min: 0.2, max: 3 },
      //   delay: 0.2,
      //   ease: 'power1.inOut',
      // },
    },
  })

  const q = gsap.utils.selector(element)
  const gridSections = q('.index__grid-section')

  tl.from(gridSections, {
    opacity: 0,
    filter: 'blur(5px)',
    x: '100%',
    stagger: 0.1,
  })
    .to(gridSections, {
      opacity: 1,
      filter: 'blur(0)',
      x: 0,
    })
    .to(gridSections.reverse(), {
      opacity: 0,
      filter: 'blur(5px)',
      x: '100%',
      stagger: 0.1,
    })
}

export default gridFadeIn
