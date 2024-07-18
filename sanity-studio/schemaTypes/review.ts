import {defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    }),
    defineField({
      title: 'CreatedAt',
      name: 'createdAt',
      type: 'datetime',
    }),
    defineField({
      title: 'updatedAt',
      name: 'updatedAt',
      type: 'datetime',
    }),
    defineField({
      title: 'Movie',
      name: 'movie',
      type: 'reference',
      to: [{type: 'movie'}],
    }),
    defineField({
      title: 'content',
      name: 'content',
      type: 'text',
    }),
    defineField({
      title: 'Rating',
      name: 'rating',
      type: 'number',
    }),
  ],
})
