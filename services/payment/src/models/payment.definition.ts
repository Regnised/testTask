export const paymentDefinition = {
  name: 'Payment',
  properties: {
    id: {
      type: 'string',
      id: true,
      required: true,
    },
    orderId: {
      type: 'string',
      required: true
    },
    paymentService: {
      type: 'string',
      required: true
    },
    paymentId: {
      type: 'string',
      required: true
    },
    webhookResult: {
      status: {
        type: 'string',
      },
      paymentId: 'string',
    },
  },
};
