import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
const CustomPicker = ({ selectedValue, onValueChange, items }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleTogglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleValueChange = (itemValue) => {
    onValueChange(itemValue);
    setPickerVisible(false);
  };

  return (
    <TouchableOpacity
      onPress={handleTogglePicker}
      style={styles.customPickerMainView}
    >
      <View style={styles.CustomPickerIconView}>
        <Text
          style={
            !selectedValue
              ? styles.CustomPickerText
              : styles.CustomPickerSelectedText
          }
        >
          {!selectedValue ? "Select Duration" : selectedValue}
        </Text>
        {/* <Image source={downArrow} style={styles.CustomPickerIcon} /> */}
      </View>
      <Modal
        visible={isPickerVisible}
        transparent
        style={styles.customPickerMainView}
      >
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
                      selectedValue === item?.value
                        ? styles.CustomPickerModalItemSelected
                        : styles.CustomPickerModalItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.CustomPickerModalItemText,
                        selectedValue === item?.value
                          ? styles.CustomPickerModalItemSelected
                          : styles.CustomPickerModalItem,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customPickerMainView: {
    height: 32,
    width: 115,
    borderWidth: 2,
    paddingHorizontal: 2,
    borderColor: "black",
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  pickerCon: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 12,
  },
  picker: {
    height: 22,
    width: Dimensions.get("window") - 50,
  },
  CustomPicker: {
    flex: 1,
  },
  CustomPickerIconView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  CustomPickerIcon: {
    marginLeft: 6,
    width: 12,
    height: 12,
  },
  CustomPickerModal: {
    position: "absolute",
    top: 202,
    right: 20,
    backgroundColor: "#fff",
    width: 115,
    // borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: 'center',
  },
  CustomPickerText: {
    fontSize: 15,
    color: "black",
    fontFamily: "sans-serif",
  },
  CustomPickerSelectedText: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "black",
  },
  CustomPickerModalItem: {
    padding: 4,
  },
  CustomPickerModalItemSelected: {
    backgroundColor: "green",
    color: "black",
    borderRadius: 10,
    marginVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  CustomPickerModalItemText: {
    color: "black",
  },
});

export default CustomPicker;
