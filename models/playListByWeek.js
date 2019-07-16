module.exports = function(sequelize, DataTypes) {
    var playListByWeek = sequelize.define("playListByWeek", {
     id:DataTypes.INTEGER,
     day:DataTypes.STRING,
     playList:DataTypes.STRING,
    });
    return playListByWeek;
  };
  