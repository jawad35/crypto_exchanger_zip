import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Ionicons
} from "@expo/vector-icons";
import CustomPicker from "../components/CustomPicker";
import OrderPicker from "../components/OrderPicker";
import ProgressBar from "../components/ProgressBar";
import { ScrollView } from "react-native-virtualized-view";

const Spot = ({ navigation, route, getCoinMarket, coins }) => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [coin, setCoin] = useState("bitcoin");
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state?.userReducer?.currentUser?._id);
  const [selectTab, setSelectTab] = useState('Option');

  const dispatch = useDispatch();
  const { coinId, itemSymbol } = route.params || {
    coinId: "bitcoin",
    itemSymbol: "BTC",
  };
  console.log("id", coinId);
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
  return (
    <SafeAreaView style={{
      backgroundColor: "white"
    }}>
      <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor: "white",
        height: "100%"
      }}
    >
      <View>
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
            onPress={() => navigation.navigate('Home2')}
          />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: selectTab === 'Option' ? 'black' : 'silver',
            }}
            onPress={() => navigation.navigate('Trade')}
          >
            Options
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Spot')}
          >
           <Text 
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: selectTab === 'Spot' ? 'black' : 'silver',
            }}
            onPress={() => setSelectTab('Spot')}>Spot</Text> 
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
        style={{ backgroundColor: "white", height: "100%", width: "100%" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "5%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo name="menu" size={20} color="black" />
            <Text
              style={{
                marginLeft: 5,
                color: "black",
                fontWeight: "bold",
                fontSize: 17,
              }}
            >
              {itemSymbol.toUpperCase()}/USDT
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
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
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: "3%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "45%",
              paddingHorizontal: "2%",
            }}
          >
            <View>
              <Text style={{ color: "black" }}>Price</Text>
              <Text style={{ color: "black" }}>(USDT)</Text>
            </View>
            <View>
              <Text style={{ color: "black" }}>Volume</Text>
              <Text style={{ color: "black" }}>(BTC)</Text>
            </View>
          </View>
          <View style={{ flexDirection: "column", width: "55%" }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={[styles.button, styles.buyUpButton]}>
                <Text style={{ color: "white" }}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buyDownButton]}>
                <Text style={{ color: "white" }}>Sell</Text>
              </TouchableOpacity>
            </View>
            <OrderPicker />

            <View
              style={{
                width: "100%",
                paddingVertical: 12,
                paddingHorizontal: 4,
                backgroundColor: "silver",
                marginTop: 15,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>
                Trade at the current best price
              </Text>
            </View>
            <View style={{}}>
              <ProgressBar />
            </View>
          </View>
        </View>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Spot;

const styles = StyleSheet.create({
  button: {
    width: "50%",
    height: 50,
    // borderRadius: 10,
    // paddingHorizontal: 30,
    // paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 10,
  },
  buyUpButton: {
    backgroundColor: "#2ebd85",
  },
  buyDownButton: {
    backgroundColor: "#df294a",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
