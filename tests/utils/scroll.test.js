import { describe, it, expect, vi, beforeEach } from 'vitest'
import { smoothScroll, scrollToTop } from '../../src/utils/scroll.js'

describe('scroll utils', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('smoothScroll scrolls the matching element into view', () => {
    const section = document.createElement('section')
    section.id = 'about'
    section.scrollIntoView = vi.fn()
    document.body.appendChild(section)

    smoothScroll('#about')

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('smoothScroll is a no-op when the selector matches nothing', () => {
    expect(() => smoothScroll('#missing')).not.toThrow()
  })

  it('scrollToTop scrolls the window to the top smoothly', () => {
    window.scrollTo = vi.fn()

    scrollToTop()

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
