const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Location = require('./location');

require('dotenv').config({ path: '../config.env' });
const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STR}`);



const User = sequelize.define('User', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        notEmpty: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
    },
    passwordConfirm: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
});

User.beforeSave(async(user, options) => {
  hashedPassword = await bcrypt.hash(user.password, 13);
  user.password = hashedPassword;
  user.passwordConfirm = undefined;
});



User.checkPassword = async(user, password) => {
  return await bcrypt.compare(password, user.password);
};

/**************************************************RELATIONS**************************************************/

User.hasMany(Location, {as:'favorites' ,foreignKey:'locationId', foreignKeyConstraint: true});
// Location.belongsTo(User, {foreignKey:'locationId', foreignKeyConstraint: true});

/**************************************************RELATIONS**************************************************/

/*
(async () => {
  await User.sync({ force: true });
})();



validate: {
    customValidator(value) {
      if (value === null && this.age !== 10) {
        throw new Error("name can't be null unless age is 10");
      }
    })
  }
*/


module.exports = User;