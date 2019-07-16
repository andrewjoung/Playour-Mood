module.exports = function(sequelize, DataTypes) {
    var playList = sequelize.define("playList", {
     id:DataTypes.INTEGER,
     rainy_list:DataTypes.TEXT,
     cloudy_list:DataTypes.TEXT,
     sunny_list:DataTypes.TEXT,
  
    });
    return playList;
  };
  