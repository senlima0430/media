const Sequelize = require('sequelize')

export class Video extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        filePath: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        thumbnailPath: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: 'video',
        freezeTableName: true,
        sequelize,
      }
    )
  }
}
