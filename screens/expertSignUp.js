import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ExpertSignup({
  handleSignup,
  email,
  setEmail,
  pass,
  setPass,
  repass,
  setRepass,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputField}>
        <Text style={styles.inputHeader}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputHeader}>Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          value={pass}
          onChangeText={(text) => setPass(text)}
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputHeader}>Re-enter Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          value={repass}
          onChangeText={(text) => setRepass(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  inputField: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.8,
    borderColor: '#049A10',
    borderWidth: windowWidth * 0.003,
    borderRadius: windowHeight * 0.04,
    paddingHorizontal: windowWidth * 0.04,
    paddingTop: windowHeight * 0.01,  
    marginBottom: windowHeight * 0.02,
    fontSize: windowHeight * 0.025,
    fontFamily: 'Poppins_400Regular',
  },
  inputHeader: {
    color: "#049A10",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center", 
    backgroundColor: "#049A10",
    borderRadius: windowHeight * 0.05,
    width: windowWidth * 0.6,
    height: windowHeight * 0.065,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: windowHeight * 0.025,
  },
});
