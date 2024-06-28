import React, { useEffect, useState, userReducer } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome, MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../stores/user/userActions";
import IdentityVerificationModal from "./IdentityVerificationModal";

const CustomDrawer = (props) => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
  };
  const currentUser = useSelector(
    (state) => state?.userReducer?.currentUser?.username
  );


  useEffect(() => {
    if (!currentUser?.username) {
      props.navigation.closeDrawer();
      
    }
  }, [currentUser]);

  // const signOut = () => {
  //   dispatch(userLogOut());
  // };

  const signOut = () => {
    // setLoading(true);
    dispatch(userLogOut());
    // props.navigation.navigate("Home2");
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <IdentityVerificationModal props={props} toggleModal={toggleModal} isModalVisible={isModalVisible}/>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <FontAwesome
            name="user-circle"
            size={65}
            color="black"
            style={{
              padding: 20,
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{ color: "black", paddingTop: 25, fontWeight: "bold", textTransform: "uppercase" }}
            >
              {currentUser}
            </Text>
            <Text style={{ color: "gray" }}>UID: 71733</Text>
           <Text style={{ color: "gray" }}>Credit Score: 70</Text>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="verified"
                size={20}
                // color={userReducer?.currentUser?.isVerified ? "lime":"gray"}
                color="lime"
              />
              <Text
                // style={ userReducer?.currentUser?.isVerified ? styles.verifiedStyle : styles.notVeirfiedStyle }
                style={styles.verifiedStyle}
              >
                {/* {userReducer?.currentUser?.isVerified
                  ? "Verified"
                  : "Not verified"} */}
                Verified
              </Text>
            </View>
            {/* { !userReducer?.currentUser?.isVerified && <TouchableOpacity >
               <Text style={{fontSize:12, textDecorationLine:"underline"}}>
                Click here to verify
               </Text>
              </TouchableOpacity>} */}
          </View>
        </View>
        <View>
          <View style={{
            padding: 10,
            backgroundColor: "aqua",
            marginHorizontal: 30,
            borderRadius: 10,
            flexDirection: "row",
            gap: 20,
            justifyContent: 'center'
          }}>
            <Text style={{
              justifyContent: "center",
              paddingTop: 3,
              color: "white",
              fontWeight: "700"}}>Options</Text>
          <Text style={{
              justifyContent: "center",
              color: "white",
              paddingTop: 3,
              fontWeight: "600"}}>Trade Digital Currency</Text>
          <Feather name="arrow-right" size={24} color="white" />
          </View>
        </View>
        <DrawerItem
          label="Identity Verification"
          onPress={() => {
            setIsModalVisible(true)
            // Handle onPress event for the new drawer item
          }}
          icon={({ color, size }) => (
            <FontAwesome5 name="address-card" size={24} color="#000000" />
          )}
          labelStyle={{ marginLeft: -20, marginTop: 5 }}
        />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            marginVertical: 30,
            padding: 15,
            backgroundColor: "aqua",
            fontWeight: "400"
          }}
          onPress={() => signOut()}
        >
          {/* {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : ( */}
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Sign out
            </Text>
          {/* )} */}
        </TouchableOpacity>
      </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  verifiedStyle: {
    color: "lime",
    fontWeight: "bold",
    fontSize: 13,
    textTransform: "uppercase",
    paddingLeft: 2,
  },
  notVeirfiedStyle: {
    color: "red",
    fontWeight: "bold",
    fontSize: 13,
    textTransform: "uppercase",
    paddingLeft: 2,
  },
});
