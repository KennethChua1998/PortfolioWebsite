// Static HTML for crawlers that don't run JS; injected into index.html at build
// by the seo-fallback plugin in vite.config.js, replaced by Vue on mount.
import { personalInfo } from '../data/personal.js'
import { heroData } from '../data/hero.js'
import { projects } from '../data/projects.js'
import { certifications } from '../data/skills.js'
import { contactData } from '../data/contact.js'

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

export function generateFallbackHtml() {
  const { email, linkedin, github } = contactData.contactInfo

  const certItems = certifications.map((c) => `<li>${esc(c.name)} ${esc(c.period)}</li>`).join('')

  const projectItems = projects
    .map((p) => {
      const links = [
        p.liveUrl && `<a href="${esc(p.liveUrl)}">Live</a>`,
        p.githubUrl && `<a href="${esc(p.githubUrl)}">GitHub</a>`,
      ]
        .filter(Boolean)
        .join(' - ')
      const tech = p.technologies.map(esc).join(', ')
      return `<article><h3>${esc(p.title)} (${esc(p.year)})</h3><p>${esc(p.description)}</p><p>${tech}${links ? '. ' + links : ''}</p></article>`
    })
    .join('')

  return `<main style="max-width: 42rem; margin: 0 auto; padding: 4rem 1.5rem">
      <h1>${esc(personalInfo.name)}</h1>
      <p>${esc(heroData.title)} based in Penang, Malaysia.</p>
      <p>${esc(personalInfo.description[0])}</p>
      <h2>Certifications</h2>
      <ul>${certItems}</ul>
      <h2>Skills</h2>
      <p>${personalInfo.skills.map(esc).join(', ')}</p>
      <h2>Projects</h2>
      ${projectItems}
      <h2>Contact</h2>
      <p><a href="mailto:${esc(email)}">${esc(email)}</a> - <a href="${esc(linkedin)}">LinkedIn</a> - <a href="${esc(github)}">GitHub</a></p>
    </main>`
}
