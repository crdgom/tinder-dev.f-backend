import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class skills extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_skills: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    skill_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'skills',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "skills_pkey",
        unique: true,
        fields: [
          { name: "id_skills" },
        ]
      },
    ]
  });
  }
}



/* const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skills', {
    id_skills: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    skill_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'skills',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "skills_pkey",
        unique: true,
        fields: [
          { name: "id_skills" },
        ]
      },
    ]
  });
};
 */