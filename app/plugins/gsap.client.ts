import { gsap } from 'gsap-trial'
import { SplitText } from 'gsap-trial/SplitText'
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother)
})
