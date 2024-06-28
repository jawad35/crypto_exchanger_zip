import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { React, useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import { KeyboardAvoidingView } from "react-native-web";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  exptyingError,
  getAllUser,
  userLogin,
} from "../stores/user/userActions";
import Toast from "react-native-toast-message";
import axios from "axios";
import { api_url } from "../config";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(exptyingError());
  }, []);

  // const state = useSelector((state)=> state);
  const user = { email, password, username };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Validation error messages
  const emailError = email && !email.match(emailRegex) ? "Invalid email" : "";
  const passwordError =
    password && !password.match(passwordRegex)
      ? "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      : "";
  const confirmPasswordError =
    password !== confirmPassword ? "Passwords do not match" : "";

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const signUp = async () => {
    try {
      setIsLoading(true);
  
      if (!emailError && !passwordError && !confirmPasswordError && email && username && password && isChecked) {
        const createUserResponse = await axios.post(`${api_url}/user/create`, user);
        console.log('createUserResponse', createUserResponse)
        if (createUserResponse.data.status === 200) {
          const authuser = { email: email, password: password };
          dispatch(userLogin(authuser));
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "User created successfully",
          });
          navigation?.navigate("Home2");
        } else {
          Toast.show({
            type: "error",
            text1: "Ooops!",
            text2: createUserResponse?.data?.errMessage || createUserResponse?.data?.message || `An unexpected error occurred`,
          });
        }
      }
    } catch (error) {
      console.log('error', error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{ backgroundColor: "white", paddingBottom: 300 }}
        automaticallyAdjustKeyboardInsets={true}
      >
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
            onPress={() => navigation.goBack("")}
          />
        </View>
        <View
          style={{
            padding: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/bitgetlogo.png")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          ></Image>
          <Text
            style={{
              fontSize: 30,
              color: "aqua",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Create an account
          </Text>
        </View>
        <View style={{ paddingHorizontal: "6%" }}>
          <View>
            <TextInput
              labelValue={username}
              onChangeText={(username) => setUsername(username)}
              placeholder="Enter your username"
              style={{
                padding: 15,
                alignItems: "center",
                paddingLeft: 22,
                borderRadius: 8,
                borderWidth: 1,
              }}
              secureTextEntry={false}
            />
          </View>
          <View
            style={{
              marginTop: "3%",
            }}
          >
            <TextInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholder="Enter your email address"
              style={{
                padding: 15,
                alignItems: "center",
                paddingLeft: 22,
                borderRadius: 8,
                borderWidth: 1,
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {email && (
            <Text style={{ color: "red", marginBottom: 10 }}>{emailError}</Text>
          )}
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              padding: 15,
              marginTop: "3%",
              paddingLeft: 22,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TextInput
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholder="Enter your password"
              style={{}}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={{}}>
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {password && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {passwordError}
            </Text>
          )}
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              padding: 15,

              paddingLeft: 22,
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: "3%",
            }}
          >
            <TextInput
              labelValue={confirmPassword}
              onChangeText={(userPassword) => setConfirmPassword(userPassword)}
              placeholder="Confirm password"
              style={{}}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={{}}>
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {confirmPassword && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {confirmPasswordError}
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Checkbox
              style={{
                marginTop: 2,
              }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? "aqua" : "aqua"}
            />
            <Text style={{ marginLeft: 5, marginTop: 4 }}>
              By registering I agree with the{" "}
              <Text style={{ fontWeight: "bold", color: "aqua" }}>
                Terms of use.
              </Text>
            </Text>
          </View>
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
              onPress={() => signUp()}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Sign up
                </Text>
              )}
            </Pressable>
            <View
              style={{ flexDirection: "row", gap: 2, justifyContent: "center" }}
            >
              <Text>Already have an account?</Text>
              <Text
                style={{ color: "aqua" }}
                onPress={() => navigation.navigate("Signup")}
              >
                Log in
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Signup;
