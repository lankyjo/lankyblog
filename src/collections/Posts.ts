import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'URL-friendly identifier (auto-generates from title if left empty)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.title
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '')
          },
        ],
      },
    },
    {
      name: 'author',
      relationTo: 'users',
      type: 'relationship',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: ['My two cents', 'random thought', 'borrowed thought'],
      defaultValue: 'My two cents',
      required: true,
    },
  ],
  timestamps: true,
}
