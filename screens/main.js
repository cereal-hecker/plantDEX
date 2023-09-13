import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

export default function Main({ navigation }) {
  return (
    <View styles={styles.con}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../assets/images/logo.png")}
        />
        <Image
          style={styles.acc}
          source={require("../assets/images/account.png")}
        />
      </View>
      <View style={styles.centerCon}>
        <Image
          style={styles.weather}
          source={require("../assets/images/weather.png")}
        />
        <Image
          style={styles.banner}
          source={require("../assets/images/banner.png")}
        />
        <Text style={styles.capture}>Start capturing</Text>
        <Image
          style={styles.cam}
          source={require("../assets/images/camera.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingRight: 15,
    paddingLeft: 15,
  },
  acc: {
    width: 50,
    height: 50,
  },
  image: {
    width: 68,
    height: 40.5,
  },
  centerCon: {
    alignItems: "center",
    justifyContent: "center",
  },
  weather: {
    marginTop: 40,
  },
  banner: {
    marginTop: 20,
  },
  capture: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 32,
    marginTop: 80
  },
  cam: {
    marginTop: 20
  },
});
