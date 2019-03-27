import {dataSource} from './swagger.datasource';
import {Filter, Where} from '@loopback/repository/src/query';

/* tslint:disable no-any */
export class OrderRepository {
  model: any;

  constructor() {
    this.model = dataSource.createModel('OrderService', {});
  }

  async updateOrder(data: {status: string, id: string}) {
    console.log(' DATA :', data);
    return await this.model.updateAll({body: data});
  }
}

/* tslint:enable no-any */
