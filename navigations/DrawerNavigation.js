import { View, Text, TurboModuleRegistry, Pressable } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Entypo,
  MaterialIcons,
  FontAwesome5,
  Octicons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import BottomTabNavigation from "./BottomTabNavigation";
import { Account, Support, Trade, Loan, Settings, Login } from "../screens";
import CustomDrawer from "../components/CustomDrawer";
import { useSelector } from "react-redux";
import LoanRequestList from "../components/LoanRequestList";
import WithdrawalRequest from "../screens/WithdrawalRequest";
import DepositRequestList from "../components/DepositRequestList";
import Terms from "../screens/Terms";
import PrimaryVerification from "../screens/PrimaryVerification";
import ChangePassword from "../screens/ChangePassword";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import FundPassword from "../screens/FundPassword";
import IdentityVerificationModal from "../components/IdentityVerificationModal";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const currentUser = useSelector((state) => state?.userReducer?.currentUser);
  return (
    <Drawer.Navigator
      initialRouteName="Home2"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: { width: 400 },
      }}
    >
      {currentUser?.roleId === "admin" && (
        <>
          <Drawer.Screen
            name="AdminButton"
            options={{
              drawerLabel: "Deposit Requests",
              title: "requestList",
              headerShadowVisible: false,
              headerShown: false,
              drawerIcon: () => (
                <MaterialIcons name="smart-button" size={24} color="#000000" />
              ),
            }}
            component={DepositRequestList}
          />
          <Drawer.Screen
            name="LoanRequest"
            options={{
              drawerLabel: "Loan Requests",
              title: "Request List",
              headerShadowVisible: false,
              headerShown: false,
              drawerIcon: () => (
                <MaterialIcons name="smart-button" size={24} color="#000000" />
              ),
            }}
            component={LoanRequestList}
          />
          <Drawer.Screen
            name="WithdrawalRequest"
            options={{
              drawerLabel: "Withdrawal Requests",
              title: "Request List",
              headerShadowVisible: false,
              headerShown: false,
              drawerIcon: () => (
                <MaterialIcons name="smart-button" size={24} color="#000000" />
              ),
            }}
            component={WithdrawalRequest}
          />
        </>
      )}
      <Drawer.Screen
        name="Home2"
        options={{
          drawerLabel: "Home",
          title: "Futures",
          headerShadowVisible: false,
          headerShown: false,
          drawerItemStyle: { height: 0 }
        }}
        component={BottomTabNavigation}
      />
      <Drawer.Screen
        name="Primary Verification"
        options={{
          drawerLabel: "Primary Verifcation",
          title: "Futures",
          headerShadowVisible: false,
          headerShown: false,
          drawerIcon: () => (
            <Octicons name="verified" size={24} color="#000000" />
          ),
        }}
        component={PrimaryVerification}
      />
      {/* <Drawer.Screen
        name="Identity Verification"
        options={{
          drawerLabel: "Identity Verification",
          title: "Futures",
          headerShadowVisible: false,
          drawerIcon: () => (
            <FontAwesome5 name="address-card" size={24} color="#000000" />
          ),
        }}
        component={IdentityVerificationModal}
      /> */}
        <Drawer.Screen
        name="Fund Password"
        options={{
          drawerLabel: "Set up a fund password",
          title: "Futures",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Entypo
              name="shield"
              size={24}
              color="#000000"
            />
          ),
        }}
        component={FundPassword}
      />
      <Drawer.Screen
        name="Email Confirmation"
        options={{
          drawerLabel: "Email Confirmation",
          title: "Futures",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="email-check-outline"
              size={24}
              color="#000000"
            />
          ),
        }}
        component={Trade}
      />
      <Drawer.Screen
        name="Change Password"
        options={{
          drawerLabel: "Change Password",
          title: "Futures",
          headerShadowVisible: false,
          drawerIcon: () => (
            <MaterialIcons name="lock-outline" size={24} color="#000000" />
          ),
        }}
        component={ChangePassword}
      />
      <Drawer.Screen
        name="Privacy Policy"
        options={{
          drawerLabel: "Privacy Policy",
          title: "Futures",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons
              name="ios-document-text-outline"
              size={24}
              color="#000000"
            />
          ),
        }}
        component={PrivacyPolicy}
      />
      <Drawer.Screen
        name="Terms of Service"
        options={{
          drawerLabel: "Terms of Service",
          title: "Futures",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons
              name="ios-document-text-outline"
              size={24}
              color="#000000"
            />
          ),
        }}
        component={Terms}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
