import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import ActionButton from "react-native-action-button";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();

function getDateToString(date, isFetch) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  m = m > 9 ? m : "0" + m;
  d = d > 9 ? d : "0" + d;
  if (isFetch) {
    console.log("y= " + y + " m= " + m + " d= " + d);
    console.log("" + y + m + d);
    return "" + y + m + d;
  } else {
    return y + "년 " + m + "월 " + d + "일";
  }
}

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="리스트" component={MatchListScreen} />
      <Tab.Screen name="내 매치" component={MyMatchScreen} />
    </Tab.Navigator>
  );
}

function MyMatchScreen({ navigation }) {
  const [id, setId] = useState("");
  const [page, setPage] = useState(0);
  const [DATA, setDATA] = useState([]);
  const [loading, setLoding] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("USER_ID").then((userid) => setId(userid));
  }, []);
  useEffect(() => {
    if (id !== "") {
      getData();
    }
  }, [id]);

  useEffect(() => {
    setPage(DATA.length);
    setLoding(false);
    if (refreshing === true) {
      setRefreshing(false);
    }
  }, [DATA]);

  const getData = () => {
    console.log(id);
    setLoding(true);
    fetch("http://localhost:3000/match/list/all/all/" + id)
      .then((res) => res.json())
      .then((res) => {
        if (res.length <= DATA.length + 20) {
          setDATA(DATA.concat(res.slice(page, res.length)));
          setIsEnd(true);
        } else {
          setDATA(DATA.concat(res.slice(page, page + 20)));
        }
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    setLoding(true);
    fetch("http://localhost:3000/match/list/all/all/" + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.length <= 20) {
          //데이터가 끝일 때
          setDATA(res.slice(0, res.length));
          setIsEnd(true);
        } else {
          setDATA(res.slice(0, 20));
        }
      });
  };

  const onEndReached = () => {
    if (loading) {
      return;
    } else getData();
  };

  const renderItem = ({ item }) => {
    const date = new Date(
      item.matchdate.substr(0, 4),
      item.matchdate.substr(5, 2) - 1,
      item.matchdate.substr(8, 2)
    );

    return (
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("MatchApply", { data: item })}
      >
        <Text style={{ position: "absolute", top: 10, left: 10 }}>
          {item.place}
        </Text>
        <Text style={{ fontSize: 20 }}>{item.title}</Text>
        <Text>{getDateToString(date, false)}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReached={() => {
          if (!isEnd) {
            onEndReached();
          }
          console.log("onReached");
        }}
        onRefresh={() => {
          onRefresh();
        }}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
}

function MatchListScreen({ navigation, route }) {
  const [page, setPage] = useState(0);
  const [DATA, setDATA] = useState([]);
  const [place, setPlace] = useState("all");
  const [date, setDate] = useState(null);
  const [loading, setLoding] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    onRefresh();
  }, [place]);

  useEffect(() => {
    onRefresh();
  }, [date]);

  useEffect(() => {
    setPage(DATA.length);
    setLoding(false);
    if (refreshing === true) {
      setRefreshing(false);
    }
  }, [DATA]);

  const renderItem = ({ item }) => {
    const date = new Date(
      item.matchdate.substr(0, 4),
      item.matchdate.substr(5, 2) - 1,
      item.matchdate.substr(8, 2)
    );

    return (
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("MatchApply", { data: item })}
      >
        <Text style={{ position: "absolute", top: 10, left: 10 }}>
          {item.place}
        </Text>
        <Text style={{ fontSize: 20 }}>{item.title}</Text>
        <Text>{getDateToString(date, false)}</Text>
      </Pressable>
    );
  };

  const getData = () => {
    setLoding(true);
    fetch(
      `http://localhost:3000/match/list/${place}/${
        date === null ? "all" : getDateToString(date, true)
      }/all`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.length <= DATA.length + 20) {
          setDATA(DATA.concat(res.slice(page, res.length)));
          setIsEnd(true);
        } else {
          setDATA(DATA.concat(res.slice(page, page + 20)));
        }
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLoding(true);
    fetch(
      `http://localhost:3000/match/list/${place}/${
        date === null ? "all" : getDateToString(date, true)
      }/all`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.length <= 20) {
          //데이터가 끝일 때
          setDATA(res.slice(0, res.length));
          setIsEnd(true);
        } else {
          setDATA(res.slice(0, 20));
        }
      });
  };

  const angleIcon = <FontAwesome name="angle-down" style={{ left: 10 }} />;

  return (
    <SafeAreaView style={styles.container}>
      {
        <View style={{ flexDirection: "row" }}>
          <RNPickerSelect
            style={pickerStyle}
            onValueChange={(value) => {
              setPlace(value);
            }}
            placeholder={{ label: "전국", value: "all" }}
            items={[
              { label: "서울", value: "서울" },
              { label: "부산", value: "부산" },
              { label: "대구", value: "대구" },
            ]}
            Icon={() => {
              return <FontAwesome name="angle-down" style={styles.icon} />;
            }}
          />
          <Pressable
            style={{
              justifyContent: "center",
              height: 30,
              width: Dimensions.get("window").width * 0.4,
              borderRadius: 10,
              backgroundColor: "white",
              margin: 11,
              marginBottom: 3,
              paddingLeft: 10,
            }}
            onPress={() => setModalVisible(true)}
          >
            {date === null ? (
              <Text>시간</Text>
            ) : (
              <Text>{getDateToString(date, false)}</Text>
            )}
          </Pressable>
          <Modal
            style={{ alignItems: "center" }}
            animationIn="slideInUp"
            isVisible={modalVisible}
          >
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
                onChange={(event, date) => {
                  setDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    )
                  );
                }}
                display="spinner"
              />
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={styles.btn_modal}
                  onPress={() => {
                    setDate(null);
                    setModalVisible(false);
                  }}
                >
                  <Text>전체</Text>
                </Pressable>

                <Pressable
                  style={styles.btn_modal}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text>선택</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      }
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReached={() => {
          if (!isEnd && !loading) {
            getData();
          }
          console.log("onReached");
        }}
        onRefresh={() => {
          onRefresh();
        }}
        refreshing={refreshing}
      />
      <ActionButton
        buttonColor="skyblue"
        onPress={() => navigation.navigate("CreateMatch")}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.1,
  },
  icon: {
    top: 19,
    right: 20,
  },
  flatlist: { width: "100%", height: "100%" },
  btn_modal: {
    backgroundColor: "skyblue",
    padding: 10,
    marginHorizontal: 50,
    borderRadius: 10,
  },
});
const pickerStyle = {
  inputIOS: {
    height: 30,
    width: Dimensions.get("window").width * 0.4,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 11,
    marginBottom: 3,
    paddingLeft: 10,
  },
};
