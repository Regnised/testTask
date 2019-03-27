import {api} from '@loopback/rest';
import {def} from './payment.controller.api';
import {repository} from '@loopback/repository';
import {Payment} from '../models';
import {PaymentRepository, OrderRepository} from '../repositories';
import {Filter} from '@loopback/repository/src/query';

// @ts-ignore
@api(def)
export class PaymentController {
  orderRepository: OrderRepository;

  constructor(
    @repository('PaymentRepository')
    private paymentRepository: PaymentRepository,
  ) {
    this.orderRepository = new OrderRepository();
  }

  async getPayment(id: string): Promise<Payment> {
    return await this.paymentRepository.findById(id);
  }

  async getPayments(filter?: Filter | string): Promise<Payment[]> {
    if (typeof filter === 'string') {
      filter = JSON.parse(filter) as Filter;
    }
    return await this.paymentRepository.find(filter);
  }

  async createPayment(paymentInstance: {
    id: string;
    orderId: string;
    paymentService: string;
    paymentId: string;
  }): Promise<Payment> {
    let me = this;
    let response = await this.paymentRepository.create(paymentInstance);
    //Save payment result to payment data storage and change order status
    response.webhookResult = {
      status: Math.floor(Math.random() * 2) === 1 ? 'confirmed' : 'declined',
      paymentId: response.paymentId,
    };
    let newResponse = await me.paymentRepository.save(response);

    //If we get webhook payment result we can find in payment data storage the same
    //paymentId and find orderID into document. After update order status by this
    //orderID and webhookResult.status

    //Save payment webhook result to order document
    let status = (newResponse && newResponse.webhookResult.status === 'confirmed') ? 'confirmed' : 'cancelled';
    let orderId = newResponse && newResponse.orderId;
    me.orderRepository.updateOrder({status: status, id: orderId});

    function timeout() {
      setTimeout(async () => {
        //After 20 seconds we save delivered status to order
        me.orderRepository.updateOrder({status: 'delivered', id: orderId});
      }, 20000);
    }

    timeout();

    return response;
  }

}
