import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomPicker from "../components/CustomPicker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api_url } from "../config";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const Exchange = () => {
  const userId = useSelector((state) => state.userReducer.currentUser?._id);

  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD"); // Default from currency
  const [toCurrency, setToCurrency] = useState("BTC"); // Default to currency
  const [result, setResult] = useState("");
  const [finalResult, setFinalResult] = useState(null);

  const showCurrencyName = (currency) => {};

  const showFromCurrencyName = (currency) => {};

  const convertCurrency = async () => {
    // https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801
    const apiKey =
      "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
    const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${selectedOption2.cId}&tsyms=${selectedOption.cId}&api_key=${apiKey}`;
    if ((amount, selectedOption, selectedOption2)) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const rate = data[selectedOption.cId];
        const convertedResult = parseFloat(amount) / rate;
        console.log("response", response);
        console.log("data", data);
        console.log("rate", rate);
        console.log("convertedRate", convertedResult);
        setFinalResult(convertedResult);

        setResult(
          `${amount} ${
            selectedOption?.label
          } is equal to ${convertedResult.toFixed(8)} ${selectedOption2.label}`
        );
      } catch (error) {
        setResult("Error: Unable to fetch exchange rate.");
        console.error(error);
      }
    } else {
      console.log("ADD AMOUNT");
    }
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const [filteredOptions, setFilterOptions] = useState(null);
  const [filteredOptions2, setFilterOptions2] = useState(null);

  const placeholder = {
    label: "Select an option...",
    value: null,
  };

  const options = [
    {
      label: "ETH",
      cId: "ETH",
      id: "ETH",
      icon: (
        <Image
          source={require("../assets/ETH.png")}
          style={{
            alignItems: "center",
            height: 30,
            width: 30,
            marginRight: 10,
          }}
        />
      ),
    },
    {
      label: "BTC",
      cId: "BTC",
      id: "BTC",
      icon: (
        <Image
        source={require("../assets/BTC.png")}
        style={{
          alignItems: "center",
          height: 30,
          width: 30,
          marginRight: 10,
        }}
      />
      ),
    },
    {
      label: "USDT",
      cId: "USD",
      id: "USDT",
      icon: (
        <Image
          source={require("../assets/USDT.png")}
          style={{
            alignItems: "center",
            height: 30,
            width: 30,
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    if (selectedOption) {
      const arr = options.filter(
        (option) => option?.label !== selectedOption.label
      );
      setFilterOptions(arr);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (selectedOption2) {
      const arr = options.filter(
        (option) => option?.label !== selectedOption2.label
      );
      setFilterOptions2(arr);
    }
  }, [selectedOption2]);

  console.log("___FILTERED___", filteredOptions);

  const handleSelection = (item) => {
    setSelectedOption(item);
    setShow(false);
  };

  const handleSelection2 = (item) => {
    setSelectedOption2(item);
    setShow2(false);
  };

  const handelAmount = (text) => {
    setShow(false);
    setShow2(false);

    let toNumber = Number(text);
    setAmount(toNumber);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (amount > 0) {
        console.log("___AMOUNT___", amount);
        convertCurrency();
      }
      // console.log()
    }, 1000);
    return () => clearTimeout(getData);
  }, [amount]);

  const sendRequest = async () => {
    if (selectedOption && selectedOption2 && amount && finalResult) {
      try {
        const response = await axios.post(`${api_url}/exchange/coins`, {
          from: selectedOption.label,
          to: selectedOption2.label,
          amount,
          convertedAmount: finalResult,
          userId,
        });
        console.log("ressss", response, response?.data?.status);
        if (response?.data?.status == 200) {
          Toast.show({
            type: "success",
            text1: response.data?.message,
            text2: "Conversion successful!",
          });
          navigation.navigate("Wallet");
        } else if (response?.status == 404) {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Wallet not found",
          });
        }
      } catch (e) {
        console.log("eeeeeeeeeee", e);
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: " Having touble on server",
        });
      }
    }
  };

  useEffect(() => {
    // sendRequest()
  }, [finalResult]);

  return (
    <SafeAreaView style={{ 
      flex: 1,
      backgroundColor: "white"}}>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.mainView}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Home2")}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
            <Text
            style={{
              padding: 5,
              marginLeft: 5,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Exchange
          </Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "black", fontSize: 17, marginBottom: 5, marginLeft: 5  }}>From</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 8,
                borderBottomWidth: 2,
                borderBottomColor: "gray",
              }}
            >
              <TextInput
                style={{ width: "45%", padding: 10 }}
                placeholder="Amount"
                placeholderTextColor="gray"
              />
              <TouchableOpacity>
                <Text style={{ color: "aqua", marginLeft:60 }}>Maximum</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 30,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => setShow(!show)}
              >
                <View style={{ marginHorizontal: 10 }}>
                  {selectedOption?.icon ? (
                    selectedOption.icon
                  ) : (
                    <Image
          source={require("../assets/ETH.png")}
          style={{
            alignItems: "center",
            height: 30,
            width: 30,
            marginLeft: 5
          }}
        />
                  )}
                </View>
                <Text
                  style={{
                    color: "black",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {selectedOption?.label ? selectedOption.label : "ETH"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{ color: "black" }}>
              Available Amount: 0 USDT
            </Text>
          </View>
          <View
            style={{
              position: "relative",
              marginVertical: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="exchange"
              size={24}
              color="gray"
              style={{ transform: [{ rotate: "90deg" }], position: "absolute" }}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "black", fontSize: 17, marginBottom: 5, marginLeft: 5 }}>To</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 8,
                borderBottomWidth: 2,
                borderBottomColor: "gray",
              }}
            >
              <TextInput
                style={{ width: "60%", padding: 10 }}
                placeholder="Amount received"
                placeholderTextColor="gray"
              />

              <TouchableOpacity
                style={{
                  width: 100,
                  height: 30,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => setShow2(!show2)}
              >
                <View style={{ marginHorizontal: 10 }}>
                  {selectedOption2?.icon ? (
                    selectedOption2.icon
                  ) : (
                    <Image
          source={require("../assets/BTC.png")}
          style={{
            alignItems: "center",
            height: 30,
            width: 30,
            marginLeft: 60,
          }}
        />
                  )}
                </View>
                <Text
                  style={{
                    color: "black",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {selectedOption2?.label ? selectedOption2.label : "BTC"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "aqua",
              paddingVertical: 14,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Convert
            </Text>
          </TouchableOpacity>
          {result && (
            <Text style={{ color: "black", fontSize: 15 }}>{result}</Text>
          )}
          {/* <View
            style={{
              marginTop: 80,
              height: "80%",
              backgroundColor: "#27272A",
              borderWidth: 0.3,
              borderColor: "aqua",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                top: 1,
                fontSize: 21,
                textAlign: "center",
                color: "white",
                // marginTop:30
              }}
            >
              Choose currencies and type amount
            </Text>
            <View
              style={{
                height: "40%",
                width: "100%",
                // backgroundColor: 'red',
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: "50%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>From</Text>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    backgroundColor: "aqua",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0.8,
                    borderColor: "white",
                  }}
                  onPress={() => setShow(!show)}
                >
                  {selectedOption ? (
                    <Text
                      style={{
                        color: "black",
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      {selectedOption?.label}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "black",
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      Choose
                    </Text>
                  )}
                </TouchableOpacity>
                <View style={styles.listView}>
                  {filteredOptions
                    ? show && (
                        <FlatList
                          data={filteredOptions}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              onPress={() => handleSelection(item)}
                              style={styles.list}
                            >
                              <Text style={{ color: "white", fontSize: 17 }}>
                                {item?.label}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      )
                    : show && (
                        <FlatList
                          data={options}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              onPress={() => handleSelection(item)}
                              style={styles.list}
                            >
                              <Text style={{ color: "white", fontSize: 17 }}>
                                {item?.label}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      )}
                </View>
              </View>

              <View
                style={{
                  height: "50%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>To</Text>

                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    backgroundColor: "aqua",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0.8,
                    borderColor: "white",
                  }}
                  onPress={() => setShow2(!show2)}
                >
                  {selectedOption2 ? (
                    <Text
                      style={{
                        color: "black",
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      {selectedOption2?.label}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "black",
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      Choose
                    </Text>
                  )}
                </TouchableOpacity>
                <View style={styles.listView}>
                  {filteredOptions2
                    ? show2 && (
                        <FlatList
                          data={filteredOptions2}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => handleSelection2(item)}
                              style={styles.list}
                            >
                              <Text style={{ color: "white", fontSize: 17 }}>
                                {item?.label}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      )
                    : show2 && (
                        <FlatList
                          data={options}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              key={item.id}
                              onPress={() => handleSelection2(item)}
                              style={styles.list}
                            >
                              <Text style={{ color: "white", fontSize: 17 }}>
                                {item?.label}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      )}
                </View>
              </View>
            </View>

            <View
              style={{
                height: "50%",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "white",
                  width: "80%",
                  borderRadius: 30,
                  padding: 5,
                  paddingHorizontal: 30,
                  fontSize: 20,
                }}
                placeholder="Type amount..."
                keyboardType="numeric"
                onChangeText={handelAmount}
                onFocus={() => setShow(false)}
                // onPointerEnter={}
              />
              {result && (
                <Text style={{ color: "white", fontSize: 15 }}>{result}</Text>
              )}
              {result && (
                <TouchableOpacity
                  onPress={() => sendRequest()}
                  style={{
                    width: 100,
                    height: 30,
                    backgroundColor: "aqua",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0.8,
                    borderColor: "white",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, color: "black", fontWeight: "bold" }}
                  >
                    Convert
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View> */}
        </View>
      </ScrollView>
      {show && (
        <View style={styles.listView}>
          {filteredOptions
            ? show && (
                <FlatList
                  data={filteredOptions}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => handleSelection(item)}
                      style={styles.list}
                    >
                      <View style={{ marginRight: 10 }}>{item?.icon}</View>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 17,
                        }}
                      >
                        {item?.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )
            : show && (
                <FlatList
                  data={options}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => handleSelection(item)}
                      style={styles.list}
                    >
                      <View style={{ marginRight: 10 }}>{item?.icon}</View>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 17,
                        }}
                      >
                        {item?.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
        </View>
      )}
      {show2 && (
        <View style={styles.listView}>
          {filteredOptions2
            ? show2 && (
                <FlatList
                  data={filteredOptions2}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelection2(item)}
                      style={styles.list}
                    >
                      <View style={{ marginRight: 10 }}>{item?.icon}</View>
                      <Text style={{ color: "white", fontSize: 17 }}>
                        {item?.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )
            : show2 && (
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleSelection2(item)}
                      style={styles.list}
                    >
                      <View style={{ marginRight: 10 }}>{item?.icon}</View>
                      <Text style={{ color: "black", fontSize: 17 }}>
                        {item?.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Exchange;

export const styles = StyleSheet.create({
  mainView: {
    padding: "3%",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    position: "relative",
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 5,
    // padding: 5,
    // borderWidth: 0.3,
    // borderColor: "aqua",
  },
  listView: {
    position: "absolute",
    top: "90%",
    height: "100%",
    width: "100%",
  },
});
