import React from "react";
import {useState, useEffect } from "react";
import {Link,useHistory} from "react-router-dom";
import { getAllActivity, getAllCountries,createActivity } from "../actions/actions"; 
import { useDispatch, useSelector } from "react-redux";
import s from "./AddActivity.module.css"



function validateForm(input){
    let errors = {};
    if(!input.name) {
        errors.name = 'Name is require'
    }
    if(!input.country.length > 1 ){
        errors.country = 'Select one country'
    }
    return errors
}


export default function AddActivity(){
    const dispatch = useDispatch()
    const history = useHistory() // ← redirigue al usuario automaticamente a la ruta donde se extablesca 
    const allCountries = useSelector((state)=> state.allCountries ).sort((a, b) => {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    });

    const [errors, setErrors] = useState({})

    const[input, setInput]=useState({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        country:[]
    })


    useEffect(()=>{
        dispatch(getAllCountries())
        dispatch(getAllActivity())
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateForm({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleSelectCountry(id){
        setInput({
          ...input,
          country:[ ...input.country, id.target.value]
        })
        setErrors(validateForm({
            ...input,
            [id.target.name]: id.target.value
        }))
    }

    function handleSelectSeaseon(e){
        setInput({
            ...input,
            season:e.target.value
        })
    }

    function handleSelectDifficulty(e){
        setInput({
            ...input,
            difficulty: e.target.value
        })
    }

    function handleDeleteCountryName(e){
        let repeatedTemps = input.temperament.find(t => t === e.target.value)
        // let justThreeTemps = input.temperament.length ← controla la cantidad
        if (repeatedTemps){
            setInput({
                ...input
            })
        // }
        // else if (justThreeTemps > 2){
        //     setInput({
        //         ...input
        //     })
        }
        else {
            setInput({
                ...input,
                country: input.country.filter(country => country !== e)
            })
    }}

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createActivity(input))
        alert("the activity was created successfully 👍")
        setInput({
            name:'',
            difficulty:'',
            duration:'',
            season:'',
            country:[]
        })
        history.push('/home')
    }

    const difficulty =[1, 2, 3, 4, 5];
    const season = ['winter', 'spring', 'autumn', 'summer'];
    
    return(
        <div className={s.container}>
            <form className={s.form} onSubmit={(e)=>handleSubmit(e)}>
            <Link to='/home'>
                <button className={s.boton}>Go Back</button>
            </Link>
            <h1 className={s.title}>Create Activity</h1>
            <div className={s.label}>
                <div>
                    <label className={s.titlesfrom}>Activity:</label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} placeholder="name activity...?" required/>
                    {errors.name && (
                        <p className={s.errors}>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className={s.titlesfrom}>Difficulty:</label>
                    <select onChange={(e)=>handleSelectDifficulty(e)} required>
                        <option value="" hidden>Choose an Option</option>
                        {difficulty.map(e=>(
                            <option value={e} name="difficulty" >{e}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={s.titlesfrom}>Duration:</label>
                    <input type="text" value={input.duration} name="duration" onChange={handleChange} placeholder="Give it a Duration...?" required/>
                </div>
                <div>
                    <label className={s.titlesfrom}>Season:</label>
                    <select onChange={(e)=>handleSelectSeaseon(e)} required>
                        <option value="" hidden>Choose an Option</option>
                        {season.map(e=>(
                            <option value={e} name="difficulty">{e}</option>
                       ))}
                    </select>
                </div>
                <div>
                    <label className={s.titlesfrom}>Country:</label>
                    <select onChange={(e)=>handleSelectCountry(e)} required>
                        <option value="" hidden>Select Country</option>
                        {allCountries.map(e=>(
                            <option value={e.name} name="countries" key={e.id}>{e.name}</option>
                        ))}
                    </select>
                    {/* {errors.country && (
                        <p className={s.errors}>{errors.country}</p>
                    )} */}
                    <ul>
                        <li className={s.li}>{input.country.map(country=>
                            <div>
                                {country}
                                <button onClick={() => handleDeleteCountryName(country)} type="button">X</button>
                                {console.log(input.country)}
                            </div>)}</li>
                    </ul>
                </div>
             </div>
             { errors.name ?
              <h3 className={s.errors}>missing required fields</h3>
            : <button className={s.boton} type="submit">Add Activity</button>
             }  
            </form>
        </div>
    )
}