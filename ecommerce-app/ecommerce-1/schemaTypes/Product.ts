export const Product = {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
    },
    {
      name: 'price',
      title: 'price',
      type: 'number',
    },
    {
      name: 'image1',
      title: 'Image 1',
      type: 'image',
    },
    {
      name: 'image2',
      title: 'Image 2',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'isNew',
      title: 'Is New',
      type: 'boolean',
    },
    {
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
    },
    {
      name: 'isTrending',
      title: 'Is Trending',
      type: 'boolean',
    },
    {
      name: 'oldPrice',
      title: 'Old price',
      type: 'number',
    },
  ],
}
