const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('touristactivity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
        type: DataTypes.INTEGER,
        validate: {
            min:1,
            max:5,
        }
    },
    duration: {
        type : DataTypes.STRING //"120 minutes"  or "2 hours" in string
    },
    season: {
        type: DataTypes.ENUM('Summer', 'Spring', 'Fall', 'Winter')
    }
  });
};
