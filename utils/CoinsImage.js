export const CoinsImage = (coin) => {

    let image;
    if (coin === 'BTC') {
        image = require('../assets/BTC.png')
    }

    if (coin === 'USDT-TRC') {
        image = require('../assets/USDT.png')
    }

    if (coin === 'USDT-ERC') {
        image = require('../assets/USDT.png')
    }

    if (coin === 'ETH') {
        image = require('../assets/ETH.png')
    }
    return image
}

export const GetStatusColor = (status) => {
    let color = 'gray'
    if (status === 'Success') {
        color = 'green'
    }
    if (status === 'Rejected') {
        color = 'red'
    }
    if (status === 'Pending') {
        color = 'gray'
    }
    return color
}