// Project type definition for JavaScript
export const createProject = (data) => ({
  id: data.id,
  title: data.title,
  description: data.description,
  technologies: data.technologies || [],
  githubUrl: data.githubUrl,
  liveUrl: data.liveUrl,
  imageUrl: data.imageUrl
})