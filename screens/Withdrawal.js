import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import axios from "axios";
import { api_url } from "../config";
import Toast from "react-native-toast-message";


const Withdrawal = ({ navigation }) => {
  const [amount, setAmount] = useState(0);
  console.log(amount)
  const [userAccount, setUserAccount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(0)
  const [conecerndAmount, setConcerndAmount] = useState(null)
  const [wallet, setWallet] = useState([])
  const walletId = useSelector(
    (state) => state?.userReducer?.currentUser?.walletId?._id
  );
  const user = useSelector(
    (state) => state?.userReducer?.currentUser
  );
  const getWallet= async ()=>{
    try{const response = await axios.post(`${api_url}/user/getWallet`, {walletId})
    if(response?.data?.status === 200){
      let arr = response?.data?.wallet?.currentBalance.sort((a, b)=>  b.amount - a.amount)
      setWallet(arr)
    }
    }catch(error){
      console.log("EROOROROOROROOR", error)
    }
    // console.log(response)
  }

  useEffect(()=>{
    getWallet()
  },[])
  useEffect(()=>{
    let amount = wallet.find((item) => item.name == currencies[selectedCurrency]?.label)
    console.log("AMOUNT", amount)
    setConcerndAmount(amount)
  },[selectedCurrency])

  const currencies = [
  { id: '1', label: 'USDT-ERC' },
  { id: '2', label: 'USDT-TRC'},
  { id: '3', label: 'BTC'},
  { id: '4', label: 'ETH'},
]


const handleChangeAmount = (data)=>{
  
  console.log("AMONT",parseInt(data) ,"seleeelelle", conecerndAmount?.amount)
  if(data === "" || parseInt(data) <= conecerndAmount?.amount){
    setAmount(data)
  }else{
    Toast.show({type:"error", text1:"Amount error", text:"You cannot exceed amount"})
  }
}
const withdrawAmount = async () => {
  if(conecerndAmount && amount, userAccount){
    try{

      console.log("DATA",amount, conecerndAmount?.name, user._id, user?.username, userAccount );
      const withdrawReq = await axios.post(`${api_url}/withdrawal/create`,{username: user?.username,currency: conecerndAmount?.name,userId: user?._id, amount, accountNumber: userAccount })
      console.log("REESPONSE",withdrawReq?.data)
      if(withdrawReq?.data?.status == 200){
        Toast.show({type: "success", text1:"Success", text2: "Withdraw request succeess"})
        setAmount("")
        setUserAccount(null)
      }
    }catch(error){
      console.log("ERRORR",error)
    }
  }

};

  return (
    <SafeAreaView>
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
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: "24%",
            }}
          >
            Withdrawal
          </Text>
        </View>
        <View style={{backgroundColor:"gray", height:"20%", width:"100%", alignItems:"center", justifyContent:"center"}}>
            <FlatList 
            data={wallet}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={({item, index})=>{
             return( <View style={{ backgroundColor:"black",padding:7, flexDirection:"column" }}>
                <Text style={{color:"white",fontSize:17, padding:3}}>{item.name} {index}</Text>
                <Text style={{color:"white", fontSize:16}}>{item.amount} </Text>
                </View>
             )
            }} 
            />
        </View>

        <View style={{ height: "100%", justifyContent: "center" }}>
          <View style={{ justifyContent: "center", flexDirection:"row",marginBottom:15 }}>
            <FlatList showsHorizontalScrollIndicator={false}
            color="white"
            flexDirection="row"
            data={currencies}
            horizontal
            // style={styles.flatList}
            keyExtractor={(item) => item._id}
            renderItem={({item, index})=>{
              return(
                <TouchableOpacity style={selectedCurrency == index ? {...styles.currencyButton, backgroundColor:"aqua"}:styles.currencyButton} onPress={()=> setSelectedCurrency(index)}>
              <Text style={selectedCurrency == index ?{color: "black", fontSize:18, textAlign:"center", fontWeight:"bold"}: {color: "white", fontSize:18, textAlign:"center"}}>{item.label}</Text>

            </TouchableOpacity>
              )
            }} 
            />
            
          </View>
          {conecerndAmount && <Text style={styles.buttonText}>{conecerndAmount?.name}{":  "}{conecerndAmount?.amount}</Text>}
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 15,
              padding: 15,
              marginBottom: 20,
            }}
            placeholder="Please Enter Amount"
            value={amount}
            onChangeText={(text) => handleChangeAmount(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 15,
              padding: 15,
              marginVertical: 40,
            }}
            keyboardType="numeric"
            placeholder="Please Enter Crypto wallet"
            value={userAccount}
            onChangeText={(text) => setUserAccount(text)}
          />
          <TouchableOpacity
            style={[styles.button, styles.WithdrawalButton]}
            onPress={withdrawAmount}
          >
            <Text style={styles.buttonText}>Withdrawal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Withdrawal;

const styles = StyleSheet.create({
  mainView: {
    padding: "3%",
    height: "100%",
    width: "100%",
    // justifyContent: "center",
  },
  button: {
    width: 100,
    height: 50,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
  WithdrawalButton: {
    backgroundColor: "aqua",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  currencyButton:{
    backgroundColor:"gray",
    justifyContent:"center", 
    margin:10,
    padding:5,
    width:70, 
    height:30,
    alignContent:"center"
  },
  flatList:{
    flexDirection:"row",justifyContent: "center"
  }
});
