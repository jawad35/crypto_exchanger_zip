import { combineReducers } from "redux";
import marketReducer from "./market/marketReducer";
import userReducer from "./user/userReducer";
import chartReducer from "./chart/chartReducer";

export default combineReducers({
    marketReducer, userReducer, chartReducer
    
})