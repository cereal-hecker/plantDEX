import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
  import './translations';
  import { useTranslation } from "react-i18next";
  import i18n from 'i18next';
import TranslateButton from "../components/translatebutton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Login({navigation}) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        />
        <View style={styles.translateButtonContainer}>
          <TranslateButton />
        </View>
      </View>
      <View style={styles.loginImage}>
        <Text style={styles.welcome}>{t("Welcome!")}</Text>
        <Image source={require("../assets/images/login.png")} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UserSwitch")}
      >
        <Text style={styles.buttonText}>{t("Log In")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth * 1,
    paddingHorizontal: windowWidth * 0.05,
  },
  logo: {
    width: 135,
    height: 80,
    marginTop: windowHeight * 0.05,
  },
  translate: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
  },
  welcome: {
    fontSize: windowHeight * 0.05,
    color: "#049A10",
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    paddingBottom: windowHeight * 0.02,
  },
  loginImage: {
    marginVertical: windowHeight * 0.065,
  },
  translateButtonContainer: {
    position: 'absolute', // position the container absolutely
    top: windowHeight * 0.06, // Adjust the top and right values as needed
    right: windowWidth * 0.05, // to position the button at the top right of the screen
    zIndex: 2, // Ensure the translate button is above other elements
  },
  button: {
    backgroundColor: "#049A10",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: windowHeight * 0.05,
    width: windowWidth * 0.65,
    height: windowHeight * 0.065,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: windowHeight * 0.025,
  },
  or: {
    fontSize: windowHeight * 0.05,
    marginVertical: windowHeight * 0.02,
    fontFamily: "Poppins_700Bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: windowHeight * 0.01,
  },
  line: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.002,
    backgroundColor: "#3F3D56",
    marginHorizontal: windowWidth * 0.04,
  },
  orText: {
    fontSize: windowHeight * 0.02,
    fontFamily: "Poppins_700Bold",
    color: "#3F3D56",
  },
});
