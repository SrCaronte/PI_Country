import React from "react";
import {useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {
    getAllCountries,
    getAllActivity,
    filterByRegion,
    filterByPopulation,
    filterByAlphabetically,
    filterByActivity,

} from "../actions/actions";
import Card from "./Card"
import Pages from "./Paginated";
import SearchBar from "./SearchBar";
import s from "./Home.module.css";


export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state)=> state.allCountries );
    const activities = useSelector((state)=> state.activities)
   
   
    const [currentPage, setcurrentPague] = useState(1) // estado inicial  C
    const [render,setRender]=useState("") //← es para re renderizar las cards de los countries por si estoy en la paguina (1)

    const [countriesPerPage, setCountriesPerPage] = useState(9) // cantidad de paises por paginado
    const lastCountry = currentPage * countriesPerPage // para saber donde termina un paginado de paises por index
    const firstCountry = lastCountry - countriesPerPage // para saber donde comienza un paguinade paises por index
    const currentCountries = allCountries.slice(firstCountry, lastCountry) // me traigo solo la cantidad de paises que necesito por paginado

    const page = (pageNumber) => {
        setcurrentPague(pageNumber)
    }


// montamos la action que va traer todo la info del back 
    useEffect(()=>{
        dispatch(getAllCountries())
        dispatch(getAllActivity()) 
    },[dispatch])



// creamos  un controlador para reiniciar la paguina   
    function handleClick(e){
    e.preventDefault();
    dispatch(getAllCountries()) 
    }

    function handleFilterByRegion(e){
        dispatch(filterByRegion(e.target.value))
        setcurrentPague(1)
        setRender(e.target.value)
    }

 

    function handleFilterByPopulation(e){
        dispatch(filterByPopulation(e.target.value))
        setcurrentPague(1)
        setRender(e.target.value)
    }

    function handlefilterByAlphabetically(e){
        dispatch(filterByAlphabetically(e.target.value))
        setcurrentPague(1)
        setRender(e.target.value)
    
    }

    function handlefilterByActivities(e){
        dispatch(filterByActivity(e.target.value))
        setcurrentPague(1)
        setRender(e.target.value)
    }

       
  


    return(
        <div> 
            <h1 className={s.h1}>COUNTRIES</h1>
            <div className={s.nav}>
            <button onClick = {e =>{handleClick(e)}} className={s.boton}> Reload Countries</button>
            <SearchBar/>   
            <Link to="/activity"><button className={s.boton}>Add Activity</button></Link>
            </div>

           
            <div>
                <div className={s.filters}>
                <select onChange={e => {handleFilterByRegion(e)}} className={s.select}>
                  <option value="All">Todos</option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="Americas">Americas</option>
                  <option value="Europe">Europa</option>
                  <option value="Antarctic">Antartica</option>
                  <option value="Oceania">Oceania</option>
                  <option value="A">A</option>
                </select>
            
                <select onChange={e => {handlefilterByActivities(e)}} className={s.select}>
                  <option value="All">Todas</option>
                  {activities?.map(e=>(
                    <option value={e} >{e[0].toUpperCase() + e.substring(1)}</option>
                  ))}
                </select>
                <select onChange={e =>{handleFilterByPopulation(e)}} className={s.select}>
                  <option value="Min">Min population</option>
                  <option value="Max">Max population</option>
                </select>
                <select onChange={e => {handlefilterByAlphabetically(e)}} className={s.select}>
                    <option value="Asc">A-Z</option>
                    <option value="Desc">Z-A</option>
                </select>
                </div>
     

               <Pages countriesPerPage = {countriesPerPage} allCountries={allCountries.length} page={page}/>
                <div>  
                {
                    currentCountries ? currentCountries.map(info=>{
                        return(
                           <Link key={info.id} to={'/detail/'+ info.id}>
                            <Card key={info.id} name={info.name} flag={info.flag} region={info.region}  id={info.id} />
                           </Link> 
                        )
                    })
                    : <div>loading...</div>
                }
                </div>
            </div>
        </div>
    )
    
}