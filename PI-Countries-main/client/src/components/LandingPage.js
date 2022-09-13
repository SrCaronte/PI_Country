import React from "react";
import {Link} from "react-router-dom";
import s from "./LandingPage.module.css"

export default  function landingPage(){
    return(
        <div className={s.container}>
            <div className={s.title}>
            <h1 className={s.h1}>  ADVENTURE TIME 🛫</h1>
            </div>
            <div>
            <Link to='/home'>
            <button className={s.button}><span> START TRIP 💼 </span> </button>
            </Link>
            </div>
        </div>
    )
}