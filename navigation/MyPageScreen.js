import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert } from "react-native";
import { FlatList } from "react-native";
import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const PressableMenu = ({
  name = "메뉴",
  iconName = "location-outline",
  onPress = () => {},
}) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
    >
      <Ionicons name={iconName} size={30} />
      <Text style={styles.menu}>{name}</Text>
    </Pressable>
  );
};
export default function MyPageScreen({ navigation, action }) {
  const [id, setId] = useState("");

  AsyncStorage.getItem("USER_ID").then((value) => {
    setId(value);
  });

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Pressable
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            height: 70,
            width: 70,
            backgroundColor: "grey",
            borderRadius: "100%",
          }}
        ></Pressable>
        <Pressable
          style={{
            height: 70,
            width: "75%",
            position: "absolute",
            top: 20,
            right: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>{id}</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "white",
            height: 40,
            width: "90%",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "grey",
            position: "absolute",
            top: 100,
            left: "5%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text>프로필 보기</Text>
        </Pressable>
        <Pressable
          style={{
            position: "absolute",
            top: 150,
            left: 40,
            height: 70,
            width: 70,
            backgroundColor: "grey",
            borderRadius: "100%",
          }}
        ></Pressable>
        <Pressable
          style={{
            position: "absolute",
            top: 150,
            left: 180,
            height: 70,
            width: 70,
            backgroundColor: "grey",
            borderRadius: "100%",
          }}
        ></Pressable>
        <Pressable
          style={{
            position: "absolute",
            top: 150,
            right: 40,
            height: 70,
            width: 70,
            backgroundColor: "grey",
            borderRadius: "100%",
          }}
        ></Pressable>
      </View>
      <View style={styles.profile}>
        <PressableMenu />
        <PressableMenu />
        <PressableMenu />
        <PressableMenu />
      </View>
      <View style={styles.profile}>
        <PressableMenu />
        <PressableMenu />
        <PressableMenu />
        <PressableMenu
          name="로그아웃"
          iconName="log-out-outline"
          onPress={() => {
            AsyncStorage.removeItem("USER_ID");
            Alert.alert("정말 로그아웃 하시겠습니까?", "", [
              { text: "아니오", onPress: () => {}, styles: "cancel" },
              {
                text: "로그아웃",
                onPress: () => {
                  action(false);
                },
              },
            ]);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "33%",
    width: "100%",
    marginVertical: 3,
  },
  menu: {
    fontSize: 20,
    margin: 15,
  },
});
