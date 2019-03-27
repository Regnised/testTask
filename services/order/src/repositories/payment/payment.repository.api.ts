export const paymentDefinition = {
  swagger: '2.0',
  info: {
    title: 'payment',
    version: '1.0.0',
  },
  host: '127.0.0.1:3002',
  basePath: '/',
  schemes: ['http'],
  paths: {
    '/payment/create': {
      post: {
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            description: 'The payment instance to create.',
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/components/schemas/Payment',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Request was successful',
            schema: {
              type: 'string',
            },
          },
        },
        deprecated: false,
        operationId: 'create',
        summary: 'Create an payment instance.',
      },
    },
  }
};
