<template>
  <section id="about" class="py-20 glass-section relative overflow-hidden">
    <div class="section-container">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-emerald-400">
          About Kenneth
        </h2>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <p class="text-lg text-gray-200 leading-relaxed">
              Passionate Software Engineer specializing in cloud-based solutions with 4+ years 
              of experience delivering enterprise-grade applications. Currently serving as a 
              Cloud Specialist at PointStar, focusing on Google Cloud technologies.
            </p>
            
            <p class="text-lg text-gray-200 leading-relaxed">
              I excel in AI/ML integration, API development, and DevOps CI/CD implementations. 
              My expertise spans full-stack development with modern JavaScript frameworks, 
              Python automation, and cloud application modernization.
            </p>
            
            <div class="about-glass-card p-8 rounded-xl mt-8 relative z-10">
              <h3 class="text-xl font-semibold text-emerald-300 mb-4">Key Achievements</h3>
              <ul class="space-y-2 text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">•</span>
                  Technical Lead for Full Stack Project delivered to Singapore Government Agency
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">•</span>
                  Google Cloud Professional Developer Certified
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">•</span>
                  Delivered multiple Python automation projects and no-code solutions
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">•</span>
                  Academic excellence: Dean's List recipient (CGPA 3.74)
                </li>
              </ul>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in skills" 
                :key="skill"
                class="px-4 py-2 skill-pill text-emerald-300 rounded-full text-sm"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <div class="relative">
            <div class="w-80 h-80 mx-auto bg-gradient-to-br from-primary-600 to-accent-600 rounded-full opacity-20 blur-3xl"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-64 h-64 bg-dark-800 rounded-full border-2 border-primary-400 flex items-center justify-center">
                <User :size="80" class="text-primary-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { User } from 'lucide-vue-next'

const skills = [
  'Google Cloud Platform',
  'JavaScript',
  'Python', 
  'Vue.js 3',
  'REST APIs',
  'Containerization',
  'DevOps CI/CD',
  'Java',
  'Three.js',
  'Tailwind CSS',
  'Full-Stack Development',
  'Application Modernization'
]
</script>

<style scoped>
.about-glass-card {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 51, 234, 0.05) 50%,
    rgba(15, 23, 42, 0.1) 100%);
  backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
}

.skill-pill {
  background: rgba(15, 23, 42, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-pill:hover {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.15) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    rgba(15, 23, 42, 0.15) 100%);
  backdrop-filter: blur(35px) saturate(220%);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}
</style>