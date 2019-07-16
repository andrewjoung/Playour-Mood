module.exports = function(sequelize, DataTypes) {
    var favoriteSongs = sequelize.define("favoriteSongs", {
     id:DataTypes.INTEGER,
     song:DataTypes.STRING
    });
    return  favoriteSongs;
  };
  