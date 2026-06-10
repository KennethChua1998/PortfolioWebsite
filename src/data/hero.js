import { personalInfo, yearsOfExperience } from './personal.js'

export const heroData = {
  name: personalInfo.name,
  headline: 'The Curator of',
  headlineAccent: 'Digital Systems',
  title: 'Google Cloud Specialist & Full Stack Developer',
  subtitle: `Architecting resilient cloud-native ecosystems and high-performance applications with ${yearsOfExperience} years of experience.`,
  institution: 'PointStar',
  tenure: `${yearsOfExperience} Years Experience`,
  buttons: {
    projects: 'Explore Projects',
    contact: 'Get In Touch',
  },
}
