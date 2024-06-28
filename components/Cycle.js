import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BoxComponent from "./Box";

const Cycle = ({
  onSelectCycle,
  selectedButtonIndex,
  setSelectedButtonIndex,
}) => {
  const handleBoxPress = (item, index) => {
    setSelectedButtonIndex(index);
    onSelectCycle(item);
  };

  const renderBox = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleBoxPress(item, index)}>
      <BoxComponent
        time={item?.time}
        percentage={item?.percentage}
        bgColor={selectedButtonIndex === index ? "#0052fe" : "#2f323b"}
      />
    </TouchableOpacity>
  );

  const boxData = [
    { time: 30, percentage: 3 },
    { time: 60, percentage: 5 },
    { time: 120, percentage: 12 },
    { time: 180, percentage: 20 },
    { time: 240, percentage: 30 },
    { time: 300, percentage: 42 },
    // Add more box data as needed
  ];

  return (
    <View style={{ marginTop: "5%" }}>
      <Text style={{ marginBottom: 16, fontWeight: "500", color: "white" ,fontSize:15 }}>
        Select Cycle
      </Text>
      <FlatList
        data={boxData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedBox: {
    backgroundColor: "green",
  },
  unselectedBox: {
    backgroundColor: "black",
  },
});

export default Cycle;
