module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('PromoterCredential',
    { // definicion de los campos del modelo
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      promoterId: {
        type: DataTypes.INTEGER,
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true, // viene por defecto, no hace falta ponerlo
            msg: 'Debe ser um e-mail válido'
          },
          notNull: {
            msg: 'Por favor, rellena el campo "Email".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Email".'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "password".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "password".'
          }
        }
      },
      lastPasswordChange: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "lastPasswordChange".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "lastPasswordChange".'
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
      tableName: 'promoter_credentials',
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
