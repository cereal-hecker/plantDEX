import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated, // Import Animated
} from 'react-native';
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import React, { useState, useRef } from "react";
import { auth, firebaseConfig } from "./firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import AnimatedTextInput from '../components/animatedTextInput';

export default function UserLogin({
  recaptchaVerifier,
  phone,
  setPhone,
  rephone,
  setRephone,
  verificationId,
  setVerificationID,
  verificationCode,
  setVerificationCode,
  attemptInvisibleVerification,
  info,
  setInfo,
  handleSendVerificationCode,
  handleVerifyVerificationCode,
}) {
  const showRecaptchaBanner = false;
  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />

      {info && <Text style={styles.text}>{info}</Text>}

      {!verificationId && (
          <View>
            <AnimatedTextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Phone number"
          />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSendVerificationCode();
                console.log("Called");
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
      )}

      {verificationId && (
        <View>
          <View>
            <TextInput
              placeholder="Verification Code"
              value={verificationCode}
              onChangeText={(text) => setVerificationCode(text)}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleVerifyVerificationCode()}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      )}
      {attemptInvisibleVerification && showRecaptchaBanner && <FirebaseRecaptchaBanner/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 36,
    color: "#049A10",
    fontFamily: "Poppins_600SemiBold",
  },
  button: {
    backgroundColor: "#049A10",
    padding: 10,
    borderRadius: 20,
    width: 150,
    height: 50,
    alignItems: "center",
    textAlign: "center",
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
  inputField: {
    width: 300,
    height: 75,
    borderColor: "#049A10",
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: "100%",
    fontSize: 20,
    color: "#3f4146",
  },
});
