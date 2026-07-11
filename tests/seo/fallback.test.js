import { describe, it, expect } from 'vitest'
import { generateFallbackHtml } from '../../src/seo/fallback.js'
import { projects } from '../../src/data/projects.js'
import { certifications } from '../../src/data/skills.js'

describe('generateFallbackHtml', () => {
  const html = generateFallbackHtml()

  it('renders the name as h1 with title and location', () => {
    expect(html).toContain('<h1>Kenneth Chua</h1>')
    expect(html).toContain('Google Cloud Specialist &amp; Full Stack Developer based in Penang, Malaysia.')
  })

  it('includes every project title and description', () => {
    for (const p of projects) {
      expect(html).toContain(`${p.title} (${p.year})`)
    }
  })

  it('includes every certification', () => {
    for (const c of certifications) {
      expect(html).toContain(c.name)
    }
  })

  it('links to email, LinkedIn, and GitHub', () => {
    expect(html).toContain('mailto:me@kennethchua.com')
    expect(html).toContain('https://www.linkedin.com/in/kenneth-chua/')
    expect(html).toContain('https://github.com/kennethchua1998')
  })

  it('escapes HTML in content', () => {
    expect(html).not.toMatch(/<p>[^<]*&(?!amp;|lt;|gt;|quot;)/)
  })
})
