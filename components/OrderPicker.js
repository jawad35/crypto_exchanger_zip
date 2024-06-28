import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

const OrderPicker = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Market Order");

  const handleTogglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    setPickerVisible(false);
  };

  const items = [
    { label: "Market Order", value: "Market Order" },
    { label: "Limit Order", value: "Limit Order" },
  ];

  return (
    <>
      <TouchableOpacity
        onPress={handleTogglePicker}
        style={styles.customPickerMainView}
      >
        <View style={styles.CustomPickerIconView}>
          <Text style={styles.CustomPickerSelectedText}>{selectedValue}</Text>
          <AntDesign name="caretdown" size={20} color="white" />
        </View>
      </TouchableOpacity>
      {isPickerVisible && (
        <TouchableOpacity
          style={styles.CustomPicker}
          onPress={handleTogglePicker}
        >
          <View style={styles.CustomPickerModal}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleValueChange(item.value)}>
                  <View
                    style={[
                      styles.CustomPickerModalItem,
                      selectedValue === item.value &&
                        styles.CustomPickerModalItemSelected,
                    ]}
                  >
                    <Text style={styles.CustomPickerModalItemText}>
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  customPickerMainView: {
    // height: 32,
    width: "100%",
    marginTop: 15,
    // paddingHorizontal: 2,
    paddingVertical: 10,
    backgroundColor: "#414141",

    justifyContent: "center",
    paddingHorizontal: 6,
    position: "relative",
  },
  CustomPickerIconView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CustomPickerSelectedText: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "white",
  },
  CustomPicker: {
    flex: 1,
  },
  CustomPickerModal: {
    position: "absolute",
    // top: 202,
    // right: 20,
    backgroundColor: "gray",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  CustomPickerModalItem: {
    padding: 4,
  },
  CustomPickerModalItemSelected: {
    backgroundColor: "green",
    color: "white",
    borderRadius: 10,
    marginVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  CustomPickerModalItemText: {
    color: "white",
  },
});

export default OrderPicker;
