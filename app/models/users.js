const employees = require('./employees');

module.exports = function (sequelize, DataTypes) {
  const usersSchema = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email-id required',
          },
          isEmail: {
            args: true,
            msg: 'Valid email-id required',
          },
        },
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      employees: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employees',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );

  return usersSchema;
};
