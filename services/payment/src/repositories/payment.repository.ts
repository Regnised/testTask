import {DefaultCrudRepository, DataSourceType} from '@loopback/repository';
import {Payment} from '../models';
import {inject} from '@loopback/context';

export class PaymentRepository extends DefaultCrudRepository<Payment, string> {
  constructor(@inject('dataSources.memory') dataSource: DataSourceType) {
    super(Payment, dataSource);
  }
}
