module.exports = function (sequelize, DataTypes) {
  const employeesSchema = sequelize.define(
    'employees',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      organizationName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'employees',
    }
  );

  return employeesSchema;
};
