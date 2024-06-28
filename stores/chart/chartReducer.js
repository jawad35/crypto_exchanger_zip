import * as chartActions from "./chartActions";
const InitialState = {
    currentPrice: 1
}

const chartReducer = ( state= InitialState,action )=>{
    switch(action.type){
        case  chartActions.CURRENT_PRICE:
            return {
                ...state,
                currentPrice: action.payload,
            }
            default: 
               return state
    }
        
}

export default chartReducer;