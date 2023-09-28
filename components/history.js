import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import HistoryCard from "./historyCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, firebaseConfig, db } from "./firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

export default function History({ navigation }) {
  const isLoading = false;
  const error = false;
  const nav = useNavigation();
  const [hydrate, setHydrate] = useState([1, 2, 3]);
  const [isFocused, setIsFocused] = useState(false);

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
    const handleNavigationFocusChange = () => {
      setIsFocused(!isFocused);
    };
    handleGetHistory();
    nav.addListener("focus", handleNavigationFocusChange);
    return () => {
      nav.removeListener("focus", handleNavigationFocusChange);
    };
  }, [nav]);

  if (isFocused) handleGetHistory();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#312651" />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : hydrate.length === 0 ? (
        <Text>No History Available</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: "Poppins_900Black",
    fontSize: 48,
    paddingLeft: 10,
    color: "#049A10",
  },
});