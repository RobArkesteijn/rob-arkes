import { gsap } from 'gsap-trial'
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
})
