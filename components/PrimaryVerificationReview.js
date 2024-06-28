import { View, Text, Image, Pressable, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view"

const PrimaryVerificationReview = ({ navigation }) => {
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
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                paddingTop: 3
                            }}
                        >
                            Primary Verifcation
                        </Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        paddingTop: 20,
                        paddingBottom: 20,
                        paddingHorizontal: 10
                    }}>
                        <View style={styles.container}>
                            <Text style={styles.text}>Information is being reviewed </Text>
                            <ActivityIndicator size="small" color="#0000ff" />
                        </View>
                        <View style={{marginTop:'20px'}}>
                            <Text>If you need to change the bindin, please <Text style={styles.secondText}>Contact Customer Support</Text></Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        color: '#000000',
    },
    secondText:{
        color:'blue',
        textDecorationLine:'underline',
        fontSize:17,
        fontWeight:'bold'
    }
});

export default PrimaryVerificationReview;
