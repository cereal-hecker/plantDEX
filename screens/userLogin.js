import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function UserLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleEmailFocus = () => {
    setIsFocusedEmail(true);
  };

  const handleEmailBlur = () => {
    setIsFocusedEmail(false);
  };

  const handlePasswordFocus = () => {
    setIsFocusedPassword(true);
  };

  const handlePasswordBlur = () => {
    setIsFocusedPassword(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.heading}>Login</Text>
          <Image 
            style={styles.logoImage}
            source={require("../assets/images/translate.png")} />
        </View>
      </View>
      <View style={styles.inputField}>
        <TextInput
          keyboardType='email-address'
          autoCapitalize='none'
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          secureTextEntry={true}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPasswordText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.spacingContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate()}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.line}></View>
            <Text style={styles.orText}>OR</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.googleContainer}>
          <Image
            style={styles.googleIcon}
            source={require("../assets/images/googleIcon.png")}
          />
          <View style={styles.googleTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate()}>
              <Text style={styles.googleText}>Log in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>  
      <View style={styles.dontHaveAccountContainer}>
        <Text style={styles.dontHaveAccountText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  header: {
    width: "100%",
    height: "45%",
    paddingTop: "4%",
    paddingHorizontal: "4%",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: 52,
    color: "#049A10",
    fontFamily: "Poppins_700Bold",
  },

  logoImage: {
    width: 30,
    height: 30,
  },

  forgotPasswordContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },

  forgotPasswordText: {
    color: '#587DBD',
    fontFamily: 'Poppins_600SemiBold',
  },

  spacingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 12,
  },

  button: {
    backgroundColor: "#049A10",
    padding: 10,
    borderRadius: 20,
    width: 240,
    height: 50,
    alignItems: "center",
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "4%",
    marginBottom: "4%",
  },
  
  line: {
    width: 50, // Adjust the width of the lines
    height: 1,
    backgroundColor: '#3F3D56',
    marginHorizontal: "2%", // Add some spacing between the lines and the text
  },
  
  
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#3F3D56",
  },

  googleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  googleTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  googleText: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },

  dontHaveAccountContainer: {
    marginTop: "4%",
    flexDirection: 'row',
    justifyContent: 'center',
  },

  dontHaveAccountText: {
    fontFamily: "Poppins_600SemiBold",
  },

  signUpText: {
    color: "#587DBD",
    fontFamily: "Poppins_700Bold",
  },

  inputField: {
    width: '80%',
    height: 90,
    borderColor: '#049A10',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  });
  