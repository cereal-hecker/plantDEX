import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

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

  const handleEmailInputPress = () => {
    if (!isFocusedEmail) {
      handleEmailFocus();
    }
  };

  const handlePasswordInputPress = () => {
    if (!isFocusedPassword) {
      handlePasswordFocus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.heading}>Login</Text>
          <Image
            style={styles.translate}
            source={require("../assets/images/translate.png")}
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={handleEmailInputPress}>
      <View style={styles.inputField}>
        <View
          style={[
            styles.labelContainer,
            {
              top: isFocusedEmail || email.length > 0 ? -8 : "50%",
              transform: [
                {
                  translateY: isFocusedEmail || email.length > 0 ? 0 : -10,
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: isFocusedEmail ? "#049A10" : "#049A1050",
                fontSize: isFocusedEmail || email.length > 0 ? 14 : 16,
              },
            ]}
          >
            Email/Phone number
          </Text>
        </View>
        <TextInput
          style={{ height: "100%", fontSize: 20, color: "#3f4146" }}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handlePasswordInputPress}>
      <View style={styles.inputField}>
        <View
          style={[
            styles.labelContainer,
            {
              top: isFocusedPassword || password.length > 0 ? -8 : "50%",
              transform: [
                {
                  translateY: isFocusedPassword || password.length > 0 ? 0 : -10,
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: isFocusedPassword ? "#049A10" : "#049A1050",
                fontSize: isFocusedPassword || password.length > 0 ? 14 : 16,
              },
            ]}
          >
            Password
          </Text>
        </View>
        <TextInput
          secureTextEntry={true}
          style={{ height: "100%", fontSize: 20, color: "#3f4146" }}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      </TouchableWithoutFeedback>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.spacingContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("MainApp", { screen: "History" })
          }
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.line}></View>
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate()}>
        <View style={styles.googleContainer}>
          <Image
            style={styles.googleIcon}
            source={require("../assets/images/googleIcon.png")}
          />
          <View style={styles.googleTextContainer}>
              <Text style={styles.googleText}>Log in with Google</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.dontHaveAccountContainer}>
        <Text style={styles.dontHaveAccountText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
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
    paddingTop: "8%",
    paddingHorizontal: "4%",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: 64,
    color: "#049A10",
    fontFamily: "Poppins_900Black",
  },

  translate: {
    width: 40,
    height: 40,
  },

  forgotPasswordContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },

  forgotPasswordText: {
    color: "#587DBD",
    fontFamily: "Poppins_600SemiBold",
  },

  spacingContainer: {
    flexDirection: "column",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4%",
    marginBottom: "4%",
  },

  line: {
    width: 50,
    height: 1,
    backgroundColor: "#3F3D56",
    marginHorizontal: "2%",
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#3F3D56",
  },

  googleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  googleTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },

  googleText: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },

  dontHaveAccountContainer: {
    marginTop: "4%",
    flexDirection: "row",
    justifyContent: "center",
  },

  dontHaveAccountText: {
    fontFamily: "Poppins_600SemiBold",
  },

  signUpText: {
    color: "#587DBD",
    fontFamily: "Poppins_700Bold",
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
    position: "relative",
  },

  labelContainer: {
    position: "absolute",
    top: -8,
    left: 15,
    zIndex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 10,
  },

  label: {
    fontSize: 14,
    color: "#049A1050",
    fontFamily: "Poppins_400Regular",
  },
});
