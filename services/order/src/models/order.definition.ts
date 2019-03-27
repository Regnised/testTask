export const orderDefinition = {
  name: 'Order',
  properties: {
    id: {
      type: 'string',
      required: true,
      id: true,
    },
    orderNumber: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    productName: {
      type: 'string',
    },
    quantity: {
      type: 'number'
    },
    status: {
      type: 'string',
      default: 'created'
    }
  },
};
