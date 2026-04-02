export const contactData = {
  title: 'Get In Touch',
  heading: "Let's work together",
  description:
    "Open to new opportunities. Let's build something together.",
  contactInfo: {
    email: 'me@kennethchua.com',
    linkedin: 'https://www.linkedin.com/in/kenneth-chua/',
    github: 'https://github.com/kennethchua1998',
    linkedinDisplay: 'linkedin.com/in/kenneth-chua',
  },
  form: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Send Message',
    submitting: 'Sending...',
    // Web3Forms configuration
    publicKey: '6b4a4d7c-bb9b-4c29-ac8e-80c3d79f9817',
    apiUrl: 'https://api.web3forms.com/submit',
  },
  messages: {
    success:
      "Thank you! Your message has been sent successfully. I'll get back to you soon.",
    error:
      'Oops! There was an error sending your message. Please try again or contact me directly.',
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      messageRequired: 'Message is required',
    },
  },
}
