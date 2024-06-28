import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import VolumeValue from "./VolumeValue";

const SelectVolume = ({
  onSelectVolume,
  setSelectedButtonIndexVol,
  selectedButtonIndexVol,
  minBalance
}) => {
  const [volValue, setVolValue] = useState("");

  const handleBoxPress = (item, index) => {
    setSelectedButtonIndexVol(index);
    onSelectVolume(item);
    setVolValue(item.value);
  };
  const boxData = [
    { label: '100',value: 100 },
    {label: '500', value: 500 },
    { label: '1000',value: 1000 },
    {label: '2000', value: 2000 },
    {label: '5000', value: 5000 },
    {label: '10000', value: 10000 },
    { label: '20000',value: 20000 },
    {label: 'All', value: 0.00 },
    // Add more box data as needed
  ];
  return (
    <View style={{ marginTop: "5%" , marginTop: "8%" }}>
      <Text style={{ fontWeight: "500", color: "white" ,fontSize:15 }}>Buying Volume</Text>
      <View
        style={{
          paddingHorizontal: 6,
          paddingVertical: 10,
          backgroundColor: "#2f323b",
          // borderRadius: 5,
          marginVertical: 16,
        }}
      >
        <Text style={{ color: "grey", fontWeight: "500", fontSize: 16 }}>
          {volValue ? volValue : minBalance || "Amount Min 100 USDT"}
        </Text>
      </View>
      <FlatList
        data={boxData}
        numColumns={"4"}
        columnWrapperStyle={{justifyContent:'space-between'}}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleBoxPress(item, index)}>
            <VolumeValue
              item={item}
              bgColor={selectedButtonIndexVol === index ? "#0052fe" : "#2f323b"}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SelectVolume;

const styles = StyleSheet.create({});
