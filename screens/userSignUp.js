import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView, Dimensions  } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState,useRef } from "react";
import {auth, firebaseConfig} from "./firebase"
import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import {PhoneAuthProvider,signInWithCredential} from 'firebase/auth';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const showRecaptchaBanner = false;

export default function UserSignup({
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
})
{
  const [dName, setDname] = useState("Anon");
  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal 
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
      />

      {
          info && <Text style={styles.text}>{info}</Text>
      }

      {!verificationId && (
        <View>
          <View style={styles.inputField}>
            <Text style={styles.inputHeader}>Display Name</Text>
            <TextInput value={dName} onChangeText={text => setDname(text)} autoCapitalize="none" />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputHeader}>Phone number</Text>
            <TextInput value={phone} onChangeText={text => setPhone(text)} autoCapitalize="none" />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputHeader}>Re-enter Phone Number</Text>
            <TextInput value={rephone} onChangeText={text => setRephone(text)} autoCapitalize="none" />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {
            if (phone === rephone) {
              handleSendVerificationCode();
            } else {
              alert("Phone numbers don't match.");
            }
            console.log("Called");
          }}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}

      {verificationId && (
        <View>
        <View>
          <TextInput placeholder="Verification Code" value = {verificationCode} onChangeText = {text => setVerificationCode(text)} autoCapitalize = 'none'/>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleVerifyVerificationCode()}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        </View>
        )
      }
        
      {attemptInvisibleVerification && showRecaptchaBanner && <FirebaseRecaptchaBanner/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
  }
  });
  