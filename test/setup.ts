import { vi, beforeAll, afterEach } from 'vitest'

beforeAll(() => {
  vi.mock('gsap-trial', () => ({
    gsap: {
      to: vi.fn(),
      from: vi.fn(),
      addLabel: vi.fn(),
      timeline: vi.fn(() => ({
        addLabel: vi.fn().mockReturnThis(),
        from: vi.fn().mockReturnThis(),
        to: vi.fn().mockReturnThis(),
      })),
    },
  }))
})

afterEach(() => {
  vi.clearAllMocks()
})
