import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import {} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function WriteScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState(null);
  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function getDateToString(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    m = m > 9 ? m : "0" + m;
    d = d > 9 ? d : "0" + d;
    return y + "년 " + m + "월 " + d + "일";
  }

  AsyncStorage.getItem("USER_ID").then((value) => setId(value));
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          backgroundColor: "white",
          width: "90%",
          height: "5%",
          borderRadius: 10,
          borderColor: "grey",
          borderWidth: 1,
          fontSize: 20,
          paddingLeft: 10,
        }}
        placeholder={"제목"}
        onChangeText={(text) => {
          setTitle(text);
        }}
      ></TextInput>
      <RNPickerSelect
        style={pickerStyle}
        placeholder={{ label: "지역", value: null }}
        items={[
          { label: "부산", value: "부산" },
          { label: "대구", value: "대구" },
          { label: "서울", value: "서울" },
        ]}
        onValueChange={(value) => {
          setPlace(value);
        }}
      />
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          borderRadius: 10,
          borderWidth: 0.5,
          margin: 20,
          padding: 10,
          backgroundColor: "white",
        }}
        onPress={() => setModalVisible(true)}
      >
        {date === null ? (
          <Text>시간</Text>
        ) : (
          <Text>{getDateToString(date)}</Text>
        )}
      </Pressable>
      <Modal animationType="slideInUp" isVisible={modalVisible}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <DateTimePicker
            testID="dateTimePicker"
            style={{ width: "100%", height: "60%" }}
            mode="date"
            value={date === null ? new Date() : date}
            onChange={(event, _date) => {
              setDate(_date);
            }}
            display="spinner"
          />
          <Pressable
            style={styles.btn_modal}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text>선택</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          height: 40,
          backgroundColor: "skyblue",
          borderRadius: 10,
        }}
        onPress={() => {
          if (title === "") {
            alert("제목을 입력하셔야 합니다.");
          } else if (place === "") {
            alert("장소를 정하셔야 합니다.");
          } else {
            fetch(`http://localhost:3000/match/create`, {
              method: "post",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                title: title,
                place: place,
                admin: id,
                createdate: new Date(),
                matchdate: date === null ? new Date() : date,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                if (res.success) alert("매칭 등록 성공");
              });
            navigation.navigate("HOME");
          }
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>매칭 만들기</Text>
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
const pickerStyle = {
  inputIOS: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: 20,
    margin: 20,
    padding: 10,
    backgroundColor: "white",
  },
  btn_modal: {
    backgroundColor: "skyblue",
    padding: 10,
    marginHorizontal: 50,
    borderRadius: 10,
  },
};
