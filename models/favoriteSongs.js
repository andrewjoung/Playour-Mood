module.exports = function(sequelize, DataTypes) {
    var favoriteSongs = sequelize.define("favoriteSongs", {
      uname:DataTypes.STRING,
     song:DataTypes.STRING
    },{
      timestamps:false
    });
   
    return  favoriteSongs;
    
  };
  