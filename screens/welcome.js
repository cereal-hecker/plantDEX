import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
      <Image 
      style={styles.translate}
      source={require("../assets/images/translate.png")}/>
    </View>
      <View style={styles.loginImage}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Image source={require("../assets/images/login.png")} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
          <View style={styles.line}></View>
            <Text style={styles.orText}>OR</Text>
          <View style={styles.line}></View>
        </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
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
    width: 135,
    height: 85,
    marginTop: 50,
  },
  translate: {
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
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: "2%",
  },
  line: {
    width: 50, 
    height: 1,
    backgroundColor: '#3F3D56',
    marginHorizontal: "2%",
  },  
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#3F3D56",
  },
});
