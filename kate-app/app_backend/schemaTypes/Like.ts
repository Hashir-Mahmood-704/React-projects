export const Like = {
  name: 'like',
  title: 'Like',
  type: 'document',
  fields: [
    {
      name: 'referenceToUser',
      title: 'Reference to User',
      type: 'referenceToUser',
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
  ],
}
