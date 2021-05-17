import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import ActionButton from "react-native-action-button";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";

let data = [];
let place = ["서울", "부산", "대구"];
//임시 데이터들
for (let i = 0; i < 10000; i++) {
  data.push({
    id: `${i}`,
    title: "매칭 중, 모집 번호는  " + i + "번",
    place: place[Math.floor(Math.random() * 3)],
  });
}

export default function HomeScreen({ navigation }) {
  const [page, setPage] = useState(0);
  const [DATA, setDATA] = useState([]);
  const [place, setPlace] = useState();

  useEffect(() => _getData(), []);
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("매칭 신청", { data: item })}
      >
        <View style={styles.item}>
          <Text style={{ position: "absolute", top: 10, left: 10 }}>
            {item.place}
          </Text>
          <Text>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  //DATA에 리스트 채움
  const _getData = (value) => {
    if (place == value) {
      if (value == null) {
        let tem = [];
        for (let i = page * 20; i < (page + 1) * 20; i++) {
          tem.push(data[i]);
        }
        setDATA([...DATA, ...tem]);
        setPage(page + 1);
      } else {
        let tem = [];
        let count = 0;
        let i = parseInt(DATA[DATA.length - 1].id) + 1;

        while (true) {
          if (data[i].place == value) {
            tem.push(data[i]);
            count++;
          }
          if (count == 20) break;
          i++;
        }
        setDATA([...DATA, ...tem]);
      }
    } else {
      setPlace(value);
      setPage(0);
      if (value == null) {
        let tem = [];
        for (let i = page * 20; i < (page + 1) * 20; i++) {
          tem.push(data[i]);
        }
        setDATA([...tem]);
        setPage(page + 1);
      } else {
        //지역 선택 됐을 때
        let tem = [];
        let count = 0;
        let i = 0;

        while (true) {
          if (data[i].place == value) {
            tem.push(data[i]);
            count++;
          }
          if (count == 20) break;
          i++;
        }
        setDATA([...tem]);
      }
    }
  };

  const angleIcon = <FontAwesome name="angle-down" style={{ left: 10 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={(value) => {
            _getData(value);
          }}
          placeholder={{ label: "지역", value: null }}
          items={[
            { label: "서울", value: "서울" },
            { label: "부산", value: "부산" },
            { label: "대구", value: "대구" },
          ]}
          Icon={() => {
            return <FontAwesome name="angle-down" style={styles.icon} />;
          }}
        />
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={(value) => console.log(value)}
          placeholder={{ label: "시간", value: null }}
          items={[
            { label: "Football", value: "football" },
            { label: "Baseball", value: "baseball" },
            { label: "Hockey", value: "hockey" },
          ]}
          Icon={() => {
            return <FontAwesome name="angle-down" style={styles.icon} />;
          }}
        />
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={(value) => console.log(value)}
          placeholder={{ label: "포지션" }}
          items={[
            { label: "Football", value: "football" },
            { label: "Baseball", value: "baseball" },
            { label: "Hockey", value: "hockey" },
          ]}
          Icon={() => {
            return <FontAwesome name="angle-down" style={styles.icon} />;
          }}
        />
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => _getData(place)}
      />
      <ActionButton
        buttonColor="skyblue"
        onPress={() => navigation.navigate("글 작성")}
      ></ActionButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    paddingHorizontal: 100,
    paddingVertical: 20,
    margin: 10,
    borderRadius: 10,
  },
  icon: {
    top: 19,
    right: 20,
  },
});
const pickerStyle = {
  inputIOS: {
    height: 30,
    width: 103,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 11,
    marginBottom: 3,
    paddingLeft: 10,
  },
};
