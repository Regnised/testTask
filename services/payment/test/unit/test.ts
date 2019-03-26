import 'mocha';
import {PaymentController} from '../../src/controllers';
import {expect} from '@loopback/testlab';
import {PaymentRepository} from '../../src/repositories';
import * as path from 'path';
import {Context} from '@loopback/context';
import {DataSourceConstructor, DataSourceType} from '@loopback/repository';

let paymentCtrl: PaymentController;

// const testPayment = {
//   id: '000222333',
//   firstName: 'Harry',
//   lastName: 'Simpleton',
//   ssn: '141-XX-C900',
//   customerSince: '2017-11-04T09:04:00.000Z',
//   street: '742 Neverred Terrace',
//   state: 'TX',
//   city: 'Houston',
//   zip: '77001',
//   lastUpdated: '2017-11-04T09:04:00.000Z',
// };
//
// const brokenPayment = {
//   id: '000222333',
//   namFirst: 'Harry',
//   nameLast: 'Simpleton',
//   address: {
//     street: '742 Neverred Terrace',
//     state: 'TX',
//     city: 'Houston',
//     zip: '77001',
//   },
// };

describe('PaymentController Unit Test Suite', () => {
  before(createPaymentController);

  describe('PaymentController.getPayments("{}")', () => {
    it('returns an array of all Payments', async () => {
      const result = await paymentCtrl.getPayments('{}');
      expect(result).to.not.be.empty();
      expect(result).have.lengthOf(2);
      expect(result[0].id).to.equalOneOf(['000343222', '003499223']);
    });
  });

  describe('PaymentController.getPayments("")', () => {
    it('rejects promise for invalid args', async () => {
      let flag = true;
      try {
        await paymentCtrl.getPayments('');
      } catch (err) {
        flag = false;
      }
      expect(flag).to.be.false();
    });
  });

  describe('PaymentController.getPayments({"where": {"orderId":"CHK"}})', () => {
    it('searches and returns an empty array', async () => {
      const result = await paymentCtrl.getPayments({
        where: {'orderId': 'CHK'},
      });
      expect(result).to.be.empty();
    });
  });

  describe('PaymentController.getPayments({"where": {"orderId":"CHK52321122"}})', () => {
    it('searches and returns payment using filter', async () => {
      const filter = {where: {"orderId":"CHK52321122"}};
      const result = await paymentCtrl.getPayments(filter);
      expect(result).to.not.be.empty();
      expect(result).have.lengthOf(1);
      expect(result[0].orderId).to.be.equal(filter.where.orderId);
    });
  });

  describe('PaymentController.getPayment("{"where": {"id": 0000000000}}}")', () => {
    it('searches and returns an empty array', async () => {
      const id = '0000000000';
      const filter = {where: {id}};
      const result = await paymentCtrl.getPayments(JSON.stringify(filter));
      expect(result).to.be.empty();
    });
  });

  describe('PaymentController.getPayment("000343223")', () => {
    it('searches and returns payment using id', async () => {
      const id = '000343223';
      const result = await paymentCtrl.getPayment(id);
      expect(result).to.not.be.empty();
      expect(result.orderId).to.be.equal('CHK52321122');
      expect(result.paymentService).to.be.equal('PayPal');
    });
  });
});

async function createPaymentController() {
  const ctx = new Context();

  const dataSource: DataSourceType = new DataSourceConstructor('local-fs', {
    connector: 'memory',
    file: path.resolve(__dirname, 'test.data.json'),
  });

  ctx.bind('dataSources.memory').to(dataSource);

  ctx.bind('repositories.PaymentRepository').toClass(PaymentRepository);

  // Bind the controller class
  ctx.bind('controllers.PaymentController').toClass(PaymentController);

  // Resolve the controller
  paymentCtrl = await ctx.get<PaymentController>(
    'controllers.PaymentController',
  );
}
