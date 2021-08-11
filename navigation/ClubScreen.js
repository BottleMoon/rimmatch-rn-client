import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import ActionButton from "react-native-action-button";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ClubCreateScreen from "../club/ClubCreateScreen";

const Tab = createMaterialTopTabNavigator();

export default function ClubScreen({}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="리스트" component={ClubListScreen} />
      <Tab.Screen name="내 동호회" component={MyClubScreen} />
    </Tab.Navigator>
  );
}

const ClubListScreen = ({ navigation }) => {
  const [DATA, setDATA] = useState([]);
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setPage(DATA.length);
    if (refreshing === true) {
      setRefreshing(false);
    }
  }, [DATA]);

  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.item} onPress={() => {}}>
        <Text style={{ margin: 10, fontSize: 20 }}>{item.clubname}</Text>
        <Text>방장 : {item.admin}</Text>
      </Pressable>
    );
  };

  const getData = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/club/list/")
      .then((res) => res.json())
      .then((res) => {
        if (res.length >= DATA.length + 20) {
          setDATA(DATA.concat(res.slice(page, res.length)));
          setIsEnd(true);
        } else {
          setDATA(DATA.concat(res.slice(page, page + 20)));
        }
      });
  };

  useEffect(() => getData(), []);

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true);
    fetch("http://localhost:3000/club/list/")
      .then((res) => res.json())
      .then((res) => {
        if (res.length < 20) {
          setDATA(res);
          setIsEnd(true);
        } else {
          setDATA(res.slice(0, 20));
        }
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.clubid}
        onEndReached={() => {
          if (!isEnd && !isLoading) {
            getData();
          }
        }}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
      ></FlatList>
      <ActionButton
        onPress={() => {
          navigation.navigate("CreateClub");
        }}
      ></ActionButton>
    </View>
  );
};

const MyClubScreen = () => {
  return (
    <View>
      <Text>내 동호회 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.1,
    marginVertical: 1,
    borderRadius: 10,
  },
});
