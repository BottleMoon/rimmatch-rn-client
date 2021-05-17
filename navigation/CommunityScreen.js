import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import {} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Board = function ({ category, title }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          margin: 20,
          marginVertical: 10,
          top: 50,
          fontSize: 15,
          fontWeight: "bold",
        }}
      >
        {category}
      </Text>
      <Text style={{ margin: 10, marginVertical: 10, top: 50, fontSize: 15 }}>
        {title}
      </Text>
    </View>
  );
};

export default function CommunityScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ height: 1000, top: -30 }}
      >
        <View
          style={{
            width: "90%",
            height: 270,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            position: "absolute",
            top: 50,
            left: "5%",
          }}
        >
          <Text
            style={{
              position: "absolute",
              left: 30,
              top: 20,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            실시간 인기 글
          </Text>
          <Text
            style={{
              position: "absolute",
              right: 30,
              top: 25,
              fontSize: 15,
              color: "red",
            }}
          >
            더 보기 >
          </Text>
          <Board category={"정보게시판"} title={"제목"} />
          <Board category={"정보게시판"} title={"제목"} />
          <Board category={"정보게시판"} title={"제목"} />
          <Board category={"정보게시판"} title={"제목"} />
          <Board category={"정보게시판"} title={"제목"} />
          <Board category={"정보게시판"} title={"제목"} />
        </View>
        <View
          style={{
            width: "90%",
            height: 270,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            position: "absolute",
            top: 330,
            left: "5%",
          }}
        >
          <Text
            style={{
              position: "absolute",
              left: 30,
              top: 20,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            자유게시판
          </Text>
          <Text
            style={{
              position: "absolute",
              right: 30,
              top: 25,
              fontSize: 15,
              color: "red",
            }}
          >
            더 보기 >
          </Text>
          <Board category={"자유게시판"} title={"제목"} />
          <Board category={"자유게시판"} title={"제목"} />
          <Board category={"자유게시판"} title={"제목"} />
          <Board category={"자유게시판"} title={"제목"} />
          <Board category={"자유게시판"} title={"제목"} />
          <Board category={"자유게시판"} title={"제목"} />
        </View>
        <View
          style={{
            width: "90%",
            height: 270,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            position: "absolute",
            top: 610,
            left: "5%",
          }}
        >
          <Text
            style={{
              position: "absolute",
              left: 30,
              top: 20,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            농구용품게시판
          </Text>
          <Text
            style={{
              position: "absolute",
              right: 30,
              top: 25,
              fontSize: 15,
              color: "red",
            }}
          >
            더 보기 >
          </Text>
          <Board category={"농구용품게시판"} title={"제목"} />
          <Board category={"농구용품게시판"} title={"제목"} />
          <Board category={"농구용품게시판"} title={"제목"} />
          <Board category={"농구용품게시판"} title={"제목"} />
          <Board category={"농구용품게시판"} title={"제목"} />
          <Board category={"농구용품게시판"} title={"제목"} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
