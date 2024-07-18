import {defineArrayMember, defineField, defineType} from 'sanity'

export const movie = defineType({
  name: 'movie',
  title: 'Movie',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Genres',
      name: 'genres',
      type: 'array',
      of: [
        {
          type: 'string',
          name: 'genre',
        },
      ],
    }),
    defineField({
      title: 'ReleaseDate',
      name: 'releaseDate',
      type: 'date',
    }),
    defineField({
      title: 'ProductionCountries',
      name: 'productionCountries',
      type: 'string',
    }),
    defineField({
      title: 'RunTime',
      name: 'runtime',
      type: 'number',
    }),
    defineField({
      title: 'Certification',
      name: 'certification',
      type: 'string',
    }),
    defineField({
      title: 'PosterPath',
      name: 'posterPath',
      type: 'string',
    }),
    defineField({
      title: 'Overview',
      name: 'overview',
      type: 'text',
    }),
    defineField({
      title: 'Reviews',
      name: 'reviews',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [
            {
              type: 'review',
            },
          ],
        }),
      ],
    }),
    defineField({
      title: 'Cast',
      name: 'cast',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
