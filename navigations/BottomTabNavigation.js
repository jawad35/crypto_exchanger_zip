import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import AuthModal from "../components/AuthModal";
import { DeFi, Home, Markets, Trade, Wallet } from "../screens";
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const currentUser = useSelector(
    (state) => state?.userReducer?.currentUser?.token
  );

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTabPress = (route) => {
    if (!currentUser) {
      setShowModal(true);
      return false; // Prevent navigation
    }
    return true; // Allow navigation
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Markets") {
              iconName = focused ? "bar-graph" : "bar-graph";
            } else if (route.name === "Trade") {
              iconName = focused ? "line-graph" : "line-graph";
            } else if (route.name === "DeFi") {
              iconName = focused ? "area-graph" : "area-graph";
            } else if (route.name === "Wallet") {
              iconName = focused ? "wallet" : "wallet";
            }

            return <Entypo name={iconName} size={size} color={color} />;
          },
          tabBarInactiveTintColor: "#D3D3D3",
          tabBarActiveTintColor: "#00FFFF",
          headerShown: false,
          tabBarShowLabel: true,
        })}
        tabBarOptions={{
          tabBarButton: (props) => (
            <TouchableWithoutFeedback
              {...props}
              onPress={() => handleTabPress(props.route)}
            />
          ),
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Markets" component={Markets} />
        <Tab.Screen name="Trade" component={Trade} />
        <Tab.Screen name="DeFi" component={DeFi} />
        <Tab.Screen name="Wallet" component={Wallet} />
      </Tab.Navigator>
      <AuthModal showModal={showModal} closeModal={closeModal} />
    </>
  );
};

export default BottomTabNavigation;
