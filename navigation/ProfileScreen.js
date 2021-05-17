import React from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const PressableMenu = ({ i }) => {
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
    >
      <Ionicons name="location-outline" size={30} />
      <Text style={styles.menu}>메뉴 {i}</Text>
    </Pressable>
  );
};
export default function ProfileScreen() {
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
          <Text style={{ fontSize: 20 }}>{"회원 1\n sdf"}</Text>
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
        <PressableMenu />
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
