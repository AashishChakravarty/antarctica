const jwt = require('jsonwebtoken');
const models = require('../models');
const { users, employees } = models;

module.exports.registration = async (req, res) => {
  const organizationName = req.body.organization;
  var condition = { organizationName };
  const [data, created] = await employees.findOrCreate({
    where: condition,
  });

  const values = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    employees: data.id,
    password: req.body.password,
  };

  users
    .create(values)
    .then((result) => {
      result.organizationName = data.organizationName;
      var response = {
        employeeID: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        organizationId: data.id,
        organizationName: data.organizationName,
      };
      res.json({
        status: true,
        message: 'user created',
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        status: false,
      });
    });
};

module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  users.belongsTo(employees, { foreignKey: 'employees' });
  employees.hasMany(users, { foreignKey: 'employees' });
  users
    .findOne({
      where: { email, password },
      attributes: [['id', 'employeeId'], 'firstName', 'lastName', 'email'],
      include: [
        {
          model: employees,
          attributes: [['id', 'organizationId'], 'organizationName'],
          required: true,
        },
      ],
    })
    .then((result) => {
      if (result) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(
          {
            employeeId: result.employeeId,
            email: result.email,
          },
          secretKey,
          { expiresIn: '365d' }
        );
        res.json({
          status: true,
          message: 'Successfully login',
          data: { ...JSON.parse(JSON.stringify(result)), token },
        });
      } else {
        res.json({
          status: false,
          message: 'wrong email and password',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        status: false,
      });
    });
};
