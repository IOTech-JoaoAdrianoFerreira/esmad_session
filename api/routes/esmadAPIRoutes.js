'use strict';
module.exports = function(app) {
  var esmad_controller = require('../controllers/esmadAPIController');

  app.route('/records')
    .get(esmad_controller.list_all_records)
    .post(esmad_controller.create_record);

  app.route('/records/:recordId')
    .get(esmad_controller.list_record)
    .put(esmad_controller.update_record)
    .delete(esmad_controller.delete_record);
};