module.exports = function(sequelize, DataTypes) {
  var user_data = sequelize.define("user_data", {
   uname:{
     type:DataTypes.STRING,
     allowNull:False,
     primaryKey:TRUE
   },
   password:{
     type:DataTypes.STRING,
     allowNull:False,
     len:[8,16]
   },
   fav_genre:{
     type:DataTypes.TEXT
   },
   rainy_choices:DataTypes.TEXT,
   cloudy_choices:DataTypes.TEXT,
   sunny_choices:DataTypes.TEXT,

  });
  return user_data;
};
