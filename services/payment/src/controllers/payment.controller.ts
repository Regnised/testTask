import {api} from '@loopback/rest';
import {def} from './payment.controller.api';
import {repository} from '@loopback/repository';
import {Payment} from '../models';
import {PaymentRepository} from '../repositories/';
import {Filter} from '@loopback/repository/src/query';

@api(def)
export class PaymentController {
  constructor(
    @repository('PaymentRepository')
    private paymentRepository: PaymentRepository,
  ) {}

  async getPayment(id: string): Promise<Payment> {
    return await this.paymentRepository.findById(id);
  }

  async getPayments(filter?: Filter | string): Promise<Payment[]> {
    if (typeof filter === 'string') {
      filter = JSON.parse(filter) as Filter;
    }
    return await this.paymentRepository.find(filter);
  }
}
