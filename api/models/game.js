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
      values: ['War'],
    },
    status: {
      type: DataTypes.ENUM,
      values: ['created', 'completed', 'ongoing'],
      defaultValue: 'created',
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
    },
    //automatically gets gameId for SSE subscription
    gameplay: {
      type: DataTypes.JSON, //array of card values
      //get suit card.slice(0, 1), get value card.slice(1)
      defaultValue: {
        cards: [
          'D1',
          'D2',
          'D3',
          'D4',
          'D5',
          'D6',
          'D7',
          'D8',
          'D9',
          'D10',
          'D11',
          'D12',
          'D13',
          'S1',
          'S2',
          'S3',
          'S4',
          'S5',
          'S6',
          'S7',
          'S8',
          'S9',
          'S10',
          'S11',
          'S12',
          'S13',
          'C1',
          'C2',
          'C3',
          'C4',
          'C5',
          'C6',
          'C7',
          'C8',
          'C9',
          'C10',
          'C11',
          'C12',
          'C13',
          'H1',
          'H2',
          'H3',
          'H4',
          'H5',
          'H6',
          'H7',
          'H8',
          'H9',
          'H10',
          'H11',
          'H12',
          'H13',
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
