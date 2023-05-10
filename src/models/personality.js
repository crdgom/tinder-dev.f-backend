import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class personality extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_personality: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    personality_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'personality',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "personality_pkey",
        unique: true,
        fields: [
          { name: "id_personality" },
        ]
      },
    ]
  });
  }
}



/* 
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personality', {
    id_personality: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    personality_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'personality',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "personality_pkey",
        unique: true,
        fields: [
          { name: "id_personality" },
        ]
      },
    ]
  });
};
 */