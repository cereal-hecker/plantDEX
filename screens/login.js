import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
      <Image 
      style={styles.logoImage}
      source={require("../assets/images/translate.png")}/>
    </View>
      <View style={styles.loginImage}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Image source={require("../assets/images/login.png")} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UploadImage')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.or}>—OR—</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    marginTop: 50,
    width: 136,
    height: 81,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  welcome: {
    fontSize: 36,
    color: "#049A10",
    fontFamily: "Poppins_600SemiBold",
  },
  or: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Poppins_700Bold",
  },
  button: {
    backgroundColor: "#049A10",
    padding: 10,
    borderRadius: 20,
    width: "70%",
    height: 50,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white", // Change sign up button text color to white
    fontSize: 20,
  },
  loginImage: {
    marginTop: 40,
    marginBottom: 70,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  }
});
