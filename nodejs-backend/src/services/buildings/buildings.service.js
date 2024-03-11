const { Buildings } = require('./buildings.class');
const createModel = require('../../models/buildings.model');
const hooks = require('./buildings.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/buildings', new Buildings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('buildings');

  service.hooks(hooks);
};