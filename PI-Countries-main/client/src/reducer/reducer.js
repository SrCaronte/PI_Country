import{
    GET_ALL_COUNTRIES,
    GET_ALL_ACTIVITY,
    CREATE_ACTIVITY,
    GET_COUNTRIES_BY_NAME,
    GET_COUNTRY_BY_ID,
    FILTER_BY_REGION,
    FILTER_BY_POPULATION,
    FILTER_BY_ALPHABETICALLY,
    FILTER_BY_ACTIVITY,
  
  

} from '../actions/actions';


const initialState = {
    copyCountries: [],
    allCountries:[],
    activities:[],
    detail:[]

}

export default function rootReducer (state = initialState,action){
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                copyCountries: action.payload,
                allCountries: action.payload,
            }

        case GET_ALL_ACTIVITY:
            return{
                ...state,
                activities: action.payload
            }
        
        case CREATE_ACTIVITY:
            return{
                ...state
            }
       
        case GET_COUNTRIES_BY_NAME:{
            
            return{
                ...state,
                allCountries: action.payload
            }
        }

        case GET_COUNTRY_BY_ID:{
            return{
                ...state,
                detail: action.payload
            }
        }

     
        case FILTER_BY_REGION:
        //   if(action.payload === "Americas"){
        //     state.allCountries = state.copyCountries.filter(info => info.region.includes(action.payload))
        //   }
            // action.payload === "All" ? state.allCountries = state.copyCountries 
            // : state.allCountries = state.copyCountries.filter(info => info.region.includes(action.payload))
            if(action.payload === "All"){
                state.allCountries = state.copyCountries
            }else if(action.payload === "A"){
                state.allCountries = state.copyCountries.filter(info => info.region === "Antarctic" || info.region === "Oceania")
            }else{
                state.allCountries = state.copyCountries.filter(info => info.region.includes(action.payload))
            }
            return{
                ...state,
                allCountries: state.allCountries,     
            }

        case FILTER_BY_ACTIVITY:
                action.payload === 'All' ? state.allCountries = state.copyCountries.filter(info => info.Activities.length) :
                state.allCountries = state.copyCountries.filter(name => name.Activities.find((element) => element.name?.toLowerCase() === action.payload))
            return {
                ...state,
                allCountries: state.allCountries
            }
    // cuando se tienen filtros con sort se puede3 interar sobre la el mismo array o state        
        case FILTER_BY_ALPHABETICALLY:
           action.payload === "Asc" ? state.allCountries.sort(function(a, b) {
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.allCountries.sort(function(a, b) {
                if(a.name > b.name){
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })
            return{
                ...state,
                allCountries: state.allCountries
                
            }
        
            case FILTER_BY_POPULATION:
                action.payload === "Min" ? state.allCountries.sort(function(a, b) {
                    if(a.population > b.population){
                        return 1
                    }
                    if(b.population > a.population) {
                        return -1
                    }
                    return 0
                }) :
                state.allCountries.sort(function(a, b) {
                    if(a.population > b.population){
                        return -1
                    }
                    if(b.population > a.population) {
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    allCountries: state.allCountries
                    
                }
        default:
            return state;
    }
}
