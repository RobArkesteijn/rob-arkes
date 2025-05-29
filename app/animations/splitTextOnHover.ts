import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

function splitTextOnHover(element: Element, isEntering: boolean): void {
  const split = new SplitText(element, { type: 'chars' })
  const chars = split.chars

  if (isEntering) {
    gsap.fromTo(
      chars,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.2, ease: 'power2.out' },
    )
  }
  else {
    gsap.to(chars, { y: 0, opacity: 1, stagger: 0.05, duration: 0.2, ease: 'power2.in' })
  }
}

export default splitTextOnHover
