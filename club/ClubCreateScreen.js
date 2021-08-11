import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function ClubCreateScreen({ navigation }) {
  const [clubName, setClubName] = useState("");
  const [numberOfMember, setNumberOfMember] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("USER_ID").then((value) => {
      setId(value);
    });
  }, []);

  const createclub = () => {
    console.log("in createclub!!!!");
    fetch("http://localhost:3000/club/create", {
      method: "post",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        clubname: clubName,
        numberofmember: numberOfMember,
        createdate: new Date(),
        admin: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res !== "success") {
          alert("에러..!");
        } else {
          alert(clubName + " 동호회를 만들었습니다.");
          navigation.navigate("Home");
        }
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          width: "90%",
          height: "5%",
          margin: 10,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          fontSize: 15,
        }}
        placeholder="동호회 이름"
        onChangeText={(value) => {
          setClubName(value);
          console.log(clubName);
        }}
      ></TextInput>
      <TextInput
        style={{
          width: "90%",
          height: "5%",
          margin: 10,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          fontSize: 15,
        }}
        placeholder="최대 인원수"
        onChangeText={(value) => {
          setNumberOfMember(value);
        }}
      ></TextInput>
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "skyblue",
          width: "90%",
          height: "5%",
          borderRadius: 10,
          borderWidth: 1,
          margin: 10,
        }}
        onPress={() => {
          createclub();
        }}
      >
        <Text style={{ fontSize: 20 }}>동호회 만들기</Text>
      </Pressable>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
