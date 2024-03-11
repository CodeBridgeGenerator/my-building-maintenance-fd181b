const assert = require('assert');
const app = require('../../src/app');

describe('\'maintenanceHistory\' service', () => {
  it('registered the service', () => {
    const service = app.service('maintenanceHistory');

    assert.ok(service, 'Registered the service (maintenanceHistory)');
  });
});
