import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabs from "./navigation/MainTabs";
import MatchApply from "./matching/MatchApply";
import { Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatchMakingScreen from "./matching/MatchMakingScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from "./profile/ProfileScreen";
import ClubCreateScreen from "./club/ClubCreateScreen";

const Stack = createStackNavigator();
const Icons = Ionicons;

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  return routeName;
}

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [logined, setLogined] = useState(false);
  const [id, setId] = useState();
  useEffect(() => {
    AsyncStorage.getItem("user_id")
      .then((value) => (value === null ? setLogined(false) : setLogined(true)))
      .then(() =>
        setTimeout(() => {
          setIsAppReady(() => !isAppReady);
        }, 3000)
      );
  }, []);

  if (!isAppReady)
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={require("./assets/AppBackGround2.jpeg")}
        />
      </View>
    );
  return logined ? (
    <NavigationContainer styles={styles.navigator}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
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
        >
          {(props) => <MainTabs {...props} action={(x) => setLogined(x)} />}
        </Stack.Screen>
        <Stack.Screen name="MatchApply" component={MatchApply} />
        <Stack.Screen name="CreateMatch" component={MatchMakingScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreateClub" component={ClubCreateScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer style={styles.navigator}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <LoginScreen {...props} action={(x) => setLogined(x)} />}
        </Stack.Screen>

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
