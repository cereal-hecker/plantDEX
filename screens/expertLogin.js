import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

export default function ExpertLogin({
  handleLogin,
  email,
  setEmail,
  pass,
  setPass,
  navigation,
}) {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  //const [password, setPassword] = useState("");

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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleEmailInputPress}>
        <View style={styles.inputField}>
          <View
            style={[
              styles.labelContainer,
              {
                top: isFocusedEmail || (email && email.length > 0) ? -8 : "50%",
                transform: [
                  {
                    translateY: isFocusedEmail || (email && email.length > 0)
                      ? 0
                      : -10,
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
                  fontSize: isFocusedEmail || (email && email.length > 0)
                    ? 14
                    : 16,
                },
              ]}
            >
              Email/Phone number
            </Text>
          </View>
          <TextInput
            style={styles.input}
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
                top: isFocusedPassword || (pass && pass.length > 0)
                  ? -8
                  : "50%",
                transform: [
                  {
                    translateY: isFocusedPassword || (pass && pass.length > 0)
                      ? 0
                      : -10,
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
                  fontSize: isFocusedPassword || (pass && pass.length > 0)
                    ? 14
                    : 16,
                },
              ]}
            >
              Password
            </Text>
          </View>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            value={pass}
            onChangeText={(text) => setPass(text)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    width: "100%",
    height: 75,
    borderColor: "#049A10",
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    position: "relative",
  },
  input: {
    height: "100%",
    fontSize: 20,
    color: "#3f4146",
  },
  button: {
    backgroundColor: "#049A10",
    padding: 10,
    borderRadius: 20,
    width: 240,
    height: 50,
    alignItems: "center",
    marginTop: "2%",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
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

  googleText: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
});
