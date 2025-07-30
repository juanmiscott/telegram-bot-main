module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Spot',
    { // definicion de los campos del modelo
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      townId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "townId".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "townId".'
          }
        }
      },
      promoterId: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "promoterId".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "promoterId".'
          }
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "name".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "name".'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "description".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "description".'
          }
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "address".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "address".'
          }
        }
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "latitude".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "latitude".'
          }
        }
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "longitude".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "longitude".'
          }
        }
      },
      environment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "environment".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "environment".'
          }
        }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "isActive".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "isActive".'
          }
        }
      },

      createdAt: {
        type: DataTypes.DATE,
        get () {
          return this.getDataValue('createdAt')
            ? this.getDataValue('createdAt').toISOString().split('T')[0]
            : null
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get () {
          return this.getDataValue('updatedAt')
            ? this.getDataValue('updatedAt').toISOString().split('T')[0]
            : null
        }
      }
    }, { // opciones del modelo
      sequelize,
      tableName: 'spots',
      timestamps: true,
      paranoid: true, // no borres datos
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        }
      ]
    }
  )

  Model.associate = function (models) {

  }

  return Model
}
