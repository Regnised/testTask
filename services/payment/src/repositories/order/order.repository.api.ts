export const orderDefinition = {
  swagger: '2.0',
  info: {
    title: 'order',
    version: '1.0.0',
  },
  host: '127.0.0.1:3101',
  basePath: '/',
  schemes: ['http'],
  paths: {
    '/orders/update': {
      post: {
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            description: 'The order instance to update.',
            schema: {
              $ref: '#/components/schemas/Order',
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
        operationId: 'updateAll',
        summary: 'Update an order instance.',
      },
    },
  },
};
