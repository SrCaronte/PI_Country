import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "../reducer/reducer";
import thunk from "redux-thunk";
//      ↑ 
/* es el middelware que nos permite despachas operaciones
   asincronicas en funciones y no objetos */




export const store =  createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk)))  

// export default store;
                                                            