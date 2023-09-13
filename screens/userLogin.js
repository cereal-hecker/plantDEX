import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

export default function UserLogin({
  handleLogin,
  phoneNumber,
  setPhoneNumber,
  navigation,
}) {
  const [isFocusedPhoneNumber, setIsFocusedPhoneNumber] = useState(false);

  const handlePhoneNumberFocus = () => {
    setIsFocusedPhoneNumber(true);
  };

  const handlePhoneNumberBlur = () => {
    setIsFocusedPhoneNumber(false);
  };

  const handlePhoneNumberInputPress = () => {
    if (!isFocusedPhoneNumber) {
      handlePhoneNumberFocus();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePhoneNumberInputPress}>
        <View style={styles.inputField}>
          <View
            style={[
              styles.labelContainer,
              {
                top:
                  isFocusedPhoneNumber ||
                  (phoneNumber && phoneNumber.length > 0)
                    ? -8
                    : "50%",
                transform: [
                  {
                    translateY:
                      isFocusedPhoneNumber ||
                      (phoneNumber && phoneNumber.length > 0)
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
                  color: isFocusedPhoneNumber ? "#049A10" : "#049A1050",
                  fontSize:
                    isFocusedPhoneNumber || (phoneNumber && phoneNumber.length > 0)
                      ? 14
                      : 16,
                },
              ]}
            >
              Phone Number
            </Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            onFocus={handlePhoneNumberFocus}
            onBlur={handlePhoneNumberBlur}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
      </TouchableWithoutFeedback>
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
});
