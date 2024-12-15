const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Tenant extends Model {
    static associate(models) {
      Tenant.belongsTo(models.Property, {
        foreignKey: 'propertyId',
        as: 'property'
      });
      Tenant.belongsTo(models.Unit, {
        foreignKey: 'unitId',
        as: 'unit'
      });
    }
  }

  Tenant.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'id'
      }
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'units',
        key: 'id'
      }
    },
    moveInDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      defaultValue: 'Active'
    },
    rentStatus: {
      type: DataTypes.ENUM('Paid', 'Pending'),
      defaultValue: 'Pending'
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
    modelName: 'Tenant',
    tableName: 'tenants'
  });

  return Tenant;
};
