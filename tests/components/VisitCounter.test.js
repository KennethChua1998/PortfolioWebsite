import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import VisitCounter from '../../src/components/ui/VisitCounter.vue'

const mockFetch = (ok, body) =>
  vi.fn().mockResolvedValue({ ok, json: () => Promise.resolve(body) })

describe('VisitCounter', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('renders the visit count on success', async () => {
    global.fetch = mockFetch(true, { count: 1234 })
    const wrapper = mount(VisitCounter)
    await flushPromises()

    expect(wrapper.text()).toContain('1,234')
  })

  it('renders nothing when the API fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('down'))
    const wrapper = mount(VisitCounter)
    await flushPromises()

    expect(wrapper.text()).toBe('')
  })

  it('renders nothing on a non-ok response', async () => {
    global.fetch = mockFetch(false, {})
    const wrapper = mount(VisitCounter)
    await flushPromises()

    expect(wrapper.text()).toBe('')
  })

  it('reads without incrementing in dev mode (first call is the plain URL)', async () => {
    global.fetch = mockFetch(true, { count: 5 })
    mount(VisitCounter)
    await flushPromises()

    // vitest runs with DEV=true, so the first request must be the read URL
    expect(global.fetch.mock.calls[0][0]).not.toContain('/up')
  })

  it('falls back to /up when the plain read fails on a missing counter', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ count: 7 }) })
    const wrapper = mount(VisitCounter)
    await flushPromises()

    expect(global.fetch.mock.calls[0][0]).not.toContain('/up')
    expect(global.fetch.mock.calls[1][0]).toContain('/up')
    expect(wrapper.text()).toContain('7')
  })
})
