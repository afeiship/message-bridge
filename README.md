# message-bridge
> Web/h5/mp bridge for web/mp.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
yarn add @jswork/message-bridge
```

## usage
```js
import messageBridge from '@jswork/message-bridge';

// Register a handler for incoming messages
messageBridge.registerHandler('message:in', (data, responseCallback) => {
  console.log('Received data:', data);
  // Send response back
  responseCallback({ status: 'success' });
});

// Send a message and handle the response
messageBridge.callHandler('message:out', { type: 'request', payload: 'Hello!' }, (response) => {
  console.log('Got response:', response);
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/message-bridge/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/message-bridge
[version-url]: https://npmjs.org/package/@jswork/message-bridge

[license-image]: https://img.shields.io/npm/l/@jswork/message-bridge
[license-url]: https://github.com/afeiship/message-bridge/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/message-bridge
[size-url]: https://github.com/afeiship/message-bridge/blob/master/dist/message-bridge.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/message-bridge
[download-url]: https://www.npmjs.com/package/@jswork/message-bridge
