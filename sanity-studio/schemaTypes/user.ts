import {defineArrayMember, defineField, defineType} from 'sanity'

// username, name, avatar, email, reviews, ratings
export const user = defineType({
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    defineField({
      title: 'Username',
      name: 'username',
      type: 'string',
    }),
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
    }),
    defineField({
      title: 'avatar',
      name: 'Avatar',
      type: 'string',
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
      title: 'Following',
      name: 'following',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [
            {
              type: 'user',
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      title: 'Followers',
      name: 'followers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [
            {
              type: 'user',
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      title: 'Collection',
      name: 'collection',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'movie',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
})
