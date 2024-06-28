import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ProgressBar = () => {
  const [step, setStep] = useState(0);
  const points = [0, 25, 50, 75, 100];

  const handlePress = (newStep) => {
    setStep(newStep);
  };

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        {points.map((point, index) => (
          <View
            key={index}
            style={[styles.pointContainer, { left: `${(point / 100) * 100}%` }]}
          >
            <Text
              style={[styles.point, step === point && styles.activePoint]}
              onPress={() => handlePress(point)}
            >
              {/* {point}% */}
            </Text>
            <Text style={{ color: "white", fontSize: 8 }}>{point}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    paddingRight: "10%",
  },
  lineContainer: {
    position: "relative",
    width: "100%",
    // height: 20,
    flexDirection: "row",
  },
  line: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "black",
    top: 9,
  },
  pointContainer: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
  },
  point: {
    width: 15,
    height: 20,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    lineHeight: 20,
  },
  activePoint: {
    backgroundColor: "blue",
  },
  stepText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProgressBar;
