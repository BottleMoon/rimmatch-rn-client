import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Button } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import {} from "react-native";

export default function MatchApply({ route }) {
  const [isMounted, setIsMounted] = useState();
  const [matchInfo, setMatchInfo] = useState(null);

  //getMatchinfo when Mounted
  useEffect(() => {
    getMatchInfo();
  }, []);

  //re-render when getMatchInfo()
  useEffect(() => {
    console.log("reset");
    if (matchInfo !== null) {
      setIsMounted(true);
    }
  }, [matchInfo]);

  let id = "";
  AsyncStorage.getItem("USER_ID").then((value) => {
    id = value;
  });

  const getMatchInfo = () => {
    console.log(route.params.data._id);
    fetch(`http://localhost:3000/match/find/${route.params.data._id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("setMatchInfo", res.joinusers);
        setMatchInfo(res);
      });
  };

  if (isMounted) {
    const matchdate = new Date(matchInfo.matchdate);
    console.log(matchInfo.matchdate);
    function getDateToString(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();

      m = m > 9 ? m : "0" + m;
      d = d > 9 ? d : "0" + d;
      return y + "년 " + m + "월 " + d + "일";
    }

    //매칭 신청
    const matchApply = () => {
      fetch(`http://localhost:3000/match/apply`, {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          matchid: route.params.data._id,
          userid: id,
        }),
      }).then((res) => {
        getMatchInfo();
      });
      alert("매칭을 신청합니다.");
    };

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>제목 : {route.params.data.title}</Text>
        <Text>지역 : {route.params.data.place}</Text>
        <Text>신청 인원 :{matchInfo.joinusers.map((x) => x + "님 ")}</Text>
        <Text>경기 날짜 : {getDateToString(matchdate)}</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (matchInfo.joinusers.find((x) => x === id) === undefined) {
              matchApply();
            } else {
              alert("이미 입장하신 방입니다.");
            }
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>신청</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
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
