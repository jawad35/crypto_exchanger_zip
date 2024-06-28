import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Cycle from "./Cycle";
import SelectVolume from "./SelectVolume";
import { useSelector } from "react-redux";

const BuyUpModal = ({
  startTrade,
  itemSymbol,
  showModal,
  closeModal,
  onSelectCycle,
  setSelectedButtonIndex,
  selectedButtonIndex,
  onSelectVolume,
  setSelectedButtonIndexVol,
  selectedButtonIndexVol,
  minimumBalance,
}) => {
  const navigation = useNavigation();
  const userWallet = useSelector(
    (state) => state?.userReducer?.currentUser?.walletId
  );

  return (
    <Modal transparent={true} visible={showModal}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.modalTopHeader}>
            <View style={styles.headerSubContainer}>
              <View style={styles.buyupContainer}>
                <Text style={styles.buyupText}>Buy Up</Text>
              </View>
              <Text style={styles.symbolText}>
                {itemSymbol?.toUpperCase()}/USDT
              </Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <AntDesign name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.authcontainer}>
            <Cycle
              onSelectCycle={onSelectCycle}
              setSelectedButtonIndex={setSelectedButtonIndex}
              selectedButtonIndex={selectedButtonIndex}
            />
            <SelectVolume
              onSelectVolume={onSelectVolume}
              setSelectedButtonIndexVol={setSelectedButtonIndexVol}
              selectedButtonIndexVol={selectedButtonIndexVol}
              minBalance={minimumBalance}
            />
            <View
              style={{
                marginTop: "4%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
                Available assets :
              </Text>
              <Text style={{ fontSize: 16, color: "#FFFFFF" }}>
                {userWallet?.totalDeposit?.toPrecision(2) ?? `0.00`} USDT
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#0052fe",
                paddingVertical: 10,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
              onPress={startTrade}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "500" }}
              >
                Confirm Buy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BuyUpModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#000000",
   
    height: "80%",
    // padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: "flex-end",
    // alignItems: "center",
  },

  closeButton: {
    alignSelf: "flex-end",
    // marginBottom: 5,
    width: 20,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalTopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal:18,
    borderBottomColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
  },
  authcontainer: {
    paddingHorizontal: "5%",
  },
  headerSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buyupContainer: {
    backgroundColor: "#2ac187",
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginRight: 4,
    borderRadius:2
  },
  buyupText: { color: "white",fontSize:14 ,fontWeight:"500" },
  symbolText: { color: "white",fontSize:17 ,fontWeight:"500",marginLeft:5 },
});
