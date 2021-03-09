const router = require('express').Router();

module.exports = function () {
  const employees = require('../controllers/employees');

  router.get('/', employees.getUsers);

  return router;
};
