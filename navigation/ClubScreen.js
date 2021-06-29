import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

let data = [];

const Item = ({ title }) => {
  return (
    <Pressable onPress={() => {}}>
      <View style={styles.item}>
        <Text style={{ margin: 10, fontSize: 20 }}>{title}</Text>
      </View>
    </Pressable>
  );
};
//임시 데이터들
for (let i = 0; i < 10000; i++) {
  let x = Math.ceil(Math.random() * 100);
  data.push({
    id: `${i}`,
    title: "동호회  " + i + "번 \n인원수 : " + x,
    members: x,
  });
}
export default function ClubScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="리스트" component={ClubListScreen} />
      <Tab.Screen name="내 동호회" component={MyClubScreen} />
    </Tab.Navigator>
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
    width: "100%",
    height: 80,
    marginVertical: 1,
  },
});

const ClubListScreen = () => {
  const [DATA, setDATA] = useState([]);
  const [page, setPage] = useState(0);

  const renderItem = ({ item }) => {
    return <Item title={item.title}></Item>;
  };

  const _getData = () => {
    let tem = [];
    for (let i = page * 20; i < (page + 1) * 20; i++) {
      tem.push(data[i]);
    }
    setDATA([...DATA, ...tem]);
    setPage(page + 1);
    console.log(DATA);
  };

  useEffect(() => _getData(), []);
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => _getData()}
      ></FlatList>
      <ActionButton></ActionButton>
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
