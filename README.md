# test - microservices

## Installation

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) >= 8.0.0
- [TypeScript](https://www.typescriptlang.org/index.html#download-links) >= 2.0.0 `npm i -g typescript`
- [TypeScript Node](https://github.com/TypeStrong/ts-node#installation) >= 3.0.0 `npm i -g ts-node`

```shell
git clone ...
npm i
```

## Basic use

```shell
# start all microservices
npm start

- GET http://127.0.0.1:3101/orders
Find all orders

- GET http://127.0.0.1:3101/orders/CHK52321122 Find order with ID CHK52321122

- POST http://127.0.0.1:3101/orders/create 
> Create new order. Example: {"orderNumber": "111", "price": 10000, "productName": "Lexus","quantity": 1}

- POST http://127.0.0.1:3101/orders/update?where=CHK52321122
> User can change order status {"status": "Canceled"}

#! Code memory storage includes test data. Track only created by http://127.0.0.1:3101/orders/create documents !

Stop all processes: taskkill /F /IM node.exe /T
```
> If you have errors with bin/install script:
> npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
> Note that you need to have https://git-scm.com/download/win

> Helper scripts for the above commands are in [`/bin`](https://github.com/strongloop/loopback4-example-microservices/tree/master/bin)
directory.
