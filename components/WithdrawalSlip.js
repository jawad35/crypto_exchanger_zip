import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { api_url } from '../config';
// import { ScrollView } from "react-native-virtualized-view";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const WithdrawalSlip = ({ route, navigation }) => {
  const [amount, setAmount] = useState(0);

  const handleChange = (text) => {
    setAmount(text);
  };

  const { slip } = route.params;
  const confirmDeposit = async () => {
    try {
      if (amount) {
        const response = await axios.post(
          `${api_url}/withdrawal/acceptWithdrawal`,
          {
            userId: slip?.userId,
            withDrawalId: slip?._id,
            amount,
            currency: slip?.currency,
          }
        );
        console.log('RESPPPP OF WITHDRAAWWW', response);
        if (response.status === 200) {
          console.log('2000000', response);
          setAmount(0);
          Toast.show({
            type: 'success',
            text1: 'Withwaral completed successfully',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: response.data.message,
            text2: response.data.message,
          });
        }
      }
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Somthing wrong',
        text2: 'Somthing wrong',
      });
    }
  };

  return (
    <SafeAreaView style={{ height: '100%', width: '100%', flex: 1,backgroundColor:"#27272A" }}>

        <View
          style={{
            width: '100%',
            height: '100%',
            paddingHorizontal: '3%',
            paddingTop: '5%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: '28%',
                color: 'white'
              }}
            >
              Withdrawal Request
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: '10%',
              height: '80%',
            }}
          >
            {!slip?.submitedToAccount && (
              <View style={{ width: '80%', height: '50%', marginTop: '10%', justifyContent:"space-around", alignItems:"center" }}>
                <View style={{justifyContent:"space-between", flexDirection:"row", width:"90%"}}>
                <Text style={{fontWeight:"700", color:"white", fontSize:17}} >Amount:</Text>
                <Text style={{fontWeight:"700", color:"white", fontSize:17}} >{slip?.amount}</Text>
                </View>
                
                <View style={{justifyContent:"space-between", flexDirection:"row", width:"90%"}}>
                <Text style={{fontWeight:"700", color:"white", fontSize:17}} >User name: </Text>
                <Text style={{fontWeight:"700", color:"white", fontSize:17}} >{slip?.username}</Text>
                </View><View style={{justifyContent:"space-between", flexDirection:"row", width:"90%"}}>
                <Text style={{fontWeight:"700", color:"white", fontSize:17}} >Wallet:</Text>
                <Text style={{fontWeight:"700", color:"white", fontSize:17}} >{slip?.accountNumber}</Text>
                </View>

                <TextInput
                  keyboardType="numeric"
                  style={{
                    width: '100%',
                    height: 40,
                    backgroundColor: '#18181b',
                    borderRadius: 30,
                    paddingHorizontal: 30,
                    color: '#acacac',
                    fontSize: 20,
                  }}
                  placeholderTextColor={"#757474"}
                  onChangeText={handleChange}
                  value={amount}
                  placeholder="Amount to wallet"
                />
              </View>
            )}
            {!slip?.submitedToAccount ? (
              <View style={styles.container}>
                <TouchableOpacity
                  style={[styles.button, styles.buyUpButton]}
                  onPress={() => confirmDeposit()}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={[styles.button, styles.buyDownButton]}
                  // onPress={handleBuyDown}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity> */}
              </View>
            ) : (
              <Text style={{ color: 'black' }}> Wthdraw already completed</Text>
            )}
          </View>
        </View>

    </SafeAreaView>
  );
};

export default WithdrawalSlip;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buyUpButton: {
    backgroundColor: 'aqua',
  },
  buyDownButton: {
    backgroundColor: '#FF6A6A',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
