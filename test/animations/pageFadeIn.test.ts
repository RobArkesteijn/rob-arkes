import { describe, it, expect, vi, beforeEach } from 'vitest'
import { gsap } from 'gsap'
import pageFadeIn from '@/animations/pageFadeIn'

vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    timeline: vi.fn(() => ({ to: vi.fn(), from: vi.fn() })),
  },
}))

describe('pageFadeIn', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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
