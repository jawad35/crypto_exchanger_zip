import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view"

const Deposit = ({ navigation }) => {
  return (
    <SafeAreaView 
    style={{
      backgroundColor: "white",
    }}>
    <ScrollView
      style={{
        height: "100%"
      }}
    >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color="black"
            style={{
              padding: 5,
              marginLeft: 10,
              marginTop: 10,
            }}
            onPress={() => navigation.goBack("")}
          />
          <Text
            style={{
              padding: 5,
              marginLeft: 5,
              marginTop: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Deposit
          </Text>
        </View>
      <View>
        <Text
          style={{
            padding: 10,
            marginLeft: 5,
            marginTop: 40,
            fontSize: 17,
            color: "gray",
          }}
        >
          Network
        </Text>
      </View>

      <Pressable
        style={{
          flexDirection: "row",
          width: "95%",
          alignSelf: "center",
          marginTop: 3,
          marginBottom: 10,
          borderRadius: 5,
          padding: 20,
          backgroundColor: "black",
          borderColor: "#D3D3D3",
          borderStyle: "solid",
          borderWidth: 0.5,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Usdterc")}
      >
        <Image
          source={require("../assets/USDT.png")}
          style={{
            alignItems: "center",
            height: 30,
            width: 30,
            marginRight: 10,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "white",
          }}
        >
          USDT-ERC
        </Text>
        <View
          style={{
            // marginLeft: 200,
            marginLeft: "auto",
          }}
        >
          <Ionicons name="md-arrow-forward-circle" size={24} color="gray" />
        </View>
      </Pressable>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: "95%",
          alignSelf: "center",
          marginTop: 3,
          marginBottom: 10,
          borderRadius: 5,
          padding: 20,
          backgroundColor: "black",
          borderColor: "#D3D3D3",
          borderStyle: "solid",
          borderWidth: 0.5,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Usdttrc")}
      >
        <Image
          source={require("../assets/USDT.png")}
          style={{
            alignItems: "center",
            height: 30,
            width: 30,
            marginRight: 10,
          }}
        />
        <Text
          style={{
            justifyContent: "center",
            fontSize: 20,
            color: "white",
          }}
        >
          USDT-TRC
        </Text>
        <View
          style={{
            // marginLeft: 200,
            marginLeft: "auto",
          }}
        >
          <Ionicons name="md-arrow-forward-circle" size={24} color="gray" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: "95%",
          alignSelf: "center",
          marginTop: 3,
          marginBottom: 10,
          borderRadius: 5,
          padding: 20,
          backgroundColor: "black",
          borderColor: "#D3D3D3",
          borderStyle: "solid",
          borderWidth: 0.5,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Btc")}
      >
        <Image
          source={require("../assets/BTC.png")}
          style={{
            alignItems: "center",
            height: 30,
            width: 30,
            marginRight: 10,
          }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            color: "white",
          }}
        >
          BTC
        </Text>
        <View
          style={{
            // marginLeft: 270,
            marginLeft: "auto",
          }}
        >
          <Ionicons name="md-arrow-forward-circle" size={24} color="gray" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: "95%",
          alignSelf: "center",
          marginTop: 3,
          marginBottom: 10,
          borderRadius: 5,
          padding: 20,
          backgroundColor: "black",
          borderColor: "#D3D3D3",
          borderStyle: "solid",
          borderWidth: 0.5,
        }}
        onPress={() => navigation.navigate("Eth")}
      >
        <Image
          source={require("../assets/ETH.png")}
          style={{
            alignItems: "center",
            height: 30,
            width: 30,
            marginRight: 10,
          }}
        />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            color: "white",
          }}
        >
          ETH
        </Text>
        <View
          style={{
            // marginLeft: 270,
            marginLeft: "auto",
          }}
        >
          <Ionicons name="md-arrow-forward-circle" size={24} color="gray" />
        </View>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Deposit;
