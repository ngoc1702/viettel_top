import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const packageType = defineType({
  name: 'package',
  title: 'Package',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'traffic',
      type: 'string',
    }),
    defineField({
      name: 'price',
      type: 'string',
    }),
    defineField({
      name: 'time',
      type: 'string',
    }),

    defineField({
      name: "gallery", // Tên trường
      title: "Gallery", // Tiêu đề hiển thị
      type: "array", // Kiểu dữ liệu là mảng
      of: [
        {
          type: "image", 
          options: {
            hotspot: true, 
          },
          // fields: [
          //   {
          //     name: "caption",
          //     type: "string",
          //     title: "Caption",
          //     options: {
          //       isHighlighted: true, 
          //     },
          //   },
          // ],
        },
      ],
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'categories',
       type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),

    defineField({
      name: 'sub_categories',
       type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'sub_category'}})],
    }),

    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
