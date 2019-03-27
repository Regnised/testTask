import {DataSourceConstructor, DataSourceType} from '@loopback/repository';
import {orderDefinition} from './order.repository.api';

export const dataSource: DataSourceType = new DataSourceConstructor(
  'OrderService',
  {
    connector: 'loopback-connector-swagger',
    spec: orderDefinition,
  },
);
