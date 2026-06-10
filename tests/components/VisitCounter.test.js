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

  it('does not increment in dev mode or repeat sessions (read-only URL)', async () => {
    global.fetch = mockFetch(true, { count: 5 })
    mount(VisitCounter)
    await flushPromises()

    // vitest runs with DEV=true, so the /up increment endpoint must not be hit
    expect(global.fetch.mock.calls[0][0]).not.toContain('/up')
  })
})
