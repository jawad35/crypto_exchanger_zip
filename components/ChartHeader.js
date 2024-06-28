import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const ChartHeader = ({ selectedInterval, setSelectedInterval }) => {
  //   const [selectedInterval, setSelectedInterval] = useState('1m');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("More");

  const handleTogglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };
  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    setPickerVisible(false);
  };

  const items = [
    // { label: "More", value: "" },

    { label: "4h", value: "4h" },

    { label: "Day", value: "Day" },

    { label: "Month", value: "Month" },
    { label: "Year", value: "Year" },
  ];
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedInterval("1m")}
        >
          <Text
            style={{
              color: selectedInterval === "1m" ? "blue" : "white",
            }}
          >
            1m
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedInterval("5m")}
        >
          <Text
            style={{
              color: selectedInterval === "5m" ? "blue" : "white",
            }}
          >
            5m
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedInterval("15m")}
        >
          <Text
            style={{
              color: selectedInterval === "15m" ? "blue" : "white",
            }}
          >
            15m
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedInterval("30m")}
        >
          <Text
            style={{
              color: selectedInterval === "30m" ? "blue" : "white",
            }}
          >
            30m
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedInterval("1h")}
        >
          <Text
            style={{
              color: selectedInterval === "1h" ? "blue" : "white",
            }}
          >
            1h
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleTogglePicker}
          style={styles.customPickerMainView}
        >
          <View style={styles.CustomPickerIconView}>
            <Text style={styles.CustomPickerSelectedText}>{selectedValue}</Text>
            <AntDesign name="caretdown" size={12} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      {isPickerVisible && (
        <View>
          <View style={styles.CustomPicker}>
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    position: "relative",
  },
  button: {
    paddingHorizontal: 17,
    paddingVertical: 5,
  },
  customPickerMainView: {
    flex: 1,
  },
  CustomPickerIconView: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  CustomPickerSelectedText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginRight: 4,
  },
  CustomPicker: {
    flex: 1,
    // position: "absolute",
    // top: "100%",
    backgroundColor: "gray",
    width: "100%",
    paddingLeft: 16,
  },
  CustomPickerModal: {
    position: "absolute",
    top: "100%",
    backgroundColor: "gray",
    width: "100%",
    paddingLeft: 16,
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
  selectedButton: {
    color: "blue",
  },
});

export default ChartHeader;
