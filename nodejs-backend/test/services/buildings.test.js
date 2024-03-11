const assert = require('assert');
const app = require('../../src/app');

describe('\'buildings\' service', () => {
  it('registered the service', () => {
    const service = app.service('buildings');

    assert.ok(service, 'Registered the service (buildings)');
  });
});
