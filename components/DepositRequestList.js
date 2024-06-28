import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { api_url } from "../config";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

const DepositRequestList = ({ navigation }) => {

  const currentUser = useSelector((state)=> state.userReducer.currentUser)

  const [deposites, setDeposites] = useState([]);

  const getAllDeposit = async () => {
    const response = await axios.get(`${api_url}/deposit/getAllDeposit`, {headers:{id:  currentUser._id}});
    if (response?.status === 200) {
      setDeposites(response?.data?.deposites);
      console.log("DEPOSITS in REQUEST LIST", response?.data?.deposites);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllDeposit();
    }, [])
  );


  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#2E2E3B",
          height: "100%",
          width: "100%",
          padding: "3%",  
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home2")}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: "24%",
            }}
          >
            Deposit requests
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ flex: 1, fontWeight: "bold", color: "white" }}>
              User
            </Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Amount</Text>
          </View>
          {deposites ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={deposites}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={{ color: "white", flex: 1 }}>
                    {item.username}
                  </Text>
                  <Text style={[styles.tableCell, { paddingRight: 2 }]}>
                  {  Date(item.createdAt).slice(0, 21)}

                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DepositSlip", { slip: item })
                    }
                    style={[
                      styles.statusCell,
                      {
                        backgroundColor: item.submitedToAccount
                          ? "green"
                          : "red",
                      },
                    ]}
                  >
                    <Text style={{ color: "white" }}>
                      {item.submitedToAccount ? "Success" : "Pending"}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{...styles.tableCell, textAlign:"left"}}>{item?.currency === "USDT-TRC" ? "₮ trc" : item?.currency === "USDT-ERC" ? "₮ erc" : item?.currency === "BTC" ?  "₿" :"Ξ" } {item.amount}</Text>

                </View>
              )}
            />
          ) : (
            <Text style={{ color: "white" }}>No Data</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  table: {
    marginVertical: 10,
    paddingBottom: 50,
    // borderWidth: 1,
    // borderColor: "black",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
    // backgroundColor: "lightgrey",
    padding: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  statusCell: {
    textAlign: "center",
    // paddingVertical: 2,
    // paddingHorizontal: 2,
    width: 60,
    height: 20,
    borderRadius: 4,
  },
});

export default DepositRequestList;
