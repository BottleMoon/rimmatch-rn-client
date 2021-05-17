import React, { useState } from "react";
import { Pressable } from "react-native";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function Login({ action }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.login}
        placeholder="id input required"
      ></TextInput>
      <TextInput
        style={styles.login}
        placeholder="password input required"
      ></TextInput>
      <Pressable
        style={{
          width: "90%",
          height: 40,
          backgroundColor: "skyblue",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
        }}
        onPress={() => action(true)}
      >
        <Text style={{ color: "white", fontSize: 20 }}>로그인</Text>
      </Pressable>
      <Text>
        아직 계정이 없으신가요?{" "}
        <Pressable>
          <Text style={{ color: "#0066cc", top: 1 }}>회원가입</Text>
        </Pressable>
      </Text>
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
  login: {
    backgroundColor: "#f1f1f5",
    width: 350,
    padding: 20,
    margin: 5,
  },
});
