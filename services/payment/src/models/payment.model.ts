import {Entity, model} from '@loopback/repository';
import {paymentDefinition} from './payment.definition';

@model(paymentDefinition)
export class Payment extends Entity {}
