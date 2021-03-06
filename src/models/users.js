const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs")

module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
}

class users extends Sequelize.Model {
  static associate(models){
    users.hasMany(models.participants, { as: "participants", foreignKey: "user_id"});
    users.hasMany(models.messages, { as: "messages", foreignKey: "sender_id"});
  }
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "users_email_key"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: "users_phone_key"
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    hooks: {
      beforeCreate: (user, options) => {
        // Cada vez que insertemos un usuario en la base de datos ->
        // Vamos a encriptar la contraseña
        const hash = bcrypt.hashSync(user.password, 8)
        user.password = hash
      }
    },
    timestamps: true,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_phone_key",
        unique: true,
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return users;
  }
}
