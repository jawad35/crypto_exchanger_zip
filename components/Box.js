import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BoxComponent = ({ time, percentage, bgColor }) => {
  return (
    <View style={[styles.box, { backgroundColor: bgColor }]}>
      <View style={styles.dataContainer}>
        <Text style={styles.timeText}>{time}s</Text>
      </View>
      <View style={[styles.dataContainer, styles.percentageContainer]}>
        <Text style={styles.percentageText}>{percentage.toPrecision(2)}%</Text>
      </View>
    </View>
  );
};

export default BoxComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 75,
    height: 50,
    borderColor: "white",
    // borderWidth: 1,
    // borderRadius: 5,
    marginRight: 10,
  },
  dataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  percentageContainer: {
    // backgroundColor: "lightgray",
  },
  timeText: {
    fontSize: 14,
    fontWeight:"500",
    color: "white",
  },
  percentageText: {
    fontSize: 12,
    color: "white",
    fontWeight:"500",
  },
});
