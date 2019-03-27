import {DataSourceConstructor, DataSourceType} from '@loopback/repository';
import {paymentDefinition} from './payment.repository.api';

export const dataSource: DataSourceType = new DataSourceConstructor(
  'PaymentService',
  {
    connector: 'loopback-connector-swagger',
    spec: paymentDefinition,
  },
);
