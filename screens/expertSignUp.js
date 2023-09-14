import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

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
    width: "80%",
    height: 75,
    borderColor: "#049A10",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  inputHeader: {
    color: "#049A10",
    paddingTop: 10,
  },
  textInput: {
    flex: 1,
    height: "100%",
    textAlignVertical: "center", // Vertically center the text
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
    color: "white",
    fontSize: 20,
  },
});
