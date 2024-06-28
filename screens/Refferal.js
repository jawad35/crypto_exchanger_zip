import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomPicker from "../components/CustomPicker";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const Referral = ({ navigation }) => {
  
  return (
    <SafeAreaView style={{
      backgroundColor: "white",
      flex: 1
    }}>
    <ScrollView>
    <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
          Refferal
        </Text>
        </View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
           <FontAwesome5
          name="history"
          size={25}
          color="black"
          style={{
            padding: 5,
            marginLeft: 240,
            marginRight: 20
          }}
          onPress={() => navigation.navigate("Deposithistory")}
        />
        </View>
        </View>
        </View>
        <View style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 40,
          gap: 50
        }}>
          <View style={{
            flexDirection: "column",
          }}>
          <Text style={{
            fontWeight: "600",
            fontSize: 15,
            marginLeft: 20
          }}>Invite friends and earn crypto {"\n"} 
          together</Text>
          <Text style={{
            fontWeight: "400",
            fontSize: 10,
            paddingTop: 10,
            marginLeft: 20 }}>Invite friends, recharge instantly and get comission</Text>
            <Image
          source={require("../assets/logos.png")}
          style={{
            alignItems: "center",
            height: 20,
            width: 120,
            marginLeft: 20,
            marginTop: 15
          }}
        />
            </View>
          <Image
          source={require("../assets/Invite.png")}
          style={{
            alignItems: "center",
            height: 100,
            width: 100,
          }}
        />
        </View>
        <View style={{
          flexDirection: "row",
          paddingTop: 40,
          gap: 80,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <View style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{ fontSize: 13, fontWeight: "400", color: "silver", paddingBottom: 5}}>First level</Text>
          <Text style={{ fontSize: 15, fontWeight: "700"}}> 0 </Text>
          
        </View>
        <View style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{ fontSize: 13, fontWeight: "400", color: "silver", paddingBottom: 5}}>Second level</Text>
          <Text style={{ fontSize: 15, fontWeight: "700"}}> 0 </Text>
          
        </View>
        <View style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{ fontSize: 13, fontWeight: "400", color: "silver", paddingBottom: 5}}>Third level</Text>
          <Text style={{ fontSize: 15, fontWeight: "700"}}> 0 </Text>
          
        </View>
        </View>
        <View style={{
          flexDirection: "row",
          paddingTop: 40,
          gap: 80,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <View style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{ fontSize: 13, fontWeight: "400", color: "silver", paddingBottom: 5}}>Total numbers of promotions</Text>
          <Text style={{ fontSize: 15, fontWeight: "700"}}> 0 </Text>
          
        </View>
        <View style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{ fontSize: 13, fontWeight: "400", color: "silver", paddingBottom: 5}}>Total Comission</Text>
          <Text style={{ fontSize: 15, fontWeight: "700"}}> 0 </Text>
          
        </View>
        </View>

        <View style={{
          flex: 1,
          marginTop: 30,
          alignSelf: "center",
          width: "95%",
          padding: 10,
          backgroundColor: "white",
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 30,
          
        }}>
          <View style={{
            flexDirection: "row"
          }}>
          <View style={{
            flex: 1,
            justifyContent: "center",
          
          }}>
          <TouchableOpacity style={{
            borderWidth: 1,
            borderColor: "aqua",
            borderRadius: 20,
            width: 200,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 20,
            padding: 15
          }}><Text style={{
            color: "aqua"
          }}>Scan code to share</Text></TouchableOpacity>
          </View>
          <View style={{
            flex: 2,
            paddingTop: 20,
            paddingBottom: 30
          }}>
          <Image
          source={require("../assets/Wallets.png")}
          style={{
            alignItems: "center",
            height: 300,
            width: 120,
            marginLeft: 145
          }}
        />
          </View>
          </View>
          
          <View
  style={{
    borderBottomColor: 'black',
    borderWidth: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
></View>
          <View style={{
            flexDirection: "column",
            gap: 20
          }}>
            <View style={{
              flexDirection: "row",
              paddingTop: 20,
              gap: 5
            }}>
            <Text style={{
              color: "silver"
            }}>Your Invitation code:</Text>
            <Text style={{
              color: "black"
            }}>BITG97</Text></View>
            <View style={{ 
              flexDirection: "row",
              gap: 5
            }}>
            <Text style={{
              color: "silver"
            }}>Sponsored links:</Text>
            <Text style={{
              color: "black"
            }}>http://bitgetpremium.com/BITG97</Text>
            </View>
            <View style={{ 
              flexDirection: "row"
            }}>
            <Text style={{
              color: "aqua",
              fontSize: 15,
              fontWeight: "700",
              paddingBottom: 10
            }}>Comission Details</Text>
            </View>
          </View>
          </View>
        </ScrollView>
        </SafeAreaView>
  );
};

export default Referral;