const { MaintenanceRequests } = require('./maintenanceRequests.class');
const createModel = require('../../models/maintenanceRequests.model');
const hooks = require('./maintenanceRequests.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/maintenanceRequests', new MaintenanceRequests(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('maintenanceRequests');

  service.hooks(hooks);
};