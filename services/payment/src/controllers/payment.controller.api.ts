import {paymentDefinition} from '../models';

export const def = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Payment Microservice',
    contact: {},
    description:
      'This is the api for the payment service created by loopback.',
  },
  paths: {
    '/payment/create': {
      post: {
        'x-operation-name': 'createPayment',
        requestBody: {
          description: 'The payment instance to create.',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Payment',
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
                  $ref: '#/components/schemas/Payment',
                },
              },
            },
          },
        },
        parameters: [],
      },
    },
    '/payments': {
      get: {
        'x-operation-name': 'getPayments',
        tags: ['payments'],
        summary: 'Finds all payments',
        description: 'Finds all payments',
        parameters: [
          {
            name: 'filter',
            in: 'query',
            description:
              'The criteria used to narrow down the number of payment returned.',
            required: false,
            schema: {
              type: 'object',
            },
          },
        ],
        responses: {
          '200': {
            description: 'all payments to be returned',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Payment',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/payments/{id}': {
      get: {
        'x-operation-name': 'getPayment',
        tags: ['payment'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The payment id.',
            required: true,
            schema: {
              type: 'string',
              format: 'JSON',
            },
          },
        ],
        responses: {
          '200': {
            description: 'a payment to be returned',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Payment',
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
      Payment: paymentDefinition,
    },
  },
};
