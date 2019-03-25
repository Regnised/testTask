import {DefaultCrudRepository, DataSourceType} from '@loopback/repository';
import {Order} from '../models';
import {inject} from '@loopback/context';

export class OrderRepository extends DefaultCrudRepository<Order, string> {
  constructor(@inject('dataSources.memory') dataSource: DataSourceType) {
    super(Order, dataSource);
  }
}
