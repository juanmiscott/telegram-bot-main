module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('UserActivationToken',
    { // definicion de los campos del modelo
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "userId".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "userId".'
          }
        }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "token".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "token".'
          }
        }
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "expirationDate".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "expirationDate".'
          }
        }
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "used".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "used".'
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
      tableName: 'user_activation_tokens',
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
