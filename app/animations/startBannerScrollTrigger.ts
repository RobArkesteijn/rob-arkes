import { gsap } from 'gsap-trial'

const startBannerScrollTrigger = (element: ComponentPublicInstance | null) => {
  if (element) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element.$el,
        pin: true,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        snap: {
          snapTo: 'labelsDirectional',
          duration: { min: 0.2, max: 3 },
          delay: 0.2,
          ease: 'power1.inOut',
        },
      },
    })

    const title = element.$el.querySelector('.start-banner__title') as HTMLElement
    const titleLetters = Array.from(title.querySelectorAll('.start-banner__title-letter')).reverse() as HTMLElement[]
    const subtitle = element.$el.querySelector('.start-banner__subtitle') as HTMLElement
    const subtitleHeight = 72

    tl.addLabel('start')
      .from(subtitle, {
        opacity: 1,
        filter: 'blur(0) drop-shadow(2px 2px #131112)',
        scale: 1,
        y: 0,
      })
      .from(titleLetters, {
        opacity: 1,
        filter: 'blur(0) drop-shadow(6px 6px #131112)',
        y: 0,
        x: 0,
      })
      .addLabel('fade-in-subtitle')
      .to(subtitle, {
        opacity: 0,
        filter: 'blur(5px)',
        scale: 0,
        y: -subtitleHeight,
      })
      .addLabel('set-title-position')
      .to(titleLetters, {
        y: subtitleHeight,
      })
      .addLabel('fade-in-title')
      .to(titleLetters, {
        opacity: 0,
        filter: 'blur(5px)',
        x: -100,
        stagger: 0.1,
      })
  }
}

export default startBannerScrollTrigger
