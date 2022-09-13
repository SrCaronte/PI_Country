import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail,} from "../actions/actions";
import { useEffect } from "react";
import s from "./Detail.module.css"

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()



    useEffect(()=>{
        dispatch(getDetail(props.match.params.id.toLowerCase()))
    },[dispatch])
    
    const myCuntry = useSelector((state)=> state.detail)

    // console.log(myCuntry)
    
    let id = 0
    return (
        <div>
         
       { 
         myCuntry.length ? 
        
         <div className={s.container}> 
             {/* <Link to='/home'><button>Back to main Page </button> </Link> */}
             <h1> {myCuntry[0].name } </h1>
             <img  src={myCuntry[0].flag}/>
             <h5>Region: {myCuntry[0].region}</h5>
             <h5>Capital: {myCuntry[0].capital}</h5>
             <h5>SubRegion: {myCuntry[0].subregion}</h5>
             <h5>Area: {myCuntry[0].area}</h5>
             <h5>Population: {myCuntry[0].population}</h5> 
             <h3>Activities</h3>
             <div>
             {
                myCuntry[0].hasOwnProperty('activities')? myCuntry[0].activities.map(activity =>{
                    id++
                    return(
                        <div key={id}>
                            <h5>ACTIVITY:{activity.name}</h5>
                            <h5>DIFFICULTY: {activity.difficulty}</h5>
                            <h5>DURATION: {activity.duration}</h5>
                            <h5>SEASON: {activity.season}</h5>

                            
                        </div>
                        
                    )
                })
                :<div> <h2> CAN NOT FIND ACTVITIES </h2></div>
             } 
             <Link to='/home'><button className={s.boton}>Go Back</button> </Link>
             </div> 
         </div> : 
         
         <div> <h2>CAN NOT FIND  THE COUNTRY</h2> </div>
  
      }
          </div>
      )
  }