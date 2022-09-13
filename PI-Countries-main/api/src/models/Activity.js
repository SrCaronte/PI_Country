const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Activity',{
       
        name:{
            type: DataTypes.STRING,
            defaultValue: "not have name",
            allowNull:false
        },
        difficulty:{
            type: DataTypes.ENUM('1','2','3','4','5'),
            allowNull:false
    
        },
        duration:{
            type: DataTypes.STRING,
            allowNull:false
        },
        season:{
            type: DataTypes.ENUM('summer','fall','winter','spring'),
            allowNull:false
        }
    },{
        timestamps: false
    })
}

/*
ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)
*/ 