import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import HistoryCard from "./historyCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { auth, firebaseConfig, db } from "./firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

export default function History({ navigation }) {
  const isLoading = false;
  const error = false;
  const [hydrate, setHydrate] = useState([1, 2, 3]);

  const handleGetHistory = async () => {
    const first = query(
      collection(db, "history"),
      where("userID", "==", auth.currentUser.uid)
    );
    const documentSnapshots = await getDocs(first);
    var actual = [];
    documentSnapshots.docs.filter((item) => {
      var here = item.data();
      actual.push(here);
    });
    setHydrate(actual);
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  return (
    <View
      style={{
        paddingBottom: 420,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_900Black",
          fontSize: 48,
          paddingLeft: 10,
          color: "#049A10",
        }}
      >
        History
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={hydrate}
          renderItem={({ item }) => <HistoryCard item={item} />}
          keyExtractor={(item) => item?.job_id}
        />
      )}
    </View>
  );
}
