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

const WithdrawalRequest = ({ navigation }) => {
  const [withdrawal, setWithdrawal] = useState([]);

  const getAllWithdrawal = async () => {
    const response = await axios.get(`${api_url}/withdrawal/getAll`);
    if (response?.status === 200) {
      setWithdrawal(response?.data?.allWithDrwal);
      console.log("withdrawal in REQUEST LIST", response?.data?.allWithDrwal);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllWithdrawal();
      // getCoinMarket();
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
              marginLeft: "20%",
            }}
          >
            withdrawal requests
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
          {withdrawal ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={withdrawal}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={{ color: "white", flex: 1 }}>
                    {item.username}
                  </Text>
                  <Text style={[styles.tableCell, { paddingRight: 2 }]}>
                    {item.createdAt}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("WithdrawalSlip", { slip: item })
                    }
                    style={[
                      styles.statusCell,
                      {
                        backgroundColor: item?.isComplete
                          ? "green"
                          : "red",
                      },
                    ]}
                  >
                    <Text style={{ color: "white" }}>
                      {item.isComplete ? "Success" : "Pending"}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.tableCell}>{item.amount}</Text>
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

export default WithdrawalRequest;
