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

const LoanRequestList = ({ navigation }) => {
  const [loan, setLoan] = useState([]);

  const getAllLoan = async () => {
    try {
      const response = await axios.get(`${api_url}/loan/getAllLoan`);
      if (response?.status === 200) {
        setLoan(response?.data?.response);
        console.log("Loan in REQUEST LIST", response?.data?.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllLoan();
      // getCoinMarket();
    }, [])
  );

  // const deposites = [
  //   {
  //     _id: "65a3027214699dd97288071a",
  //     userId: "65a035a8262fea2c40b7be6c",
  //     username: "Khubaib",
  //     slipUrl: "2a6cc25a-c0c6-4c08-a8e6-4c7aca5856f4.jpeg",
  //     amount: 231,
  //     submitedToAccount: false,
  //     ticketNumber: "051b1257-a921-4dc6-a5ee-06aa4abc40e5",
  //     currency: "USDTTRC",
  //     createdAt: "JUN 10,2023",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65a42c3eb0ea5c0a18471l56",
  //     userId: "65a035a8262fea2c40b7be6c",
  //     username: "chodr",
  //     slipUrl: "cec14d80-fd19-4f2f-a5b0-ea7bfa300153.jpeg",
  //     amount: 321,
  //     submitedToAccount: false,
  //     ticketNumber: "39248f65-55ef-498c-b6f7-f2fbe24122ab",
  //     currency: "USDTTRC",
  //     createdAt: "JULY 15,2020",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65a42c3eb0ea5c0a18471z15",
  //     userId: "65a035a8262fea2c40b7be6c",
  //     username: "Anthani",
  //     slipUrl: "cec14d80-fd19-4f2f-a5b0-ea7bfa300153.jpeg",
  //     amount: 420,
  //     submitedToAccount: true,
  //     ticketNumber: "39248f65-55ef-498c-b6f7-f2fbe24122ab",
  //     currency: "USDTTRC",
  //     createdAt: "JUN 8,2017",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65a42c3eb0ea5c0a18471f04",
  //     userId: "65a035a8262fea2c40b7be6c",
  //     username: "Jhon",
  //     slipUrl: "cec14d80-fd19-4f2f-a5b0-ea7bfa300153.jpeg",
  //     amount: 570,
  //     submitedToAccount: false,
  //     ticketNumber: "39248f65-55ef-498c-b6f7-f2fbe24122ab",
  //     currency: "USDTTRC",
  //     createdAt: "JUN 7,2016",
  //     __v: 0,
  //   },
  // ];

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
            Loan requests
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
          {loan ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={loan}
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
                      navigation.navigate("LoanSlip", { loanReq: item })
                    }
                    style={[
                      styles.statusCell,
                      {
                        backgroundColor: item.isPass
                          ? "green"
                          : "red",
                      },
                    ]}
                  >
                    <Text style={{ color: "white" }}>
                      {item?.isPass ? "Success" : "Pending"}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.tableCell}>5000 USDT</Text>
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

export default LoanRequestList;
