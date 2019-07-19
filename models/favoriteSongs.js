module.exports = function(sequelize, DataTypes) {
    var favoriteSongs = sequelize.define("favoriteSongs", {
      uname:DataTypes.STRING,
     song:DataTypes.STRING,
     weather:DataTypes.STRING,
     artist:DataTypes.STRING,
     url:DataTypes.TEXT
    },{
      timestamps:false
    });
   
    return  favoriteSongs;
    
  };
  