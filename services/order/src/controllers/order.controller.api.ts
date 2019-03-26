import {orderDefinition} from '../models';

export const def = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Orders Microservice',
    description:
      'This is the api for the orders service.',
  },
  paths: {
    '/orders': {
      get: {
        'x-operation-name': 'getOrders',
        parameters: [
          {
            name: 'filter',
            in: 'query',
            description:
              'The criteria used to narrow down the number of orders returned leave out for all results.',
            required: false,
            schema: {
              type: 'object',
            },
          },
        ],
        responses: {
          '200': {
            description: 'filtered orders to be returned',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Order',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/orders/{id}': {
      get: {
        'x-operation-name': 'getOrder',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Model id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
        },
      },
    },
    '/orders/create': {
      post: {
        'x-operation-name': 'createOrder',
        requestBody: {
          description: 'The order instance to create.',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Order',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
        },
        parameters: [],
      },
    },
    '/orders/update': {
      post: {
        'x-operation-name': 'updateOrder',
        parameters: [
          {
            name: 'where',
            in: 'query',
            description:
              'The criteria used to narrow down the number of orders returned.',
            required: false,
            schema: {
              type: 'object',
            },
          },
        ],
        requestBody: {
          description:
            'Order update object containing the Quantity to update with.',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Quantity',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'update information',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    count: {
                      type: 'number',
                      description: 'number of records updated',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Order: orderDefinition,
      Quantity: {
        type: 'object',
        required: ['quantity'],
        properties: {
          quantity: {
            type: 'number',
          },
        },
      },
    },
  },
};
