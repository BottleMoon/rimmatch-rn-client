import React from "react";
import { Pressable } from "react-native";
import { Button } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import {} from "react-native";

export default function MatchApply({ route }) {
  return (
    <View style={styles.container}>
      <Text>{route.params.data.title}</Text>
      <Text>지역 : {route.params.data.place}</Text>
      <Pressable
        style={styles.button}
        onPress={() => alert("매칭을 신청합니다.")}
      >
        <Text style={{ fontSize: 20, color: "white" }}>신청</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "5%",
    backgroundColor: "skyblue",
    borderRadius: 10,
    top: "30%",
  },
});
