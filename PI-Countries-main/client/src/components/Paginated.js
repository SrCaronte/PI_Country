import React from "react";
import { useState } from "react";
import s from "./Paginated.module.css"

export default function Pages ({allCountries,countriesPerPage,page}){
    const pageNumbers = []
    const [pageNum, SetPageNum]= useState(1)

    for (let i=0; i<=Math.ceil(allCountries/countriesPerPage); i++){  //son los botones de mi paginado
        pageNumbers.push(i+1)
    }
    return(
        <nav>
            <ul className={s.div}>
                <li className={s.li}>
                    <button className={s.button} onClick={()=>{if(pageNum > 1) page(pageNum - 1);if(pageNum > 1)SetPageNum(pageNum - 1)}}>
                    ⪻
                    </button>
                </li>
                {
                    pageNumbers?.map(num =>(
                        <li className={s.div} key={num}>
                            <button className={s.button} onClick={()=>page(num)}>{num}</button>
                        </li>
                    ))}
                           <li className={s.li}>
                    <button className={s.button} onClick={() => {if(pageNum < pageNumbers.length) page(pageNum + 1); if(pageNum < pageNumbers.length) SetPageNum(pageNum + 1)}}>
                    ⪼
                    </button>
                </li>
            </ul>
        </nav>
    )
}