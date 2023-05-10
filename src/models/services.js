import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class services extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_services: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'id_person'
      }
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company',
        key: 'id_company'
      }
    },
    service_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rate_hour: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    work_duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    work_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    work_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    work_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_status',
        key: 'id_service_status'
      }
    },
    calification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'califications',
        key: 'id_calification'
      }
    }
  }, {
    sequelize,
    tableName: 'services',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "services_pkey",
        unique: true,
        fields: [
          { name: "id_services" },
        ]
      },
    ]
  });
  }
}



/* const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('services', {
    id_services: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'id_person'
      }
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company',
        key: 'id_company'
      }
    },
    service_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rate_hour: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    work_duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    work_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    work_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    work_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_status',
        key: 'id_service_status'
      }
    },
    calification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'califications',
        key: 'id_calification'
      }
    }
  }, {
    sequelize,
    tableName: 'services',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "services_pkey",
        unique: true,
        fields: [
          { name: "id_services" },
        ]
      },
    ]
  });
};
 */