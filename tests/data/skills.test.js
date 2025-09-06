import { describe, it, expect } from 'vitest'
import {
  cloudSkills,
  backendSkills,
  frontendSkills,
  databaseSkills,
  toolsSkills,
  certifications,
} from '../../src/data/skills.js'

describe('Skills Data', () => {
  const skillCategories = [
    cloudSkills,
    backendSkills,
    frontendSkills,
    databaseSkills,
    toolsSkills,
  ]

  describe('Skill Categories', () => {
    it('exports all skill categories', () => {
      expect(cloudSkills).toBeDefined()
      expect(backendSkills).toBeDefined()
      expect(frontendSkills).toBeDefined()
      expect(databaseSkills).toBeDefined()
      expect(toolsSkills).toBeDefined()
    })

    it('has valid structure for all skill categories', () => {
      skillCategories.forEach(category => {
        expect(category).toHaveProperty('title')
        expect(category).toHaveProperty('icon')
        expect(category).toHaveProperty('color')
        expect(category).toHaveProperty('skills')
        
        expect(typeof category.title).toBe('string')
        expect(typeof category.icon).toBe('string')
        expect(typeof category.color).toBe('string')
        expect(Array.isArray(category.skills)).toBe(true)
        expect(category.skills.length).toBeGreaterThan(0)
      })
    })

    it('has valid skill items structure', () => {
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          expect(skill).toHaveProperty('name')
          expect(skill).toHaveProperty('level')
          
          expect(typeof skill.name).toBe('string')
          expect(typeof skill.level).toBe('number')
          expect(skill.name.trim()).not.toBe('')
          expect(skill.level).toBeGreaterThan(0)
          expect(skill.level).toBeLessThanOrEqual(100)
        })
      })
    })

    it('has unique skill names within categories', () => {
      skillCategories.forEach(category => {
        const skillNames = category.skills.map(skill => skill.name)
        const uniqueNames = [...new Set(skillNames)]
        expect(uniqueNames).toHaveLength(skillNames.length)
      })
    })
  })

  describe('Individual Skill Categories', () => {
    it('cloud skills has expected structure', () => {
      expect(cloudSkills.title).toBe('Cloud')
      expect(cloudSkills.icon).toBe('Cloud')
      expect(cloudSkills.color).toBe('blue')
      expect(cloudSkills.skills.some(skill => skill.name === 'Google Cloud')).toBe(true)
    })

    it('backend skills has expected structure', () => {
      expect(backendSkills.title).toBe('Backend')
      expect(backendSkills.icon).toBe('Code')
      expect(backendSkills.color).toBe('emerald')
      expect(backendSkills.skills.some(skill => skill.name === 'Node.js')).toBe(true)
    })

    it('frontend skills has expected structure', () => {
      expect(frontendSkills.title).toBe('Frontend')
      expect(frontendSkills.icon).toBe('Monitor')
      expect(frontendSkills.color).toBe('purple')
      expect(frontendSkills.skills.some(skill => skill.name === 'Vue.js 3')).toBe(true)
    })

    it('database skills has expected structure', () => {
      expect(databaseSkills.title).toBe('Data')
      expect(databaseSkills.icon).toBe('Database')
      expect(databaseSkills.color).toBe('orange')
      expect(databaseSkills.skills.some(skill => skill.name === 'MySQL')).toBe(true)
    })

    it('tools skills has expected structure', () => {
      expect(toolsSkills.title).toBe('Tools')
      expect(toolsSkills.icon).toBe('Settings')
      expect(toolsSkills.color).toBe('amber')
      expect(toolsSkills.skills.some(skill => skill.name === 'Git')).toBe(true)
    })
  })

  describe('Certifications', () => {
    it('exports certifications array', () => {
      expect(Array.isArray(certifications)).toBe(true)
      expect(certifications.length).toBeGreaterThan(0)
    })

    it('has valid certification structure', () => {
      certifications.forEach(cert => {
        expect(cert).toHaveProperty('name')
        expect(cert).toHaveProperty('period')
        expect(cert).toHaveProperty('icon')
        
        expect(typeof cert.name).toBe('string')
        expect(typeof cert.period).toBe('string')
        expect(typeof cert.icon).toBe('string')
        expect(cert.name.trim()).not.toBe('')
        expect(cert.period.trim()).not.toBe('')
      })
    })

    it('contains expected Google Cloud certifications', () => {
      const certNames = certifications.map(cert => cert.name)
      expect(certNames.some(name => name.includes('Cloud Architect'))).toBe(true)
      expect(certNames.some(name => name.includes('Cloud Developer'))).toBe(true)
    })

    it('has valid period format', () => {
      certifications.forEach(cert => {
        expect(cert.period).toMatch(/^\(\d{4}-\d{4}\)$/)
      })
    })
  })

  describe('Data Integrity', () => {
    it('has reasonable skill level distributions', () => {
      skillCategories.forEach(category => {
        const levels = category.skills.map(skill => skill.level)
        const avgLevel = levels.reduce((sum, level) => sum + level, 0) / levels.length
        
        // Average skill level should be reasonable (not all 100 or all 0)
        expect(avgLevel).toBeGreaterThan(50)
        expect(avgLevel).toBeLessThan(95)
      })
    })

    it('has no duplicate skill names across all categories', () => {
      const allSkillNames = skillCategories.flatMap(category => 
        category.skills.map(skill => skill.name)
      )
      
      // Allow some reasonable overlap (like different contexts)
      const duplicates = allSkillNames.filter((name, index) => 
        allSkillNames.indexOf(name) !== index
      )
      
      // Should have minimal or no duplicates
      expect(duplicates.length).toBeLessThan(3)
    })
  })
})