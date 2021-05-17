import React from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";
import {} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function WriteScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "5%",
          borderRadius: 10,
          borderColor: "grey",
          borderWidth: 1,
          position: "absolute",
          top: 10,
        }}
        placeholder={"제목"}
      ></TextInput>
      <TextInput
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "70%",
          top: -50,
          borderRadius: 10,
          borderColor: "grey",
          borderWidth: 1,
          margin: 10,
        }}
        placeholder={"내용"}
      ></TextInput>
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          height: 30,
          backgroundColor: "skyblue",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>작성</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
});
