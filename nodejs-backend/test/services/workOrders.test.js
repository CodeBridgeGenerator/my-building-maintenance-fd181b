const assert = require('assert');
const app = require('../../src/app');

describe('\'workOrders\' service', () => {
  it('registered the service', () => {
    const service = app.service('workOrders');

    assert.ok(service, 'Registered the service (workOrders)');
  });
});
