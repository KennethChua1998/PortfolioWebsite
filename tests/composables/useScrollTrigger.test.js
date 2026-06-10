import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useScrollTrigger } from '../../src/composables/useScrollTrigger.js'

let observerInstances

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback
    this.options = options
    this.observed = []
    this.disconnected = false
    observerInstances.push(this)
  }

  observe(el) {
    this.observed.push(el)
  }

  disconnect() {
    this.disconnected = true
  }

  intersect(isIntersecting = true) {
    this.callback([{ isIntersecting }])
  }
}

const mountWithComposable = (onTrigger, options) => {
  let exposed
  const Comp = defineComponent({
    setup() {
      const target = ref(null)
      exposed = useScrollTrigger(target, onTrigger, options)
      return () => h('div', { ref: target })
    },
  })
  const wrapper = mount(Comp)
  return { wrapper, exposed: () => exposed }
}

describe('useScrollTrigger', () => {
  beforeEach(() => {
    observerInstances = []
    global.IntersectionObserver = MockIntersectionObserver
  })

  it('starts not visible and observes the target on mount', () => {
    const { exposed } = mountWithComposable(vi.fn())

    expect(exposed().isVisible.value).toBe(false)
    expect(observerInstances).toHaveLength(1)
    expect(observerInstances[0].observed).toHaveLength(1)
  })

  it('flips isVisible and fires the callback on intersection', () => {
    const onTrigger = vi.fn()
    const { exposed } = mountWithComposable(onTrigger)

    observerInstances[0].intersect()

    expect(exposed().isVisible.value).toBe(true)
    expect(onTrigger).toHaveBeenCalledTimes(1)
  })

  it('only fires once and disconnects after triggering', () => {
    const onTrigger = vi.fn()
    mountWithComposable(onTrigger)

    observerInstances[0].intersect()
    observerInstances[0].intersect()

    expect(onTrigger).toHaveBeenCalledTimes(1)
    expect(observerInstances[0].disconnected).toBe(true)
  })

  it('ignores non-intersecting entries', () => {
    const onTrigger = vi.fn()
    const { exposed } = mountWithComposable(onTrigger)

    observerInstances[0].intersect(false)

    expect(exposed().isVisible.value).toBe(false)
    expect(onTrigger).not.toHaveBeenCalled()
  })

  it('passes the threshold option to the observer', () => {
    mountWithComposable(vi.fn(), { threshold: 0.2 })

    expect(observerInstances[0].options.threshold).toBe(0.2)
  })

  it('defaults the threshold to 0.15', () => {
    mountWithComposable(vi.fn())

    expect(observerInstances[0].options.threshold).toBe(0.15)
  })

  it('disconnects the observer on unmount', () => {
    const { wrapper } = mountWithComposable(vi.fn())

    wrapper.unmount()

    expect(observerInstances[0].disconnected).toBe(true)
  })
})
