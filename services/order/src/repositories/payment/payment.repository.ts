import {dataSource} from './swagger.datasource';

/* tslint:disable no-any */
export class PaymentRepository {
  model: any;

  constructor() {
    this.model = dataSource.createModel('PaymentService', {});
  }

  async createPayment(paymentInstance: {
    id: string;
    orderId: string;
    paymentService: string;
    paymentId: string;
  }) {
    return await this.model.create({body: paymentInstance});
  }
}

/* tslint:enable no-any */
