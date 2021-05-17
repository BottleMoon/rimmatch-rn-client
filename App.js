import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabs from "./navigation/MainTabs";
import Login from "./Login";
import MatchApply from "./matching/MatchApply";
import { Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import WriteScreen from "./matching/WriteScreen";
import SignUp from "./SignUp";
const Stack = createStackNavigator();
const Icons = Ionicons;

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  return routeName;
}
export default function App() {
  const [logined, setLogined] = useState(false);

  return logined ? (
    <NavigationContainer styles={styles.navigator}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <Pressable
                onPress={() => alert("Right menu")}
                style={{ paddingHorizontal: 15 }}
              >
                <Icons name="settings-outline" color="grey" size={35}></Icons>
              </Pressable>
            ),
            headerLeft: () => (
              <Pressable
                onPress={() => alert("Left menu")}
                style={{ paddingHorizontal: 15 }}
              >
                <Icons name="menu" color="grey" size={40}></Icons>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="매칭 신청" component={MatchApply} />
        <Stack.Screen name="글 작성" component={WriteScreen} />
        <Stack.Screen name="회원가입" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <Login action={setLogined} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navigator: {
    backgroundColor: "#ffffff",
  },
});
