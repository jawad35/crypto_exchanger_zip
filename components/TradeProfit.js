
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import axios from "axios";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import React, {  useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  Ionicons
} from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { api_url } from "../config";
import { useSelector } from "react-redux";

const TradeProfit = ({ navigation, route }) => {
    const {toUser} = route?.params 

  const [depositAmount, setDepositAmount] = useState(0);

  // _______________________________________

  const [image, setImage] = useState(null);
  const { userReducer } = useSelector((state) => state);

  const data = {
    userId: userReducer?.currentUser?._id,
    username: userReducer?.currentUser?.username,
    amount: depositAmount,
    currency: "USDTTRC",
  };
  const depositData = JSON.stringify(data);


  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImage(pickerResult?.assets[0].uri);
    const name = "Ali";
    const email = "2@gmail.com";

    // Create the request payload
  };

  const handleDeposit = async () => {
    try {
      if (!depositAmount || !image) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter the deposit amount and select an image.",
        });
        return;
      } else {
        const uploadResult = await FileSystem.uploadAsync(
          `${api_url}/deposit/approveDeposit`,
          image,
          {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "demo_image",
            headers: {
              data: depositData,
            },
          }
        );
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Deposit submit successfully.",
        });
        setImage(null);
        setDepositAmount(null);
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send deposit request.",
      });
    }
  };
  return (
    <SafeAreaView>
      

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
            Approve Deposit
          </Text>
        </View>        
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
            marginBottom: 150,
          }}
        >
            <View style={{width:"80%", height:40, marginTop:'10%', }}>
            <TextInput keyboardType='numeric' onChange={(e)=> setDepositAmount(e)} value={depositAmount} style={{width:"100%",height:"100%", backgroundColor:"gray", borderRadius:30, paddingHorizontal:30, color:"white", fontSize:20}}  />
            </View>
          <View style={{justifyContent: "center", marginTop:"10%" }}>
            <TouchableOpacity  onPress={() => openImagePickerAsync()} style={{borderRadius:30, height:40,width:110, backgroundColor: "blue", alignItems:"center", justifyContent:"center" }}> 
            <Text style={{color:"white"}}>
                Pick Image
                </Text> 
                </TouchableOpacity>
            {image && ( 
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 10,
            backgroundColor: "gray",
            borderRadius: 25,
            width: 200,
            marginTop: 20,
            marginBottom: "5%",
          }}
          onPress={handleDeposit}
        >
          <Text style={{ color: "white", marginRight: 5 }}>Submit Deposit</Text>
          <Ionicons name="ios-send" size={24} color="white" />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TradeProfit;
