module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('UserResetPasswordToken',
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
            msg: 'Por favor, rellena el campo "Contraseña".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Constraseña".'
          }
        }
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Contraseña".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Constraseña".'
          }
        }
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Contraseña".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Constraseña".'
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
      tableName: 'user_reset_password_tokens',
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
