const { Inventory } = require('./inventory.class');
const createModel = require('../../models/inventory.model');
const hooks = require('./inventory.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/inventory', new Inventory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('inventory');

  service.hooks(hooks);
};