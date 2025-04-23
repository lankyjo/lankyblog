import type { GlobalConfig } from 'payload'
export const About: GlobalConfig = {
  slug: 'about',
  fields: [
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'aboutImage',
      label: 'About Image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
