import { gsap } from 'gsap-trial'

const shortIntroductionScrollTrigger = (element: ComponentPublicInstance | null) => {
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

    const image = element.$el.querySelector('.short-introduction__image') as HTMLElement
    const textLines = Array.from(element.$el.querySelectorAll('.short-introduction__text-line')) as HTMLElement[]

    tl.addLabel('start')
      .from(image, {
        opacity: 0,
        x: '100vw',
      })
      .from(textLines, {
        opacity: 0,
        filter: 'blur(5px)',
        x: '100%',
        stagger: 0.1,
      })
      .addLabel('fade-in-image')
      .to(image, {
        opacity: 1,
        x: 0,
      })
      .addLabel('fade-in-text-lines')
      .to(textLines, {
        opacity: 1,
        filter: 'blur(0)',
        x: 0,
      })
      .addLabel('end')
  }
}

export default shortIntroductionScrollTrigger
