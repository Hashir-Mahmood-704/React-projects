export const Comment = {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'referenceToUser',
      title: 'Reference to User',
      type: 'referenceToUser',
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
  ],
}
