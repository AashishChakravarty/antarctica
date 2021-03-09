const models = require('../models');
const { users, employees } = models;

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports.getUsers = async (req, res) => {
  const search = req.query.search;
  const order = req.query.order;
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 50;

  var condition = {};
  var orderBy = [];
  if (search) {
    condition = {
      [Op.or]: [
        { id: { [Op.like]: `%${search}%` } },
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
      ],
    };
  }
  if (order) {
    if (order === 'employeeId') {
      orderBy = [['id', 'ASC']];
    } else if (order === 'organizationName') {
      orderBy = [[sequelize.literal('employee.organizationName'), 'ASC']];
    } else {
      orderBy = [[order, 'ASC']];
    }
  }

  users.belongsTo(employees, { foreignKey: 'employees' });
  employees.hasMany(users, { foreignKey: 'employees' });
  users
    .findAll({
      where: condition,
      attributes: [['id', 'employeeId'], 'firstName', 'lastName', 'email'],
      include: [
        {
          model: employees,
          attributes: [['id', 'organizationId'], 'organizationName'],
          required: true,
        },
      ],
      order: orderBy,
      offset: skip,
      limit,
    })
    .then((result) => {
      res.json({
        status: true,
        message: 'Successfully Fetched',
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        status: false,
      });
    });
};
