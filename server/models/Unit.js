const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Unit extends Model {
    static associate(models) {
      Unit.belongsTo(models.Property, {
        foreignKey: 'propertyId',
        as: 'property'
      });
      Unit.hasOne(models.Tenant, {
        foreignKey: 'unitId',
        as: 'tenant'
      });
    }
  }

  Unit.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Occupied', 'Vacant', 'Maintenance'),
      defaultValue: 'Vacant'
    },
    rent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Unit',
    tableName: 'units'
  });

  return Unit;
};
