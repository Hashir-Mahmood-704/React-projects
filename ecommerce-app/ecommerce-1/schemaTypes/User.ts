export const User = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'cart',
      title: 'Cart',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'productId',
              title: 'Product Id',
              type: 'string',
            },
            {
              name: 'productTitle',
              title: 'Product Title',
              type: 'string',
            },
            {
              name: 'productImage',
              title: 'Product Image',
              type: 'string',
            },
            {
              name: 'productPrice',
              title: 'Product Price',
              type: 'number',
            },
            {
              name: 'productQuantity',
              title: 'Product Quantity',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
}
