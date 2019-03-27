import {api} from '@loopback/rest';
import {def} from './order.controller.api';
import {OrderRepository, PaymentRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Order} from '../models';
import {Filter, Where} from '@loopback/repository/src/query';

@api(def)
export class OrderController {
  paymentRepository: PaymentRepository;

  constructor(
    @repository('OrderRepository')
    private orderRepository: OrderRepository,
  ) {
    this.paymentRepository = new PaymentRepository();
  }

  async getOrder(id: string): Promise<Order> {
    return await this.orderRepository.findById(id);
  }

  async getOrders(filter?: Filter | string): Promise<Order[]> {
    if (typeof filter === 'string') {
      filter = JSON.parse(filter) as Filter;
    }
    return await this.orderRepository.find(filter);
  }

  async createOrder(orderInstance: {
    id: string;
    orderNumber: string;
    price: number;
    productName: string;
    quantity: number;
  }) {
    orderInstance.id = (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).toString();
    await this.paymentRepository.createPayment({
      id: (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).toString(),
      orderId: orderInstance.id,
      paymentService: 'PayPal',
      paymentId: (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).toString(),
    });
    return await this.orderRepository.create(orderInstance);
  }

  async updateOrder(data: {status: string, id: string}) {
    return await this.orderRepository.updateAll({status: data.status}, {id: data.id});
  }

  async cancelOrder(data: {id: string}) {
    return await this.orderRepository.updateAll({status: 'cancelled'}, {id: data.id});
  }

}
