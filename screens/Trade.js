import axios from 'axios';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { getCoinMarket } from '../stores/market/marketActions';
import { useFocusEffect } from '@react-navigation/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { api_url } from '../config';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import BuyUpModal from '../components/BuyUpModal';
import { CandlestickChart } from 'react-native-wagmi-charts';
import ChartHeader from '../components/ChartHeader';
import Checkbox from 'expo-checkbox';
import Trad1 from './Trade1';
import Trade3 from './Trade3';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CURRENT_PRICE } from '../stores/chart/chartActions';
import { createChart } from 'lightweight-charts';
const Trade = ({ navigation, route, getCoinMarket, coins }) => {
  const userId = useSelector((state) => state?.userReducer?.currentUser?._id);
  const price = useSelector((state) => state?.chartReducer?.currentPrice);
  console.log(price, 'hjk')
  const user = useSelector((state) => state?.userReducer?.currentUser);
  const userWallet = useSelector((state) => state?.userReducer?.currentUser?.walletId);
  const dispatch = useDispatch();
  const { coinId, itemSymbol, priceColor } = route.params || {
    coinId: 'bitcoin',
    itemSymbol: 'BTC',
    priceColor: '#2ebd85',
  };
  // console.log('COOOOOIIIIINNNNN', coinId);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [coin, setCoin] = useState('MA');
  const [isDataLoading, setIsDataLoading] = useState(false); // Default frequency
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCycle, setSelectedCycle] = useState({ "percentage": 3, "time": 30 });
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [frequency, setFrequency] = useState('1h'); // Default frequency
  const [chartRefresh, setChartRefresh] = useState(true); // Default frequency
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [selectedButtonIndexVol, setSelectedButtonIndexVol] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [selectTab, setSelectTab] = useState('Option');
  const [tab, setTab] = useState('current');
  const [increasedAmount, setIncreasedAmount] = useState(0);
  const [minimumBalance, setMinimumBalance] = useState(0);
  useEffect(() => {
    // Filter the coins array to get the selected coin's data
    const selectedCoinData = coins?.find((coin) => coin.id === coinId);
    // console.log("selectedCoinData,selectedCoinData",selectedCoinData);
    if (selectedCoinData) {
      // Update the state with the selected coin's data
      setCurrentPrice(selectedCoinData.current_price);
      setSelectedCoin(selectedCoinData);
      setIsLoading(false);
    }
  }, [coins]);

  const dateTimeString = selectedCoin?.last_updated;
  const dateTimeObject = new Date(dateTimeString);

  const timestamps = Array.from({ length: 5 }, (_, index) => {
    const interval = 10 * index;
    const timestamp = new Date(dateTimeObject - interval * 60000);
    return `${timestamp.getHours()}:${timestamp.getMinutes()}`;
  });


  useEffect(() => {
    switch (selectedButtonIndex) {
      case 0:
        setMinimumBalance('Amount Min 50 USDT');
        break;
      case 1:
        setMinimumBalance('Amount Min 500 USDT');
        break;
      case 2:
        setMinimumBalance('Amount Min 2000 USDT');
        break;
      case 3:
        setMinimumBalance('Amount Min 9000 USDT');
        break;
      case 4:
        setMinimumBalance('Amount Min 12000 USDT');
        break;
      default:
        setMinimumBalance('Amount Min 15000 USDT');
        break;
    }
  }, [selectedButtonIndex]);

  const updateData = () => {
    dispatch(getCoinMarket);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCoinMarket();
    }, [])
  );

  const handleSelectCycle = (cycleData) => {
    setSelectedCycle(cycleData);
  };
  const handleSelectVolume = (volumeData) => {
    setSelectedVolume(volumeData);
  };

  const startTrade = async () => {
    let currency;
    switch (coinId) {
      case 'bitcoin':
        currency = 'BTC';
        break;
      case 'ethereum':
        currency = 'ETH';
        break;
      case 'tether':
        currency = 'USDT-TRC';
        break;
      case 'usd-coin':
        currency = 'USDT-ERC';
        break;
      default:
        currency = 'invalid';
    }

    if (
      currency !== 'invalid' &&
      currency !== undefined &&
      selectedVolume?.value
    ) {

      if (true) {
        try {
          console.log('get in call')
          const response = await axios.post(`${api_url}/trade/start`, {
            percentage: selectedCycle?.percentage,
            amount: selectedVolume?.value,
            userId,
            currency,
          });
          console.log('response?.data', JSON.stringify(response))
          if (response?.data?.status == 200) {
            Toast.show({
              type: 'success',
              text1: 'Trade has been started',
              text2: 'Trade has been started',
            });
            setShowModal(false);
            setTab('position')
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something is wrong',
              text2: 'Please try again',
            });
          }
        } catch (err) {
          console.log('ERROR IN REQ', err);
          Toast.show({
            type: 'error',
            text1: 'Error on server',
            text2: 'Please try again',
          });
        }
      } else {
        alert("Sorry, you don't have enough balance in your account to make this trade.");
      }

    } else {
      alert('You can only trade in USDT-TRC, USDT-ERC, BTC or ETH.');
    }
  };
  const getPrices = async () => {
    try {
      const response = await axios.post(`${api_url}/trade/prices`, {
        frequency: '1m',
      });
    } catch (error) {

    }
  }
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const data = [
    {
      timestamp: 1625945400000,
      open: 33575.25,
      high: 33600.52,
      low: 33475.12,
      close: 33520.11,
    },
    {
      timestamp: 1625946300000,
      open: 33545.25,
      high: 33560.52,
      low: 33510.12,
      close: 33520.11,
    },
    {
      timestamp: 1625947200000,
      open: 33510.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11,
    },
    {
      timestamp: 1625948100000,
      open: 33215.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11,
    },
  ];

  const slices = [];
  const candleObjects = [];

  for (let j = 0; j < selectedCoin?.sparkline_in_7d?.price?.length / 5; j++) {
    const startIndex = j * 5;
    const endIndex = startIndex + 4;
    const slice = selectedCoin?.sparkline_in_7d?.price?.slice(
      startIndex,
      endIndex
    );

    slices.push(slice);

    slice.sort((a, b) => a - b);
    const closeValue = j % 2 === 0 ? slice[2] : slice[0];
    candleObjects.push({
      open: slice[1],
      high: slice[slice.length - 1],
      low: slice[1],
      close: closeValue,
      timestamp: Date.now(),
    });
  }

  const goToSpot = () => {
    setSelectTab('Spot');
    navigation.navigate('spot', { coinId: coinId, itemSymbol: itemSymbol });
  };
  // console.log('aaaa', candleObjects);

  const currentTime = Date.now();
  const currentHour = new Date(currentTime).getHours();
  const sortedSparkline = selectedCoin?.sparkline_in_7d?.price.sort(
    (a, b) => b - a
  );

  const increasedNumber = () => {
    const profit = amount / percentage;
    const intervalId = setInterval(() => {
      if (increasedAmount <= profit) {
        console.log(currentNumber);
        setIncreasedAmount((amount) => amount + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 500);
  };

  useEffect(()=>{

      
  },[])

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const [historicalData, setHistoricalData] = useState([]); // Default frequency
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
      // setCurrentValue(newCandle.close)
      AsyncStorage.setItem('currentPrice', newCandle.close)
      candlestickSeriesRef.current.update(newCandle);
    };

    return () => {
      ws.close();
      chartRef.current.remove();
    };
  }
}, [historicalData]);


  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: "white",
          height: "100%"
        }}
      >
        <View style={[showModal ? styles.hidden : null, styles.image]}>
          <View
            style={{
              padding: 15,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              paddingBottom: 25
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Home2')}>
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color="black"
                onPress={() => navigation.goBack("")}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: selectTab === 'Option' ? 'black' : 'silver',
              }}
              onPress={() => setSelectTab('Option')}
            >
              Options
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('spot')}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: selectTab === 'Spot' ? 'white' : 'silver',
                }}>Spot</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: selectTab === 'USDT-M' ? 'black' : 'silver',
              }}
              onPress={() => setSelectTab('USDT-M')}
            >
              USDT-M
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: '4%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Entypo name="menu" size={35} color="black" />
              <Text
                style={{
                  marginLeft: 8,
                  color: 'black',
                  fontWeight: '600',
                  fontSize: 22,
                }}
              >
                {itemSymbol.toUpperCase()}/USDT
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name="information-outline"
                size={24}
                color="black"
                style={{ marginRight: 6 }}
              />
              <MaterialIcons name="stars" size={24} color="black" />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '1%',
            }}
          >
            {/* <View>
              <View>
                <Text style={{ fontSize: 35, fontWeight: '800', color: '#2ebd85' }}>
                  {currentPrice}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  //   alignSelf: "center",
                  alignItems: 'center',
                }}
              >
                {selectedCoin?.price_change_percentage_7d_in_currency != 0 && (
                  <Feather
                    name="arrow-up"
                    size={25}
                    style={{
                      color: priceColor,
                      transform:
                        selectedCoin?.price_change_percentage_7d_in_currency > 0
                          ? [{ rotate: '45deg' }]
                          : [{ rotate: '125deg' }],
                    }}
                  />
                )}
                <Text
                  style={{
                    marginLeft: 5,
                    color: priceColor,
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  {selectedCoin?.price_change_percentage_7d_in_currency?.toFixed(
                    2
                  )}
                  %
                </Text>
              </View>
            </View> */}

            {/* <View>
              <Text style={{ color: 'black' }}>
                High {selectedCoin?.high_24h}
              </Text>
              <Text style={{ color: 'black' }}>Low {selectedCoin?.low_24h}</Text>
              <Text style={{ color: 'black' }}>
                Vol {selectedCoin?.total_volume}
              </Text>
            </View> */}
          </View>
          <View>
            <View>
              <Trad1/>
              {/* <View style={styles.coins}>
              <Text
                style={[
                  styles.title,
                  { color: coin === 'MA' ? 'aqua' : 'black' },
                ]}
                onPress={() => setCoin('MA')}
              >
                MA
              </Text>
              <Text
                style={[
                  styles.title,
                  { color: coin === 'EMA' ? 'aqua' : 'black' },
                ]}
                onPress={() => setCoin('EMA')}
              >
                EMA
              </Text>
              <Text
                style={[
                  styles.title,
                  { color: coin === 'BOL' ? 'aqua' : 'black' },
                ]}
                onPress={() => setCoin('BOL')}
              >
                BOL
              </Text>
              <Text
                style={[
                  styles.title,
                  { color: coin === 'MACD' ? 'aqua' : 'black' },
                ]}
                onPress={() => setCoin('MACD')}
              >
                MACD
              </Text>
              <Text
                style={[
                  styles.title,
                  { color: coin === 'RSI' ? 'aqua' : 'black' },
                ]}
                onPress={() => setCoin('RSI')}
              >
                RSI
              </Text>
              <Text
                style={[
                  styles.title,
                  { color: coin === 'WR' ? 'aqua' : 'black' },
                ]}
                onPress={() => setCoin('WR')}
              >
                WR
              </Text>
            </View> */}
              {/* <View style={styles.container}>
                <TouchableOpacity
                  style={[styles.button, styles.buyUpButton]}
                  // onPress={startTrade}
                  // onPress={openModal}
                  onPress={async() => dispatch({type:CURRENT_PRICE, payload:await AsyncStorage.getItem('currentPrice')})}
                >
                  <Text style={styles.buttonText}>Buy Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buyDownButton]}
                // onPress={handleBuyDown}
                >
                  <Text style={styles.buttonText}>Buy Down</Text>
                </TouchableOpacity>
              </View> */}
            </View>

            <View
              style={{
                height: 35,
                backgroundColor: 'white',
                margin: 5,
                justifyContent: 'space-around',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '50%',
                  justifyContent: 'space-around',
                }}
              >
                <TouchableOpacity onPress={() => setTab('current')}>
                  <Text
                    style={[
                      styles.title,
                      { color: tab === 'current' ? 'black' : 'silver' },
                    ]}
                  >
                    Current entrust
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab('position')}>
                  <Text
                    style={[
                      styles.title,
                      { color: tab === 'position' ? 'black' : 'silver' },
                    ]}
                  >
                    Position
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View style={{
              flex: 1,
              flexDirection: "row",
              padding: 13,
              gap: 5,
            }}>
              <Checkbox
                style={{
                  color: "aqua",
                  alignSelf: "center"
                }}
              />
              <Text style={{
                fontWeight: "500",
                alignSelf: "center"
              }} >Hide other symbols</Text>
              <View>
                <Ionicons name="refresh-circle" size={35} color="black" alignSelf="center" />
              </View>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          {/* </BlurView> */}
        </View>
        {showModal && (
          <BuyUpModal
            startTrade={startTrade}
            itemSymbol={itemSymbol}
            showModal={showModal}
            closeModal={closeModal}
            onSelectCycle={handleSelectCycle}
            setSelectedButtonIndex={setSelectedButtonIndex}
            selectedButtonIndex={selectedButtonIndex}
            onSelectVolume={handleSelectVolume}
            setSelectedButtonIndexVol={setSelectedButtonIndexVol}
            selectedButtonIndexVol={selectedButtonIndexVol}
            minimumBalance={minimumBalance}
          />
          // </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
    state: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade);

const styles = StyleSheet.create({

  mainContainer: { flex: 1, backgroundColor: 'white' },
  chart: {
    width: '100%',
    height: 400,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeWrapper: {
    paddingHorizontal: '5%',
  },

  coins: {
    flexDirection: 'row',
    paddingHorizontal: 50,
    // flexWrap: "wrap",
    justifyContent: 'space-between',
  },
  time: {
    color: 'red',
    margin: 10,
  },
  header: {
    position: 'absolute',
    top: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  underline: { textDecorationLine: 'underline' },
  container: {
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
  image: {
    flex: 1,
    // height: "100%",
    // width: "100%",
    resizeMode: 'cover',
    // justifyContent: "center",
  },
  hidden: {
    display: 'none',
  }
});
