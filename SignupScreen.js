import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function SignUp({ navigation }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState();
  const [address, setAddress] = useState();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.login}
        placeholder="id input required"
        onChangeText={(text) => {
          setId(text);
          //ID check
          //   fetch("http://localhost:3000/idcheck", {
          //     method: "post",
          //     body: id,
          //   }).then((res) => {
          //     if (res) {
          //     }
          //   });
        }}
      ></TextInput>
      <TextInput
        style={styles.login}
        placeholder="password input required"
        onChangeText={(text) => {
          setPassword(text);
        }}
      ></TextInput>
      <TextInput
        style={styles.login}
        placeholder="age"
        onChangeText={(text) => {
          setAge(parseInt(text));
        }}
      ></TextInput>
      <TextInput
        style={styles.login}
        placeholder="height"
        onChangeText={(text) => {
          setHeight(text);
        }}
      ></TextInput>
      <TextInput
        style={styles.login}
        placeholder="address"
        onChangeText={(text) => {
          setAddress(text);
        }}
      ></TextInput>
      <Button
        title="회원가입"
        onPress={() => {
          if (id === "" || password === "") {
            alert("아이디와 비밀번호는 필수 입력입니다.");
          } else {
            fetch("http://localhost:3000/signup", {
              method: "post",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                id: id,
                password: password,
                age: age,
                height: height,
                address: address,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                if (res.success) {
                  alert("회원가입 성공");
                  navigation.navigate("Login");
                } else {
                  alert("이미 아이디가 존재합니다.");
                }
              });
          }
        }}
      />
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
