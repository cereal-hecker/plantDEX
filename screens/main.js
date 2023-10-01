import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { auth, firebaseConfig, db } from "./firebase";
import { signOut } from "firebase/auth";
import History from "../components/history";
import WeatherCard from "../components/weatherCard";
import ProfileOverlay from "../components/profileOverlay";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Main({ navigation }) {


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../assets/images/logo.png")}
        />
        <ProfileOverlay navigation={navigation}/>
      </View>
      <View style={styles.centerCon}>
        <WeatherCard />
      </View>
      <View style={styles.historyContainer}>
        <History />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: windowHeight * 0.05,
    paddingRight: windowWidth * 0.04,
    paddingLeft: windowWidth * 0.04,
  },
  image: {
    width: 68,
    height: 40.5,
  },
  historyContainer: {
    flex: 1,
  },
  centerCon: {
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    marginTop: windowHeight * 0.02,
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
  },
});
