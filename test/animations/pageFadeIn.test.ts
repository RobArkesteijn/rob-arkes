import { describe, it, expect } from 'vitest'
import { gsap } from 'gsap'
import pageFadeIn from '@/animations/pageFadeIn'

describe('pageFadeIn', () => {
  it('should call gsap.to with the correct arguments when element is provided', () => {
    const mockElement = document.createElement('div')

    pageFadeIn(mockElement)

    expect(gsap.to).toHaveBeenCalledWith(mockElement, {
      opacity: 1,
      duration: 2,
    })
  })

  it('should not call gsap.to when element is null', () => {
    pageFadeIn(null)

    expect(gsap.to).not.toHaveBeenCalled()
  })
})
