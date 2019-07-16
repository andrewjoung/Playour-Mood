module.exports = function(sequelize, DataTypes) {
    var favoriteSongs = sequelize.define("favoriteSongs", {
      uname:DataTypes.STRING,
     song:DataTypes.STRING
    });
    favoriteSongs.belongsTo(user_data);
    return  favoriteSongs;
    
  };
  