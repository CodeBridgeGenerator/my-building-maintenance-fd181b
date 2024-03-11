const users = require("./users/users.service.js");
const buildings = require("./buildings/buildings.service.js");
const maintenanceRequests = require("./maintenanceRequests/maintenanceRequests.service.js");
const workOrders = require("./workOrders/workOrders.service.js");
const maintenanceHistory = require("./maintenanceHistory/maintenanceHistory.service.js");
const inventory = require("./inventory/inventory.service.js");
const employee = require("./employee/employee.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(buildings);
  app.configure(maintenanceRequests);
  app.configure(workOrders);
  app.configure(maintenanceHistory);
  app.configure(inventory);
  app.configure(employee);
    // ~cb-add-configure-service-name~
};
