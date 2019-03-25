import {Entity, model} from '@loopback/repository';
import {orderDefinition} from './order.definition';

@model(orderDefinition)
export class Order extends Entity {}
