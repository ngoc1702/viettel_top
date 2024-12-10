
  
import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const globalType = defineType({
    name: 'global',
    type: 'document',
    title: 'Global Settings',
    fields: [
      {
        name: 'globalField',
        type: 'string',
        title: 'Global Field',
        description: 'This field will be shared across all posts',
      },
    ],
})