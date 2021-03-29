import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
let data = [];

//임시 데이터들
for (let i = 0; i < 100; i++) {
  data.push({ id: i, title: "매칭 중, 모집 번호는  " + i + "번" });
}

//데이터 뷰
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text>{title}</Text>
  </View>
);

export default function HomeScreen() {
  const [DATA, setDATA] = useState(data);
  const [page, setPage] = useState(1);

  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // onEndReached={}
      />
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
