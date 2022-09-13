import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ALL_ACTIVITY = "GET_ALL_ACTIVITY"
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRY_BY_ID ="GET_COUNTRY_BY_ID"
export const CREATE_ACTIVITY = "CREATE_ACTIVITY"
export const FILTER_BY_REGION = "FILTER_BY_REGION";
export const FILTER_BY_POPULATION = "FILTER_BY_POPULATION";
export const FILTER_BY_ALPHABETICALLY = "FILTER_BY_ALPHABETICALLY";
export const FILTER_BY_ACTIVITY="FILTER_BY_ACTIVITY"
export const FILTER_TWO_REGION="FILTER_TWO_REGION"



// export function getAllCountries(){                        //llamo toda la informacion que tengo de los paises desde back 
//     return function (dispatch){
//         return fetch("http://localhost:3001/countries")
//         .then((r)=> r.json())
//         .then(json => dispatch({
//             type: GET_ALL_COUNTRIES,
//             payload: json 
//         }))
//         .catch((err)=>{console.log(err)})
//     }
// }

export function getAllCountries(){
    return  async function(dispatch){
        try {
            let json= await axios("http://localhost:3001/countries")
            return dispatch({
                type: GET_ALL_COUNTRIES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    } 
}

export function getAllActivity(){                // llamo los nombres de mi actividades  
    return function(dispatch){
        return fetch("http://localhost:3001/activities")
        .then((r)=>r.json())
        .then(json => dispatch({
            type: GET_ALL_ACTIVITY,
            payload: json
        }))
    }
}

export function createActivity(payload){
    return  function (dispatch) {
        axios.post("http://localhost:3001/activities", payload)
        .then((json)=> dispatch({
            type:CREATE_ACTIVITY,
            payload:json
        }))
        .catch((err)=>{window.alert(err.response.data)})
    }

}

export function getCountriesByName(name){
    return function(dispatch){
        return fetch(`http://localhost:3001/countries?name=${name}`)
        .then((r)=> r.json())
        .then(json => dispatch({
            type: GET_COUNTRIES_BY_NAME,
            payload: json
        }))
    // .catch(alert(`no existe ese ${name}`))  //← el alert que muestra si se rompe
    }
}

export function getDetail(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/countries/${id}`)
        .then((res)=> res.json())
        .then(json =>dispatch({
            type:GET_COUNTRY_BY_ID,
            payload: json
        }))
    }
}

export function filterByRegion(payload){     // los trae por continente
    return{
       type: FILTER_BY_REGION,
       payload
    }
}

export function filterByPopulation(payload){   // los trae segun la cantidad de poblacion
    return{
        type: FILTER_BY_POPULATION,
        payload
    }
}

export function filterByAlphabetically(payload){    //los trae de A-Z o Z-A
    return{
        type: FILTER_BY_ALPHABETICALLY,
        payload
    }
}

export function filterByActivity(payload){  //los trae por actividad 
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}


