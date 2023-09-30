import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState, useRef } from "react";
import { auth, firebaseConfig } from "./firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import AnimatedTextInput from "../components/animatedTextInput";

import './translations';
import {DynamicTranslator} from './translations';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';

export default function UserLogin({
  recaptchaVerifier,
  phone,
  setPhone,
  verificationId,
  setVerificationCode,
  attemptInvisibleVerification,
  info,
  handleSendVerificationCode,
  handleVerifyVerificationCode,
}) {

  const { t } = useTranslation();
  const [PhoneNum, setPhoneNum] = useState("Phone number");

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
            placeholder={t("Phone number")}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSendVerificationCode();
                console.log("Called");
              }}
            >
              <Text style={styles.buttonText}>{t("Log In")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {verificationId && (
        <View style={styles.centeredContainer}>
          <View style={styles.inputContainer}>
            <OTPInputView
              style={styles.otpInput}
              pinCount={6}
              autoFocusOnLoad
              selectionColor={"transparent"}
              codeInputFieldStyle={styles.otpInputField}
              codeInputHighlightStyle={styles.otpInputHighlight}
              onCodeFilled={(code) => {
                setVerificationCode(code);
              }}
            />
            <View style={styles.resendContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.blackText}>
                  Haven't received the confirmation code yet?{" "}
                </Text>
                <Text style={styles.greenText}>Resend</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleVerifyVerificationCode();
              }}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {attemptInvisibleVerification && showRecaptchaBanner && (
        <FirebaseRecaptchaBanner />
      )}
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
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#049A10",
    padding: 10,
    borderRadius: 20,
    width: 240,
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
  inputContainer: {
    width: "100%",
    paddingHorizontal: "3%",
    alignItems: "center",
  },
  otpInput: {
    width: "100%",
    height: 100,
    paddingHorizontal: "5%",
  },
  otpInputField: {
    color: "#049A10",
    backgroundColor: "#049A1050",
    borderRadius: 10,
    fontSize: 24,
    height: "60%",
    width: 60,
  },
});
