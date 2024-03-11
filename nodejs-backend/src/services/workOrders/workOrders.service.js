const { WorkOrders } = require('./workOrders.class');
const createModel = require('../../models/workOrders.model');
const hooks = require('./workOrders.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/workOrders', new WorkOrders(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('workOrders');

  service.hooks(hooks);
};