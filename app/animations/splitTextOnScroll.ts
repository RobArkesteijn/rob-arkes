import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

function splitTextOnScroll(element: Element): void {
  const q = gsap.utils.selector(element)
  const texts = q('.split-text')
  const allChars: Element[] = []

  texts.forEach((textElement) => {
    const split = new SplitText(textElement, { type: 'words, chars' })
    split.words.forEach((word) => {
      const wordWrapper = document.createElement('span')
      word.parentNode?.insertBefore(wordWrapper, word)
      wordWrapper.appendChild(word)
    })
    allChars.push(...split.chars)
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top-=100px top',
      end: 'bottom top',
      scrub: 0.5,
      pin: true,
      // snap: {
      //   snapTo: 'labels',
      //   duration: { min: 0.2, max: 3 },
      //   delay: 0.2,
      //   ease: 'power1.inOut',
      // },
    },
  })
    .addLabel('.start')
    .to(allChars, {
      opacity: 0,
      y: -20,
      stagger: 0.01,
      duration: 0.1,
      ease: 'power1.out',
    })
    .addLabel('.end')
}

export default splitTextOnScroll
