const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      validate: { allowNull: false },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: { allowNull: false },
    },
    dob: {
      type: DataTypes.DATEONLY,
      validate: { allowNull: false, notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING,
      validate: { allowNull: false, unique: true },
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user'],
      defaultValue: 'user',
    },
    password: {
      type: DataTypes.STRING,
      validate: { allowNull: false, notEmpty: true },
    },
    passwordConfirm: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: { allowNull: false, notEmpty: true },
    },
  });

  User.beforeSave(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 13);
    user.password = hashedPassword;
    user.passwordConfirm = undefined;
  });

  User.checkPassword = (user, password) => {
    return bcrypt.compare(password, user.password);
  };

  return User;
};
