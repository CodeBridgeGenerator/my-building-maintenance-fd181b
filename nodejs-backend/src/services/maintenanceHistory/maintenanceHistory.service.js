const { MaintenanceHistory } = require('./maintenanceHistory.class');
const createModel = require('../../models/maintenanceHistory.model');
const hooks = require('./maintenanceHistory.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/maintenanceHistory', new MaintenanceHistory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('maintenanceHistory');

  service.hooks(hooks);
};