// CandlestickChart.js
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { api_url } from '../config';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');

// Function to determine font size based on screen width
const getFontSize = (baseSize) => {
  if (width > 800) return baseSize * 1.5; // Example for large screens
  if (width > 600) return baseSize * 1.25; // Example for medium screens
  return baseSize; // Example for small screens
};
const CandlestickChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(20);
  const [isLoading, setIsDataLoading] = useState(false); // Default frequency
  const [frequency, setFrequency] = useState('1h'); // Default frequency
  const [chartRefresh, setChartRefresh] = useState(false); // Default frequency
  const candlestickSeriesRef = useRef(null);
  const [currentPrice, setCurrentPrice] = useState(0); // Default frequency
  const [historicalData, setHistoricalData] = useState([]); // Default frequency
  const [entrypoint, setEntryPoint] = useState(0); // Default frequency
  const [currentBalance, setCurrentBalance] = useState(0); // Default frequency


  // Fetch prices when component mounts and when frequency changes
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.post(`${api_url}/trade/prices`, { frequency });
        setIsDataLoading(false)
        setHistoricalData(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
  }, [frequency, chartRefresh]); // Re-fetch if frequency changes


  useEffect(() => {
    if (historicalData.length > 0 && chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, { height: 400 });
      candlestickSeriesRef.current = chartRef.current.addCandlestickSeries();

      // Convert date string to timestamp
      const formattedHistoricalData = historicalData.map(data => ({
        ...data,
        time: new Date(data.time).getTime() / 1000,
      }));

      // Set initial historical data
      candlestickSeriesRef.current.setData(formattedHistoricalData);

      // WebSocket connection
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@kline_${frequency}`);

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const candlestick = message.k;

        const newCandle = {
          open: parseFloat(candlestick.o),
          high: parseFloat(candlestick.h),
          low: parseFloat(candlestick.l),
          close: parseFloat(candlestick.c),
          time: Math.floor(candlestick.t / 1000), // convert to seconds
        };
        setCurrentPrice(newCandle.close)
        candlestickSeriesRef.current.update(newCandle);
      };

      return () => {
        ws.close();
        chartRef.current.remove();
      };
    }
  }, [historicalData]); // Re-run this effect when historicalData changes

  function calculateROE(entryPrice, currentPrice, userBalance) {
    const initialValue = entryPrice * userBalance;
    const currentValue = currentPrice * userBalance;
    const roe = ((currentValue - initialValue) / initialValue) * 100;
    return truncateToTwoDecimals(roe);
  }

  function calculatePnL(userBalance, roe) {
    const pnl = userBalance * roe / 100;
    return truncateToTwoDecimals(pnl);
  }

  function truncateToTwoDecimals(number) {
    const numberString = number.toString();
    const decimalIndex = numberString.indexOf('.');
    if (decimalIndex === -1 || decimalIndex + 3 > numberString.length) {
      return numberString;
    }
    return numberString.slice(0, decimalIndex + 3);
  }

  const walletId = useSelector(
    (state) => state?.userReducer?.currentUser?.walletId?._id
  );
  const getWallet = async () => {
    let btcUnit
    try {
      const response = await axios.post(`${api_url}/user/getWallet`, {
        walletId,
      });
      if (response?.data?.status === 200) {
        let arr = response?.data?.wallet?.currentBalance.sort(
          (a, b) => b.amount - a.amount
        );
        btcUnit = arr.find((item) => item?.name === "BTC")
        console.log(btcUnit, 'wah unit')
        const apiKey =
          "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
        const fromBtc = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=btc&tsyms=usd&api_key=${apiKey}`)
        let totalAmount = 0;
        btcUnit.toUsd = btcUnit.amount * fromBtc?.data.USD
        totalAmount + btcUnit.toUsd
        let usdttrcUnit

        usdttrcUnit = arr.find((item) => item?.name === "USDT-TRC")
        usdttrcUnit.toUsd = usdttrcUnit?.amount
        totalAmount + usdttrcUnit.toUsd
        setCurrentBalance(btcUnit.toUsd)
      }
    } catch (error) {
      console.log('EROOROROOROROOR', error);
    }
  };

  const UpdateWallet = async () => {
    const totalBalance = parseFloat(currentBalance) + parseFloat(calculatePnL(currentBalance, calculateROE(entrypoint, currentPrice, currentBalance)))
    try {
      const response = await axios.post(`${api_url}/user/updateWallet`, {
        id: walletId, amount: (totalBalance / currentPrice), name: 'BTC'
      });
      console.log(response)
      if (response?.data?.status === 200) {
        getWallet()
        setEntryPoint(0)
      }
    } catch (error) {
      console.log('EROOROROOROROOR', error);
    }
  };
  useEffect(() => {
    getWallet()
  }, [])

  return <View >
    <View style={styles.container}>

      <View style={styles.positionContainer}>
        <View>
          <Text style={{ fontSize: 35, fontWeight: '800', color: '#2ebd85', marginBottom: '20px' }}>
            {currentPrice}
          </Text>
        </View>
        <Text style={{ marginBottom: '30px' }}>Your Wallet: <Text style={{ fontSize: '18px', fontWeight: '600' }}>{truncateToTwoDecimals(currentBalance)}</Text></Text>
        <View style={styles.positionHeader}>
          {/* <Text>B</Text> */}
          <Image style={{ width: 20, height: 20 }} source='https://static-00.iconduck.com/assets.00/bitcoin-icon-2048x2048-t8gwld81.png' />
          <Text style={{ marginHorizontal: '10px', fontWeight: '700', fontSize: '20px' }}>BTCUSDT</Text>
          <Text style={{ fontSize: '18px', paddingRight: '10px' }}>Perpetual</Text>
          <Text>Cross</Text>
          <View style={styles.selectContainer}>

            <Picker
              selectedValue={selectedValue}
              disabled={entrypoint > 0}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="20x" value="20" />
              <Picker.Item label="100x" value="100" />
            </Picker>
          </View>
        </View>
        <View style={styles.PRSection}>
          <View style={styles.pnlContainer}>
            <Text style={styles.pnlTitle}>PNL (USDT)</Text>
            <Text style={[styles.pnlPrice, { color: entrypoint > 0 ? calculatePnL(currentBalance, calculateROE(entrypoint, currentPrice, currentBalance)) > 0 ? 'green' : 'red' : 'black' }]}>{entrypoint > 0 ? parseFloat(calculatePnL(currentBalance, calculateROE(entrypoint, currentPrice, currentBalance))) : '0.0'}</Text>
          </View>
          <View style={styles.roeContainer}>
            <Text style={styles.pnlTitle}>ROE</Text>
            <Text style={[styles.pnlPrice, { color: entrypoint > 0 ? calculateROE(entrypoint, currentPrice, currentBalance) > 0 ? 'green' : 'red' : 'black' }]}>{entrypoint > 0 ? parseFloat(calculateROE(entrypoint, currentPrice, currentBalance)) : '0.0'}%</Text>
          </View>
        </View>
        <View style={styles.SMRSection}>
          <View style={styles.pnlContainer}>
            <Text style={styles.pnlTitle}>Size (USDT)</Text>
            <Text style={styles.pnlPrice}>{entrypoint > 0 ? truncateToTwoDecimals(selectedValue * currentBalance) : "0.0"}</Text>
          </View>
          <View style={styles.pnlContainer}>
            <Text style={styles.pnlTitle}> Margin(USDT)</Text>
            <Text style={styles.pnlPrice}>{entrypoint > 0 ? truncateToTwoDecimals(currentBalance) : '0.0'}</Text>
          </View>
          <View style={styles.roeContainer}>
            <Text style={styles.pnlTitle}>Risk</Text>
            <Text style={[styles.pnlPrice, { color: 'green' }]}>{entrypoint > 0 ? '30' : '0'}%</Text>
          </View>
        </View>
        <View style={[styles.SMRSection, { marginVertical: '20px' }]}>
          <View style={styles.pnlContainer}>
            <Text style={styles.pnlTitle}>Entry Price (USDT)</Text>
            <Text style={styles.pnlPrice}>{entrypoint}</Text>
          </View>
          <View style={styles.pnlContainer}>
            <Text style={styles.pnlTitle}>Mark Price (USDT)</Text>
            <Text style={styles.pnlPrice}>{entrypoint > 0 ? currentPrice : '0.0'}</Text>
          </View>
          <View style={styles.roeContainer}>
            <Text style={styles.pnlTitle}>Liq. Price (USDT)</Text>
            <Text style={styles.pnlPrice}>--</Text>
          </View>
        </View>
      </View>
      <View style={styles.pbtnRootcontainer}>
        <View style={styles.pbtnContainer}>
          <TouchableOpacity style={styles.pbtn}>
            <Text style={styles.btnText}>Adjust Leverage</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pbtn}>
            <Text style={styles.btnText}>Stop Profit & Loss</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pbtn} onPress={() => entrypoint > 0 && UpdateWallet()}>
            <Text style={styles.btnText}>Close Position</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
        <Text style={[styles.chartFilterBtn, { borderColor: frequency === '1m' && 'red' }]} onPress={() => setFrequency('1m')}>1m</Text>
        <Text style={[styles.chartFilterBtn, { borderColor: frequency === '5m' && 'red' }]} onPress={() => setFrequency('5m')}>5m</Text>
        <Text style={[styles.chartFilterBtn, { borderColor: frequency === '1h' && 'red' }]} onPress={() => setFrequency('1h')}>1h</Text>
        <Text style={[styles.chartFilterBtn, { borderColor: frequency === '4h' && 'red' }]} onPress={() => setFrequency('4h')}>4h</Text>
        <Text style={[styles.chartFilterBtn, { borderColor: frequency === '1d' && 'red' }]} onPress={() => setFrequency('1d')}>1d</Text>
        <Text style={[styles.chartFilterBtn, { borderColor: frequency === '1M' && 'red' }]} onPress={() => setFrequency('1M')}>1M</Text>
        <Text style={[styles.chartFilterBtn, { width: '70px' }]} onPress={() => setChartRefresh(!chartRefresh)}>Refresh</Text>
      </View>
    </View>
    <View style={styles.chart} ref={chartContainerRef} />

    {
      entrypoint === 0 && <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buyUpButton]}
          // onPress={startTrade}
          // onPress={openModal}
          disabled={currentBalance === 0}
          onPress={() => setEntryPoint(currentPrice)}
        >
          <Text style={styles.buttonText}>Buy Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buyDownButton]}
          // onPress={handleBuyDown}
          disabled={entrypoint > 0}
        >
          <Text style={styles.buttonText}>Buy Down</Text>
        </TouchableOpacity>
      </View>
    }
  </View>;
};

const styles = StyleSheet.create({
  chart: {
    width: '100%',
    height: 400,
  },
  container: {
    height: 500
  },
  chartFilterBtn: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    width: '50px',
    borderRadius: '6px',
    margin: '20px',
    padding: '8px',
    borderWidth: 2,
  },
  positionContainer: {
    paddingHorizontal: '20px',
  },

  positionHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectContainer: {
    flex: 1,
    paddingHorizontal: '10px'
  },
  PRSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '20px'
  },
  picker: {
    height: 30,
    width: 50,
  },
  pnlContainer: {
    textAlign: 'left',
  },
  pnlPrice: {
    fontWeight: '700',
    fontSize: '20px'
  },
  roeContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  pnlPrice: {
    fontWeight: '700',
    fontSize: getFontSize(12)
  },
  roeTitle: {
    fontWeight: '600'
  },
  pnlTitle: {
    fontWeight: '600',
    fontSize: getFontSize(12),
  },
  SMRSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buyUpButton: {
    backgroundColor: '#2ebd85',
  },
  buyDownButton: {
    backgroundColor: '#df294a',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnContainer: {
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 50,
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pbtnRootcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pbtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  pbtn: {
    width: (width - 60) / 3, // Adjust width to fit within the container
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CandlestickChart;
