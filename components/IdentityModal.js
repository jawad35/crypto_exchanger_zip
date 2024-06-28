import React from "react";
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

const IdentityModal = ({ showModal, closeModal }) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.authcontainer}>
            <Text style={styles.authtext}>Log In / Sign Up</Text>
            <Text style={styles.authtext2}>
              You have a token reward worth up to 700 USDT to claim!
            </Text>
            <View style={styles.buttoncontainer}>
              <Pressable
                style={styles.btn1}
                onPress={() => {
                  navigation.navigate("Signup"), closeModal();
                }}
              >
                <Text style={styles.textbtn}>Sign up</Text>
              </Pressable>
              <Pressable
                style={styles.btn2}
                onPress={() => {
                  navigation.navigate("Login"), closeModal();
                }}
              >
                <Text style={styles.textbtn2}>Log In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default IdentityModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    // marginBottom: 5,
    width: 20,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  authcontainer: {
    flexDirection: "column",
    width: "95%",
    alignSelf: "center",
    marginTop: 3,
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.5,
  },
  authtext: {
    paddingTop: 15,
    paddingLeft: 5,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  authtext2: {
    color: "#D3D3D3",
    fontSize: 12,
    marginLeft: 5,
    paddingBottom: 5,
    flexDirection: "column",
  },
  buttoncontainer: {
    flexDirection: "row",
    position: "relative",
    marginBottom: 10,
  },
  btn1: {
    marginTop: 10,
    marginLeft: 5,
    padding: 5,
    backgroundColor: "aqua",
    borderRadius: 15,
    width: 100,
    height: 30,
  },
  textbtn: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  btn2: {
    marginTop: 10,
    marginLeft: 5,
    padding: 5,
    backgroundColor: "#D3D3D3",
    borderRadius: 15,
    width: 100,
    height: 30,
  },
  textbtn2: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
