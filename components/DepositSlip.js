import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { api_url } from "../config";
// import { ScrollView } from "react-native-virtualized-view";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

const DepositSlip = ({ route, navigation }) => {
  const currentUser = useSelector((state)=> state.userReducer.currentUser)
  const [amount, setAmount] = useState(0);
  const { slip } = route.params;

  const handleChange = (text) => {
    setAmount(text);
  };



  const confirmDeposit = async (success) => {

    const config = {
      
    }
console.log("CURRENT USERRRRR", currentUser)
    console.log("Axios Request Config:", {
      userId: slip?.userId,
      walletId: slip?.walletId,
      amount,
      depositId: slip?._id,
      currency: slip?.currency,
      headers: {
          Authorization: `Bearer ${currentUser?.token}`,
          id: currentUser?._id
      }
  });
    try {

      const response = await axios.post(`${api_url}/deposit/confirmDeposit`, {
        userId: slip?.userId,
        walletId: slip?.walletId,
        amount,
        depositId: slip?._id,
        currency: slip?.currency,
        success,
      }, {headers:{
        Authorization: `Bearer ${currentUser?.token}`,
        id: currentUser?._id
      }});
      console.log("COMPLETED RESP DEPO",response);
      if(response?.status === 200){
        Toast.show({type:"success", text1: response?.data?.message,text2: response?.data?.message})
      }
      navigation.goBack()
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ height: "100%", width: "100%", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: "3%",
            paddingTop: "5%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: "28%",
              }}
            >
              Deposit Slip
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: "10%" }}>
            <View
              style={{
                borderWidth: 2,
                borderColor: "aqua",
                borderStyle: "dashed",
                height: 400,
                width: 300,
              }}
            >
              {slip?.slipUrl ? (
                <Image
                  source={{ uri: `${api_url}/${slip?.slipUrl}` }}
                  width="100%"
                  height="100%"
                />
              ) : (
                <Text style={{ textAlign: "center" }}>No Image</Text>
              )}
            </View>
            <View style={{width:350,height:90, alignItems:"flex-start", justifyContent:"flex-end"}}>
              <Text style={{fontSize:20}}>Deposit by user: {slip?.amount}</Text>
              </View>
            {!slip?.submitedToAccount && (
              <View style={{ width: "80%", height: 40, marginTop: "10%" }}>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 30,
                    paddingHorizontal: 30,
                    color: "black",
                    fontSize: 20,
                  }}
                  onChangeText={handleChange}
                  value={amount}
                  placeholder="Amount to wallet"
                />
              </View>
            )}
            {/* <GestureHandlerRootView>
                <TextInput
                  style={{
  
                    borderWidth: 1,
                    borderRadius: 15,
                    width: 400,
                    padding: 15,
                    marginTop: 10,
                  }}
                  placeholder="Please Enter Amount"
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                  keyboardType="numeric"
                />
  
              </GestureHandlerRootView> */}
          </View>
          {!slip?.submitedToAccount &&  (
            <View style={styles.container}>
              <TouchableOpacity
                style={[styles.button, styles.buyUpButton]}
                onPress={() => confirmDeposit(true)}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buyDownButton]}
                // onPress={handleBuyDown}
                onPress={() => confirmDeposit(false)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DepositSlip;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buyUpButton: {
    backgroundColor: "aqua",
  },
  buyDownButton: {
    backgroundColor: "#FF6A6A",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
