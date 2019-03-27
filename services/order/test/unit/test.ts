// test/unit/test.js
import 'mocha';
import {OrderController} from '../../src/controllers';
import {expect} from '@loopback/testlab';
import {OrderRepository} from '../../src/repositories';
import * as path from 'path';
import {Context} from '@loopback/context';
import {DataSourceConstructor, DataSourceType} from '@loopback/repository';

let orderCtrl: OrderController;

const testOrder = {
  id: 'test1',
  orderNumber: '1234',
  price: 1000,
  productName: 'Toronto',
  quantity: 2,
};

const brokenOrder = {
  id: 'd76asd87s',
  orderNumber: '123456',
  price: 1000,
  productName: 'Broke City',
  quantity: 1000,
};

describe('OrderController Unit Test Suite', () => {
  before(createOrderController);

  describe('OrderController.getOrders()', () => {
    it('returns an array of all orders initially', async () => {
      const result = await orderCtrl.getOrders({});
      expect(result).to.not.be.empty();
      expect(result).have.lengthOf(4);
      expect(result[0].id).to.equalOneOf([
        'CHK52321122',
        'CHK54520000',
        'CHK52321199',
        'CHK99999999',
      ]);
    });
  });

  describe('OrderController.getOrders(false)', () => {
    it('rejects promise for invalid args', async () => {
      let flag = true;
      try {
        await orderCtrl.getOrders('this should not be allowed');
      } catch (err) {
        flag = false;
      }
      expect(flag).to.be.false();
    });
  });

  describe('OrderController.getOrders({"where":{"id":"test1"}})', () => {
    it('searches and returns an empty array', async () => {
      const result = await orderCtrl.getOrders({where: {id: 'test1'}});
      expect(result).to.be.empty();
    });
  });

  describe('OrderController.createOrder(testOrder)', () => {
    it('should create an order', async () => {
      const result = await orderCtrl.createOrder(testOrder);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(testOrder));
    });
  });

  describe('OrderController.getOrders({"where":{"id":"test1"}})', () => {
    it('searches and returns newly created order', async () => {
      const result = await orderCtrl.getOrders({where: {id: 'test1'}});
      expect(result).to.not.be.empty();
      expect(result).have.lengthOf(1);
      expect(result[0].id).to.be.equal(testOrder.id);
    });
  });

  describe('OrderController.createOrder(brokenOrder)', () => {
    it('fails to create with an Invalid Order instance.', async () => {
      let works = true;
      try {
        await orderCtrl.createOrder(brokenOrder);
      } catch (err) {
        works = false;
      }
      expect(works).to.be.false();
    });
  });

  describe('OrderController.updateOrder({"id":"test1"}", {"status":"canceled"})', () => {
    it('updates an Order instance', async () => {
      const result = await orderCtrl.updateOrder(
        {
          status: 'cancelled', id: 'CHK52321122'
        }
      );
      expect(result).to.be.equal(1);
    });
  });

  describe('OrderController.updateOrder({"id":"brokenOrderountId1"}", {"status": "123")', () => {
    it('fails to update Order instance.', async () => {
      let result = await orderCtrl.updateOrder(
        {
          status: 'cancelled', id: 'CHK'}
      );

      expect(result).to.be.equal(0);
    });
  });

  describe('OrderController.getOrders({"where":{"id":"CHK52321122"}})', () => {
    it('returns Order with updated balance', async () => {
      const result = await orderCtrl.getOrders({where: {id: 'test1'}});
      expect(result).to.not.be.empty();
      expect(result).have.lengthOf(1);
      expect(result[0].id).to.be.equal(testOrder.id);
      expect(JSON.parse(JSON.stringify(result[0])).balance).to.be.equal(2000);
    });
  });

  describe('OrderController.getOrders({"where":{"id":"test1"}})', () => {
    it('returns Order with updated balance', async () => {
      const result = await orderCtrl.getOrders({where: {id: 'test1'}});
      expect(result).to.not.be.empty();
      expect(result).have.lengthOf(1);
      expect(result[0].id).to.be.equal(testOrder.id);
      expect(JSON.parse(JSON.stringify(result[0])).balance).to.be.equal(2000);
    });
  });

  describe('OrderController.deleteOrder({"id":"test1"})', () => {
    it('deletes the Order instance', async () => {
      const result = await orderCtrl.deleteOrder({id: 'test1'});
      expect(result).to.be.equal(1);
    });
  });

  describe('OrderController.deleteOrder({"id":"brokenOrderountId1"})', () => {
    it('fails to delete Order instance.', async () => {
      let result = await orderCtrl.deleteOrder({id: 'brokenOrderountId1'});
      expect(result).to.be.equal(0);
    });
  });

  describe('OrderController.deleteOrder()', () => {
    it('fails to delete Order instance.', async () => {
      let works = true;
      try {
        // tslint:disable
        const invalidArg = 'this should not be allowed' as any;
        await orderCtrl.deleteOrder(invalidArg);
        // tslint:enable
      } catch (err) {
        works = false;
      }
      expect(works).to.be.false();
    });
  });

  describe('OrderController.getOrders({"where":{"id":"test1"}})', () => {
    it('searches and returns an empty array', async () => {
      const result = await orderCtrl.getOrders({where: {id: 'test1'}});
      expect(result).to.be.empty();
    });
  });

  describe('OrderController.getOrders()', () => {
    it('returns an array of all orders afterwards', async () => {
      const result = await orderCtrl.getOrders({});
      expect(result).to.not.be.empty();
      expect(result).have.lengthOf(4);
      expect(result[0].id).to.equalOneOf([
        'CHK52321122',
        'CHK54520000',
        'CHK52321199',
        'CHK99999999',
      ]);
    });
  });
});

async function createOrderController() {
  const ctx = new Context();

  const dataSource: DataSourceType = new DataSourceConstructor('local-fs', {
    connector: 'memory',
    file: path.resolve(__dirname, 'test.data.json'),
  });

  ctx.bind('dataSources.memory').to(dataSource);

  ctx.bind('repositories.PaymentRepository').toClass(OrderRepository);

  // Bind the controller class
  // @ts-ignore
  ctx.bind('controllers.OrderController').toClass();

  // Resolve the controller
  orderCtrl = await ctx.get<OrderController>('controllers.OrderController');
}
