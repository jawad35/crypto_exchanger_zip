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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { api_url } from "../config";
// import { ScrollView } from "react-native-virtualized-view";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from "axios";

const LoanSlip = ({ route, navigation }) => {
  const [amount, setAmount] = useState(0);

  const handleChange = (text) => {
    setAmount(text);
  };

  const { loanReq } = route.params;
  const confirmLoanReq = async () => {
    try {
      const response = await axios.post(`${api_url}/loan/acceptLoanRequest`, {
        userId: loanReq?.userId,
        walletId: loanReq?.walletId,
        amount,
        loanId: loanReq?._id,
        currency: loanReq?.currency,
      });
      console.log("Response", response);
    } catch (e) {
      console.log("ERROR", e);
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
              Loan Request
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
              {loanReq?.frontId ? (
                <TouchableOpacity style={{width:"100%",
                height:"50%"}}
                onPress={()=>navigation.navigate("ViewFullImage", {uri: `${api_url}/${loanReq?.frontId}` })}
                >

                <Image
                  source={{ uri: `${api_url}/${loanReq?.frontId}` }}
                  width="100%"
                  height="100%"
                  />
                  </TouchableOpacity>
              ) : (
                <Text style={{ textAlign: "center" }}>No Image</Text>
              )}
              {loanReq?.backId ? (
                <TouchableOpacity style={{width:"100%",
                height:"50%", marginTop:5}}
                onPress={()=>navigation.navigate("ViewFullImage", {uri: `${api_url}/${loanReq?.backId}` })}
                >

                <Image
                  source={{ uri: `${api_url}/${loanReq?.backId}` }}
                  width="100%"
                  height="100%"
                  />
                  </TouchableOpacity>
              ) : (
                <Text style={{ textAlign: "center" }}>No Image</Text>
              )}
              
            </View>
            {!loanReq?.isPass && (
              <View style={{ width: "80%", height: 40, marginTop: "10%" }}>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 30,
                    paddingHorizontal: 30,
                    color: "white",
                    fontSize: 20,
                  }}
                  onChangeText={handleChange}
                  value={amount}
                  placeholder="Loan denial to user"
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
          {!loanReq?.isPass && (
            <View style={styles.container}>
              <TouchableOpacity
                style={[styles.button, styles.buyUpButton]}
                onPress={() => confirmLoanReq()}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buyDownButton]}
                // onPress={handleBuyDown}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoanSlip;

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
