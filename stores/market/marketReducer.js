import * as marketActions from "./marketActions"
import axios from "axios";

const InitialState = {
    myHoldings: [],
    coins: [],
    error: null,
    loading: false
}

const marketReducer = (state = InitialState, action) => {
    switch (action.type) {
        case marketActions.GET_HOLDINGS_BEGIN:
            return {
                ...state,
                loading: true
            }
            case marketActions.GET_HOLDINGS_SUCCESS:
                return {
                    ...state,
                    myHoldings: action.payload.myHoldings
                }
                case marketActions.GET_HOLDINGS_FAILURE:
                    return {
                        ...state,
                        error: action.payload.error
                    }
                    case marketActions.GET_COIN_MARKET_BEGIN:
                    return {
                       ...state,
                       loading: true
                    }
                    case marketActions.GET_COIN_MARKET_SUCCESS:
                        return {
                            ...state,
                            coins: action.payload.coins
                        }
                    case marketActions.GET_COIN_MARKET_FAILURE:
                        return {
                            ...state,
                            error: action.payload.error
                        }
                    default:
                        return state
    }
}
/// CoinMarket



export default marketReducer;