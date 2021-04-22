const {DataTypes} = require("sequelize");
const instance = require("../connection");

const task = instance.sequelize.define("tasks", {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('Completed', 'Not Completed'),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
        // createdAt: true,
        // updatedAt: true,
        // deletedAt: true,
        // paranoid: true,
        // tableName: "tasks"
});

exports.model = task;