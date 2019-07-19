module.exports = function(sequelize, DataTypes) {
  var user_data = sequelize.define("user_data", {
   uname:{
     type:DataTypes.STRING,
     allowNull:false,
     primaryKey:true,
     validate:{
       len:[1,30]
     }
   },
   password:{
     type:DataTypes.STRING,
     allowNull:false,
     len:[8,16]
   },
   fav_genre:{
     type:DataTypes.TEXT
   },
   rainy_choices:DataTypes.TEXT,
   cloudy_choices:DataTypes.TEXT,
   sunny_choices:DataTypes.TEXT,
<<<<<<< HEAD
  },{
    timestamps:false
  }

  );
=======
   zipcode:DataTypes.STRING

  },{
    timestamps:false
  });
>>>>>>> 52abdf42308bf1184e54072f57a05d9b173e784f
  return user_data;
};
