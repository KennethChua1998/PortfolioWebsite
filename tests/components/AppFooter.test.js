import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '../../src/components/layout/AppFooter.vue'
import { footerData } from '../../src/data/footer.js'
import { contactData } from '../../src/data/contact.js'

describe('AppFooter', () => {
  it('renders the current year in the copyright line', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain(`© ${new Date().getFullYear()}`)
  })

  it('renders the owner name and copyright text', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain(footerData.name)
    expect(wrapper.text()).toContain(footerData.copyright)
  })

  it('links to the shared contact info from contact.js', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.find(`a[href="${contactData.contactInfo.github}"]`).exists()).toBe(true)
    expect(wrapper.find(`a[href="${contactData.contactInfo.linkedin}"]`).exists()).toBe(true)
    expect(wrapper.find(`a[href="mailto:${contactData.contactInfo.email}"]`).exists()).toBe(true)
  })

  it('shares one contact info object with contact.js', () => {
    expect(footerData.contactInfo).toBe(contactData.contactInfo)
  })
})
