import React from "react";
import s from "./Card.module.css"

export default function Card({flag,name,region, id}){
    return(
        <div className={s.container}>
        <div className={s.orden}> 
        <div>
           <h1>{id}</h1>
        </div> 
        <div>
            <h2> {name || "no tiene nombre"}</h2>
        </div>
        <div>
            <img src={flag} alt='este pais no tiene bandera' width="300px" height="200px"/>  
        </div>
        </div>  
        <div>
            <h3 className={s.continente}>{region || "no tiene region X-X"}</h3>
        </div>
    </div>
        )
}