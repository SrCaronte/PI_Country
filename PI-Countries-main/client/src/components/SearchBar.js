import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getCountriesByName} from "../actions/actions";
import s from "./SearchBar.module.css"


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
  


    function handleSearchCountryByName(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleClickName(e){
        e.preventDefault(e) 
        if(name.length !== 0 ){
            dispatch(getCountriesByName(name)) 
        }
        if(name.length === 0){
            alert('you must enter a country （︶^︶）')
        }
        // if(name !== name.name){
        //     alert("ese pais fue destruido hace mucho ಠ_ಠ")
        // }
        
           setName("") 
        }
    
    
    return(
        <div>
            <input
            type='text'
            value={name}
            placeholder="Find a country..."
            onChange={e =>{handleSearchCountryByName(e)}}
            />
            <button className={s.lupa} type='submit'  onClick={e=>{handleClickName(e)}}>🔍</button>
        </div>
    )
}