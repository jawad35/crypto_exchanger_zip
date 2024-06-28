import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view"
import { TextInput } from "react-native-gesture-handler";

const ChangePassword  = ({ navigation }) => {
  return (
    <SafeAreaView 
    style={{
      backgroundColor: "white",
      height: "100%"
    }}>
    <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor: "white",
        height: "100%"
      }}
    >
      <View
        style={{
          padding: 15,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color="black"
            onPress={() => navigation.goBack("")}
          />
        </View>
        <View style={{
            justifyContent: "center",
            paddingTop: 20,
            paddingBottom: 20,
            paddingHorizontal: 10
        }}>
             <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              paddingTop: 3
            }}
          >
         Change Password
          </Text>
          </View>
          <View>
        <Pressable style={{
            marginTop: 25,
            padding: 15,
            alignItems: "center",
            backgroundColor: "aqua",
            width: "98%",
        }}><Text style={{
            fontSize: 18
        }}>Confirm</Text></Pressable>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
