import {api} from '@loopback/rest';
import {def} from './order.controller.api';
import {OrderRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Order} from '../models';
import {Filter, Where} from '@loopback/repository/src/query';

@api(def)
export class OrderController {
  constructor(
    @repository('OrderRepository')
    private orderRepository: OrderRepository,
  ) {}

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
    orderNumber: string;
    price: number;
    productName: string;
  }): Promise<Order> {
    return await this.orderRepository.create(orderInstance);
  }

  async updateOrder(where: Where, data: {price: number}) {
    if (typeof where === 'string') {
      where = JSON.parse(where) as Where;
    }
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    return await this.orderRepository.updateAll(data, where);
  }

  async deleteOrder(where: Where) {
    if (typeof where === 'string') {
      where = JSON.parse(where) as Where;
    }
    return await this.orderRepository.deleteAll(where);
  }
}
