import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { api_url } from "../config";
import axios from "axios";

const OtpConfirmation = ({ navigation, route }) => {
  const [showInput, setShowInput] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const param = route?.params
  
  useEffect(()=>{
    if(param?.email){
      setUserEmail(param?.email)
      setShowInput(false)
      handleSendOtpAgain()
      console.log("HAVE EMAIL", param?.email)
    }else{
      setShowInput(true)
      console.log("NOT HAVE EMAIL", param?.email)
    }
  },[param])

  

  const [otp, setOtp] = useState(0);
  const [loading, setLoading] = useState(false);


  const handleConfirm = async () => {
    try {
      setLoading(true);

      if (otp.length === 6) {
        const response = await axios.post(`${api_url}/user/verifyOtp`, {otp, email:userEmail})
        if(response?.data?.status === 200){
          console.log("OTP Confirmed:", otp);
          Toast.show({
            type: "success",
            text1: "Verification",
            text2: "User verificaton successful"
          })
          navigation.navigate("Login");
        }else if(response?.data?.status === 401){
          console.log("OTP Confirmed:", otp);
          Toast.show({
            type: "error",
            text1: "Invalid OTP",
            text2: "Invalid OTP, Try again"
          })
        }else{
          console.log("OTP Confirmed:", otp);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Error in verification"
          })
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid OTP length",
        });
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred during OTP verification",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtpAgain = async () => {
    try{
      if(userEmail){

        const request = await axios.post(`${api_url}/user/sendOtp`, { email:userEmail });
        console.log("reqq", request);
        Toast.show({
          type: "success",
          text1:"OTP Success",
          text2: "OTP Generated Success"
        })
        setShowInput(false)
      }else{
        Toast.show({type: "error", text1:"Enter Email", text2:"Enter email again"})
        setShowInput(true)
      }
      }catch(error){
        console.log("error generating ottpppp", error)
      }
    };

  const handleClose = () => {
    navigation.navigate("Home2");
  };

  return showInput ?  (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <AntDesign name="close" size={30} color="black" />
      </TouchableOpacity>

      
      <Text style={styles.headerText}>Enter email again</Text>
      
          <TextInput
            style={styles.input}
            keyboardType="email-address"

            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
            /> 

      <TouchableOpacity
        style={{
          backgroundColor: "aqua",
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 5,
        }}
        onPress={handleSendOtpAgain}
        disabled={loading}
      >
        <Text style={{ fontWeight: "800" }}>Send OTP</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="small" color="black" />}

    </View>
    
  ):
  <View style={styles.container}>
  <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
    <AntDesign name="close" size={30} color="black" />
  </TouchableOpacity>

<Text style={styles.headerText}>Enter OTP</Text>

  <TextInput
    style={styles.input}
    keyboardType="numeric"
    maxLength={6}
    value={otp}
    onChangeText={(text) => setOtp(text)}
    />
    
  
  <TouchableOpacity
    style={{
      backgroundColor: "aqua",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 5,
    }}
    onPress={handleConfirm}
    disabled={loading}
  >
    <Text style={{ fontWeight: "800" }}>Confirm</Text>
  </TouchableOpacity>

  {loading && <ActivityIndicator size="small" color="black" />}
</View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    textAlign: "center",
  },
  resendLink: {
    color: "blue",
    marginTop: 15,
  },
});

export default OtpConfirmation;
