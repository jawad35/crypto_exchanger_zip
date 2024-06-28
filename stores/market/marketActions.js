import axios from "axios";
export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN"
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS"
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE"

/// CoinMarket /

export const getCoinMarketBegin = () => ({
    type: GET_COIN_MARKET_BEGIN
})

export const getCoinMarketSuccess = (coins) => ({
    type: GET_COIN_MARKET_SUCCESS,
    payload: {coins}
})

export const getCoinMarketFailure = (error) => ({
    type: GET_COIN_MARKET_FAILURE,
    payload: {error}
})

export function getCoinMarket(currency = "usd", orderBy = "market_cap_desc", sparkline = true, priceChangePerc = "7d", perPage = 8, page = 1) {

    return dispatch => {
        dispatch(getCoinMarketBegin())

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=true&price_change_percentage=7d&locale=en`

        return axios({
            url: apiUrl,
            method: 'GET',
            header: { 
                Accept: 'application/json'
            } 
        }).then((response) => {
           if (response.status == 200) {
            // console.log("COINGECO", response)
            dispatch(getCoinMarketSuccess(response.data))
           } else {
            // console.log("COINGECO ELSE", response)

            dispatch(getCoinMarketFailure(response.data))
           }
        }).catch((error) => {

            dispatch(getCoinMarketFailure(error))
        })
    }

}