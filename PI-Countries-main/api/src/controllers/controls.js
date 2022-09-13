const axios = require ('axios');
const {Activity, Country} = require('../db');
/*
forma de llamar los datos de la api y 
guardalos con el metodo bulkCreate en la base de datos 
*/

const saveDateApiInDb = async ()=>{
    let urlApi = await axios.get('https://restcountries.com/v3/all');
    let infoDd = await Country.findAll()
    if(infoDd.length === 0){                               //  <--  validacion para  que no se creen clones de los paises en Db 
        let infoApi = await urlApi.data.map((country)=>{
            return {
                id: country.cca3,
                name: country.name.common,
                flag: country.flags[1],
                region: country.region,
                capital: country.hasOwnProperty('capital')? country.capital[0] : 'unknown capital',   // <-- si alguna valor es nulo hay que crear un valor por defalut a la hora de llamarlo o un Db 
                subregion: country.hasOwnProperty('subregion')? country.subregion : 'unknown subregion',
                area: country.area,
                population: country.population
            }
    })
    infoDd = await Country.bulkCreate(infoApi,)
    // return infoApi
}
    let fullData = await Country.findAll({include:Activity})
    // return  infoDd 
    return fullData
}

const getCountryName = async (name)=>{
    const countrys = await Country.findAll({include: Activity})
    const countryName = countrys.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    return countryName
}

const getCountryId = async(id)=>{
    let codeInMayus = id.toUpperCase() 
    let country

    if(codeInMayus.length > 1){
    
        country=  await Country.findByPk(codeInMayus, {include: Activity})
        
        country = {
            id: country.id,
            name: country.name,
            flag: country.flag,
            region: country.region,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
            activities: country.Activities.map((info)=>{
                return{
                    id: info.id,
                    name: info.name,
                    difficulty: info.difficulty,
                    duration: info.duration, 
                    season: info.season 
                }
            }) 
        }
    }
    
    // console.log(country)
    return [country]

    // const country = await Country.findAll({
    //     where: {id: id.toUpperCase()},
    //     include: Activity
    // })
    // console.log(country)
    // return country
     
    // let codeInMayus = id.toUpperCase() 
    // let countries = await Country.findOne({
    //     where:{
    //         id: codeInMayus
    //     }
    // })
    // console.log(countries)
    // return countries 

}


module.exports = {
    saveDateApiInDb,
    getCountryName,
    getCountryId,
   
}