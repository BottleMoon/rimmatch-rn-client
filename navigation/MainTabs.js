import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyPageScreen from "./MyPageScreen.js";
import ClubScreen from "./ClubScreen";
import CommunityScreen from "./CommunityScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs({ navigation, action }) {
  return (
    <Tab.Navigator style={styles.navigator} initialRouteName="Home">
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="home" color="grey" size={25} />,
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
        name="MyPage"
        options={{
          tabBarLabel: "MyPage",
          tabBarIcon: () => (
            <Ionicons name="ellipsis-horizontal" color="grey" size={25} />
          ),
        }}
      >
        {(props) => <MyPageScreen {...props} action={(x) => action(x)} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  navigator: {
    backgroundColor: "#000000",
  },
});
