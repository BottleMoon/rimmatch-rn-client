import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function SignUp({ action }) {
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
      <Button title="회원가입" onPress={() => action(true)} />
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
