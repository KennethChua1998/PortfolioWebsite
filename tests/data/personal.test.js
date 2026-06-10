import { describe, it, expect } from 'vitest'
import { personalInfo, yearsOfExperience } from '../../src/data/personal.js'
import { heroData } from '../../src/data/hero.js'

describe('personal data', () => {
  it('computes years of experience from the 2021 start year', () => {
    expect(yearsOfExperience).toBe(new Date().getFullYear() - 2021)
    expect(yearsOfExperience).toBeGreaterThan(0)
  })

  it('uses the shared experience figure in the bio and hero copy', () => {
    expect(personalInfo.description[0]).toContain(`${yearsOfExperience} years`)
    expect(heroData.subtitle).toContain(`${yearsOfExperience} years`)
    expect(heroData.tenure).toBe(`${yearsOfExperience} Years Experience`)
  })

  it('hero name comes from personalInfo', () => {
    expect(heroData.name).toBe(personalInfo.name)
  })
})
