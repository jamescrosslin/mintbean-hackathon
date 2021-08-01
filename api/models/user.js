'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Game, { through: 'GameUsers' });
    }
  }
  const props = {
    firstName: 'First name',
    lastName: 'Last name',
    emailAddress: 'Email address',
    password: 'Password',
  };

  // assigns shared values to all model properties
  for (let prop in props) {
    const msg = `${props[prop]} must have a value`;
    props[prop] = {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notNull: { msg }, notEmpty: { msg } },
    };
  }

  /* unshared props for email and password added below */
  props.emailAddress.validate.isEmail = { msg: 'Please include a valid email address' };
  props.emailAddress.unique = true;

  props.password = {
    ...props.password,
    // add method that sets the value of password after encryption
    set(val) {
      if (!val) return '';
      const hashedPassword = bcrypt.hashSync(val, 10);
      this.setDataValue('password', hashedPassword);
    },
  };

  User.init(props, {
    sequelize,
  });
  return User;
};
