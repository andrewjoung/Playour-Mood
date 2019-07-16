module.exports = function(sequelize, DataTypes) {
    var playList = sequelize.define("playList", {
     uname:DataTypes.STRING,
     rainy_list:DataTypes.TEXT,
     cloudy_list:DataTypes.TEXT,
     sunny_list:DataTypes.TEXT,
  
    });
    playList.belongsTo(user_data);
    return playList;
  };
  