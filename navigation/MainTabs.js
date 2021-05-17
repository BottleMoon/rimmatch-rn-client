import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "./ProfileScreen";
import ClubScreen from "./ClubScreen";
import CommunityScreen from "./CommunityScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs({ navigation }) {
  return (
    <Tab.Navigator style={styles.navigator} initialRouteName="Home">
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="home" color="grey" size={25} />,
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Club"
        component={ClubScreen}
        options={{
          tabBarLabel: "Club",
          tabBarIcon: () => <Ionicons name="people" color="grey" size={25} />,
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: () => <Ionicons name="people" color="grey" size={25} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <Ionicons name="ellipsis-horizontal" color="grey" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  navigator: {
    backgroundColor: "#000000",
  },
});
