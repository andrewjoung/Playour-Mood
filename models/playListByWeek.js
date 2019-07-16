module.exports = function(sequelize, DataTypes) {
    var playListByWeek = sequelize.define("playListByWeek", {
    uname:DataTypes.STRING,
     day:DataTypes.STRING,
     playList:DataTypes.STRING,
    });
    playListByWeek.belongsTo(user_data);
    return playListByWeek;
  };
  