import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function Login({ navigation, action }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.login}
        placeholder="id input required"
        onChangeText={(text) => setId(text)}
      ></TextInput>
      <TextInput
        style={styles.login}
        placeholder="password input required"
        onChangeText={(text) => setPassword(text)}
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
        onPress={() => {
          if (id === "" || password === "") {
            alert("아이디와 비밀번호는 필수 입력사항입니다.");
          } else {
            fetch("http://localhost:3000/login", {
              method: "post",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                id: id,
                password: password,
              }),
            })
              .then((res) => {
                return res.text();
              })
              .then((data) => {
                console.log(data);
                if (data === "fail") {
                  alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
                } else {
                  AsyncStorage.setItem("LOGIN_TOKEN", data);
                  AsyncStorage.setItem("USER_ID", id);
                  alert("로그인 성공");

                  action(true);
                }
              });
          }
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>로그인</Text>
      </Pressable>
      <Text>
        아직 계정이 없으신가요?{" "}
        <Pressable onPress={() => navigation.navigate("회원가입")}>
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
