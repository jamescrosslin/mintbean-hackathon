'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { through: 'GameUsers' });
    }
  }
  const props = {
    typeOfGame: {
      type: DataTypes.ENUM,
      values: ['War', 'WarPlus'],
    },
    state: {
      type: DataTypes.ENUM,
      values: ['created', 'completed', 'ongoing'],
      defaultValue: 'created',
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
    },
    //automatically gets gameId for SSE subscription
    deck: {
      type: DataTypes.JSON, //array of card values
      //get suit card.slice(-1), get value card.slice(0, -1)
      defaultValue: {
        cards: [
          '1d',
          '2d',
          '3d',
          '4d',
          '5d',
          '6d',
          '7d',
          '8d',
          '9d',
          '10d',
          '11d',
          '12d',
          '13d',
          '1s',
          '2s',
          '3s',
          '4s',
          '5s',
          '6s',
          '7s',
          '8s',
          '9s',
          '10s',
          '11s',
          '12s',
          '13s',
          '1c',
          '2c',
          '3c',
          '4c',
          '5c',
          '6c',
          '7c',
          '8c',
          '9c',
          '10c',
          '11c',
          '12c',
          '13c',
          '1h',
          '2h',
          '3h',
          '4h',
          '5h',
          '6h',
          '7h',
          '8h',
          '9h',
          '10h',
          '11h',
          '12h',
          '13h',
        ],
      },
    },
  };

  for (let prop in props) {
    const msg = `${prop} must have a value`;
    props[prop] = {
      ...props[prop],
      allowNull: false,
      validate: { notNull: { msg }, notEmpty: { msg } },
    };
  }

  Game.init(props, {
    sequelize,
  });
  return Game;
};
