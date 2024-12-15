const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Property extends Model {
    static associate(models) {
      Property.hasMany(models.Unit, {
        foreignKey: 'propertyId',
        as: 'units'
      });
      Property.hasMany(models.Tenant, {
        foreignKey: 'propertyId',
        as: 'tenants'
      });
    }
  }

  Property.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalUnits: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    occupancyRate: {
      type: DataTypes.STRING,
      defaultValue: "0%"
    },
    monthlyRevenue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
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
    modelName: 'Property',
    tableName: 'properties'
  });

  return Property;
};
