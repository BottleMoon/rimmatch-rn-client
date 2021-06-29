import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import {} from "react-native";

export default function ProfileScreen({}) {
  const [isMounted, setIsMounted] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("USER_ID").then((id) =>
      fetch(`http://localhost:3000/user/find/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUser(res);
        })
    );
  }, []);
  useEffect(() => {
    if (user !== null) {
      setIsMounted(true);
    }
  }, [user]);

  return isMounted ? (
    <View>
      <Pressable
        style={{
          height: 70,
          width: 70,
          backgroundColor: "grey",
          borderRadius: "100%",
        }}
      ></Pressable>
      <Text>{user.id}</Text>
      <Text>나이 : {user.age}세</Text>
      <Text>키 : {user.height}cm</Text>
      <Text>지역 : {user.address}</Text>
    </View>
  ) : (
    <View>
      <Text>로딩중</Text>
    </View>
  );
}
