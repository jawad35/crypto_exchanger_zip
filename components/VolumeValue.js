import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const {width} = Dimensions.get('window')
const VolumeValue = ({ item, bgColor }) => {
  return (
    <View>
      <View style={[styles.box, { backgroundColor: bgColor }]}>
        <View style={styles.dataContainer}>
          <Text style={styles.timeText}>{item?.label}</Text>
        </View>
      </View>
    </View>
  );
};

export default VolumeValue;

const styles = StyleSheet.create({
  box: {
    width: width /5,
    height: 30,
    borderColor: "white",
    // borderWidth: 1,
    // borderRadius: 5,
    marginVertical: 6,
    // padding:1
  },
  dataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // gap:3
  },
  timeText: {
    fontSize: 16,
    color: "white",
  },
});
