import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { React, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
  TextInput,
} from "react-native-gesture-handler";
import { userLogin } from "../stores/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import axios from "axios";
import { api_url } from "../config";

const Login = ({ navigation }) => { 
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const user = { email: email, password: password };
  const userState = useSelector((state) => state?.userReducer);
  console.log(userState);
  useEffect(() => {
    if (userState?.currentUser?.username) {
      setIsLoading(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `Welcome ${userState?.currentUser?.username} `,
      });
      navigation?.navigate("Home2");
    } else {
      if (userState?.error !== null || undefined) {
        if(userState?.error?.status === 404 || 401){
          setIsLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: `Error login: ${userState?.error?.message} `,
          });
        }
        if(userState?.error?.status === 403){
          setIsLoading(false)
          Toast.show({
            type: "error",
            text1: "Verify email",
            text2: `Error login: ${userState?.error?.message} `,
          });
          navigation.navigate("Otp", {email: email})
        }
      }
    }
  }, [userState?.currentUser, userState?.error]);

  const signIn = () => {
    if (email && password) {
      setIsLoading(true);
      dispatch(userLogin(user));
    } else {
      Toast.show({
        type: "error",
        text1: "error",
        text2: "Please fill all fields",
      });
      setIsLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 300 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name="close"
            size={35}
            color="black"
            style={{
              padding: 5,
              marginLeft: 10,
              marginTop: 15,
            }}
            onPress={() => navigation.navigate("Home2")}
          />
        </View>
        <View
          style={{
            padding: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "aqua",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Welcome to Bitget
          </Text>
          <Image
            source={require("../assets/bitgetlogo.png")}
            style={{ justifyContent: "center", alignItems: "center" }}
          ></Image>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <TextInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholder="Enter your email address"
            style={{
              padding: 15,
              alignItems: "center",
              width: "85%",
              paddingLeft: 22,
              borderRadius: 8,
              borderWidth: 1,
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          ></TextInput>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholder="Enter your password"
            style={{
              padding: 15,
              alignItems: "center",
              width: "85%",
              paddingLeft: 22,
              borderRadius: 8,
              borderWidth: 1,
            }}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <Text
          style={{
            color: "aqua",
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 35,
          }}
        >
          Forgot your password?
        </Text>

        <View>
          <Pressable
            style={{
              width: "75%",
              alignSelf: "center",
              marginTop: 3,
              marginBottom: 10,
              borderRadius: 35,
              padding: 10,
              backgroundColor: "aqua",
              borderColor: "#D3D3D3",
              borderStyle: "solid",
              borderWidth: 0.5,
              alignItems: "center",
            }}
            onPress={() => signIn()}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Login{" "}
              </Text>
            )}
          </Pressable>
          <View
            style={{ flexDirection: "row", gap: 2, justifyContent: "center" }}
          >
            <Text>Don't have an account?</Text>
            <Text
              style={{ color: "aqua" }}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign up
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Login;
