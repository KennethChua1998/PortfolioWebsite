export const smoothScroll = selector => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
