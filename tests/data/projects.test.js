import { describe, it, expect } from 'vitest'
import { projects } from '../../src/data/projects.js'

describe('Projects Data', () => {
  it('exports projects array', () => {
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('has valid project structure', () => {
    projects.forEach((project, index) => {
      expect(project, `Project at index ${index}`).toHaveProperty('id')
      expect(project, `Project at index ${index}`).toHaveProperty('title')
      expect(project, `Project at index ${index}`).toHaveProperty('description')
      expect(project, `Project at index ${index}`).toHaveProperty('technologies')
      expect(project, `Project at index ${index}`).toHaveProperty('status')
      expect(project, `Project at index ${index}`).toHaveProperty('year')
      expect(project, `Project at index ${index}`).toHaveProperty('aiAssisted')
      
      expect(typeof project.id).toBe('number')
      expect(typeof project.title).toBe('string')
      expect(typeof project.description).toBe('string')
      expect(Array.isArray(project.technologies)).toBe(true)
      expect(typeof project.status).toBe('string')
      expect(typeof project.year).toBe('string')
      expect(typeof project.aiAssisted).toBe('boolean')
    })
  })

  it('has unique project IDs', () => {
    const ids = projects.map(project => project.id)
    const uniqueIds = [...new Set(ids)]
    expect(uniqueIds).toHaveLength(ids.length)
  })

  it('has non-empty required fields', () => {
    projects.forEach(project => {
      expect(project.title.trim()).not.toBe('')
      expect(project.description.trim()).not.toBe('')
      expect(project.technologies.length).toBeGreaterThan(0)
    })
  })

  it('has valid technology arrays', () => {
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        expect(typeof tech).toBe('string')
        expect(tech.trim()).not.toBe('')
      })
    })
  })

  it('has valid URLs when provided', () => {
    const urlPattern = /^https?:\/\/.+/
    
    projects.forEach(project => {
      if (project.githubUrl) {
        expect(project.githubUrl).toMatch(urlPattern)
      }
      if (project.liveUrl) {
        expect(project.liveUrl).toMatch(urlPattern)
      }
    })
  })

  it('contains expected portfolio project', () => {
    const portfolioProject = projects.find(p => p.title === 'Interactive Portfolio Website')
    expect(portfolioProject).toBeDefined()
    expect(portfolioProject.technologies).toContain('Vue.js 3')
    expect(portfolioProject.technologies).toContain('Three.js')
    expect(portfolioProject.year).toBe('2025')
  })
})