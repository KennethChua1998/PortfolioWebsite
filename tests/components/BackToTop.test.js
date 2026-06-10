import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BackToTop from '../../src/components/ui/BackToTop.vue'

const scrollTo = async (wrapper, y) => {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  window.dispatchEvent(new Event('scroll'))
  await wrapper.vm.$nextTick()
}

describe('BackToTop', () => {
  it('is hidden before scrolling', () => {
    const wrapper = mount(BackToTop)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('stays hidden at or below the 600px threshold', async () => {
    const wrapper = mount(BackToTop)
    await scrollTo(wrapper, 600)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('appears above the 600px threshold', async () => {
    const wrapper = mount(BackToTop)
    await scrollTo(wrapper, 601)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('hides again when scrolled back up', async () => {
    const wrapper = mount(BackToTop)
    await scrollTo(wrapper, 800)
    await scrollTo(wrapper, 100)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('scrolls to top when clicked', async () => {
    window.scrollTo = vi.fn()
    const wrapper = mount(BackToTop)
    await scrollTo(wrapper, 800)

    await wrapper.find('button').trigger('click')

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
