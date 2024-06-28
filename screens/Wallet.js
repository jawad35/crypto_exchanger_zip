import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from 'react';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { api_url } from '../config';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Wallet = () => {
  const navigation = useNavigation()
  const [wallet, setWallet] = useState([]);
  const [toUsd, setToUsd] = useState([]);
  const [totalUsd, setTotalUsd] = useState(0)
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // const user = useSelector((state) => state?.userReducer?.currentUser?.token);
  const user = useSelector((state) => state?.userReducer?.currentUser?.token);
  const cuser = useSelector((state) => state?.userReducer?.currentUser);
console.log('cuser', JSON.stringify(cuser))
const currentUser = user;

  const handleNavigation = (screen) => {
    if (currentUser) {
      navigation.navigate(screen);
    } else {
      setShowModal(true);
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(()=>{
    if(wallet.length > 0){
      let test = 0;
      for(let i = 0; i < wallet.length; i++){
        test += wallet[i].toUsd
        
      }
      setTotalUsd(test)
    }
  }, wallet)

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
        btcUnit = arr.find((item)=> item?.name === "BTC")
        console.log(btcUnit, 'wah unit')
        const apiKey =
      "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
    const fromBtc = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=btc&tsyms=usd&api_key=${apiKey}`)
    let totalAmount = 0;
        btcUnit.toUsd =  btcUnit.amount * fromBtc?.data.USD
        totalAmount+ btcUnit.toUsd
          let usdttrcUnit

        usdttrcUnit = arr.find((item)=> item?.name === "USDT-TRC")
        usdttrcUnit.toUsd =  usdttrcUnit?.amount
        totalAmount+ usdttrcUnit.toUsd


        // setTotalUsd((totalUsd)=> totalUsd + usdttrcUnit.amount )
let ethUnit
        
        ethUnit = arr.find((item)=> item?.name === "ETH")
        const fromEth = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=eth&tsyms=usd&api_key=${apiKey}`)
        ethUnit.toUsd =  ethUnit.amount * fromEth?.data.USD
        totalAmount+ ethUnit.toUsd
        let usdtercUnit


        usdtercUnit = arr.find((item)=> item?.name === "USDT-ERC")
        usdtercUnit.toUsd =  usdtercUnit.amount
        totalAmount+ usdtercUnit.toUsd

        
        const updateData = [btcUnit, usdtercUnit, usdttrcUnit, ethUnit]
        const totalToUsd = updateData?.reduce((acc, currentValue) => acc + currentValue.toUsd, 0);
setTotalUsd(totalToUsd)
        setWallet(updateData);

      }
    } catch (error) {
      console.log('EROOROROOROROOR', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getWallet();
      const apiKey =
      "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
    // const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${selectedOption2.cId}&tsyms=${selectedOption.cId}&api_key=${apiKey}`;
      checkRates()
    }, [])
  );

  const checkRates=async()=>{
    const apiKey =
      "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
    const fromBtc = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=btc&tsyms=usd&api_key=${apiKey}`)
    console.log("Respoonse for ratess___",fromBtc)
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  console.log('wallet', wallet);
  return (
    <SafeAreaView style={{
      backgroundColor: "white",
      height: "100%"
    }}>
    <ScrollView style={{
      backgroundColor: "white",
      height: "100%"
    }}>
   <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10
          }}
        >
        <Text
          style={{
            padding: 5,
            marginLeft: 5,
            marginTop: 10,
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Overview
        </Text>
        </View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        </View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <AntDesign name="customerservice" size={33} color="black" style={{ padding: 5,
            paddingTop: 17,
            marginRight: 17}} />
        </View>
        </View>
        </View>
        
     
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            padding: 5,
              marginLeft: 10,
              marginTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: 'gray',
              fontWeight: "300",
            }}
          >
            Total Balance
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              paddingLeft: 13,
              paddingTop: 20,
              fontSize: 30,
              color: 'black',

            }}
          >
            {' '}
            {totalUsd.toFixed(4)} USDT
          </Text>
        </View>
        <View style={{
          flexDirection: "row",
           width: "100%",
           alignSelf: "center",
           paddingTop: 25}}>
          <TouchableOpacity style={{
            flex: 1,
            width: "30%",
            marginHorizontal: 0,
            alignSelf: "center"}}
            onPress={() => {
              if (currentUser) {
                navigation.navigate("Deposit");
              } else {
                setShowModal(true);
              }
            }}
          >
            <View style={{borderWidth: 0,
            alignItems: "center",
             justifyContent: "center",
              alignSelf: "center",
              width: 70,
              height: 70}}>
              <FontAwesome5 name="arrow-down" size={30} color="aqua" />
              <Text>Deposit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1,
              width: "30%",
              marginHorizontal: 0,
              alignSelf: "center"}}
            onPress={() => handleNavigation("Withdraw")}
          >
            <View style={{borderWidth: 0,
            alignItems: "center",
             justifyContent: "center",
              alignSelf: "center",
              width: 70,
              height: 70}}>
              <FontAwesome5 name="arrow-up" size={30} color="aqua" />
              <Text>Withdraw</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1,
            width: "30%",
            marginHorizontal: 0,
            alignSelf: "center"}}
            onPress={() => handleNavigation("Exchange")}
          >
           <View style={{borderWidth: 0,
            alignItems: "center",
             justifyContent: "center",
              alignSelf: "center",
              width: 70,
              height: 70}}>
              <FontAwesome5 name="exchange-alt" size={30} color="aqua" />
              <Text>Exchange</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1,
              width: "30%",
              marginHorizontal: 0,
              alignSelf: "center"}}
            onPress={() => handleNavigation("Loan")}
          >
            <View style={{borderWidth: 0,
            alignItems: "center",
             justifyContent: "center",
              alignSelf: "center",
              width: 70,
              height: 70}}>
              <Entypo name="wallet" size={30} color="aqua" />
              <Text>Loan</Text>
            </View>
            </TouchableOpacity>
            </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
            }}
          >
            Asset Details
          </Text>
          
          <Text
            style={{
              color: 'gray',
            }}
          >
            <Checkbox
              style={{
                marginLeft: 5,
        
              }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? "aqua" : "aqua"}
            />
            Hide 0 Balances
          </Text>
        </View>



<View style={{ height:"100%", backgroundColor:"white"}}>
        <View
          style={{
            flex: 1,
            height:"100%",

          }}
        >
         {wallet ? 
          
         <FlatList
            // scrollEnabled="true"
            data={wallet}s
            renderItem={({ item, index }) => {
              return (
                <>
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 25,
                      gap: 10,
                      paddingTop: 20,
                      marginTop:2
                    }}
                  >
                    <Image
                    source={
                      item.name === 'USDT-TRC'
                        ? require('../assets/USDT-TRC.png')
                        : item.name === 'ETH'
                        ? require('../assets/ETH.png')
                        : item.name === 'BTC'
                        ? require('../assets/BTC.png')
                        : require('../assets/USDT-ERC.png')
                    }
                      style={{ height: 40, width: 40 }}
                      ></Image>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      {item?.name}
                    </Text>
                  </View>
                  <View style={{flexDirection:"column"}}>

                  <View
                    style={{
                      padding: 5,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      paddingBottom: 20,
                      gap: 40,
                      paddingTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'normal',
                        fontSize: 15,
                      }}
                      >
                      Available Assets
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'normal',
                        fontSize: 15,
                      }}
                    >
                      Occupy
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'normal',
                        fontSize: 15,
                      }}
                    >
                      Amount in USDT
                    </Text>
                  </View>


                  <View
                    style={{
                      padding: 5,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      gap: 40,
                    }}
                  >
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'medium',
                        fontSize: 15,
                      }}
                      >
                      {item?.amount}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'medium',
                        fontSize: 15,
                      }}
                    >
                      0
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'medium',
                        fontSize: 15,
                      }}
                    >
                      {item?.toUsd}
                    </Text>
                  </View>


                  </View>
                </>
              );
            }}
            />
          : <Text>NO ASSETS Available</Text>}
            </View>
        </View>


        {/* {wallet ? (
          <FlatList
            data={wallet}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "black",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 15,
                    gap: 40,
                    paddingTop: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {item?.amount}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Occupy
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Amount in {item?.name}
                  </Text>
                </View>
              );
            }}
          />
        ) : (
          <View
            style={{
              padding: 5,
              backgroundColor: "black",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingBottom: 15,
              gap: 40,
              paddingTop: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              0.000000
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Occupy
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Amount in USD-TRC
            </Text>
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
    
  );
};

export default Wallet;