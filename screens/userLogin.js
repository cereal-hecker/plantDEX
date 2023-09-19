import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState,useRef } from "react";
import {auth, firebaseConfig} from "./firebase"
import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import {PhoneAuthProvider,signInWithCredential} from 'firebase/auth';

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
}){
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleInput1Focus = () => {
    setIsFocusedEmail(true);
  };

  const handleInput1Blur = () => {
    setIsFocusedEmail(false);
  };

  const handleInput2Focus = () => {
    setIsFocusedPassword(true);
  };

  const handleInput2Blur = () => {
    setIsFocusedPassword(false);
  };

    return (
      <View style={styles.container}>
          <View style={styles.inputField}>
        <Text style={{ color: isFocusedPassword ? "#049A10" : "#049A1050" }}>Phone number</Text>
        <TextInput
          style={{height: 50,fontSize: 20}}
          keyboardType='name-phone-pad'
          autoCapitalize='none'
          onFocus={handleInput1Focus}
          onBlur={handleInput1Blur}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputField}>
        <Text style={{ color: isFocusedPassword ? "#049A10" : "#049A1050" }}>Re enter phone number</Text>
        <TextInput
          style={{height: 50,fontSize: 20}}
          onFocus={handleInput2Focus}
          onBlur={handleInput2Blur}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
      </View>
    );*/

  return (
    <View style={styles.container}>
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
        <Text style={styles.inputHeader}>Phone number</Text>
          <TextInput value = {phone} onChangeText = {text => setPhone(text)} autoCapitalize = 'none'/>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
          handleSendVerificationCode()
          console.log("Called");
        }}>
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>
        )
      }

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
        
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner/>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    logo: {
      marginTop: 50,
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
      width: 150,
      height: 50,
      alignItems: "center",
      textAlign: 'center',
    },
    buttonText: {
      textAlign: "center",
      color: "white",
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
    inputField: {
      height: 75,
      width: 300,
      borderColor: '#049A10',
      borderWidth: 1,
      borderRadius: 30,
      paddingHorizontal: 15,
      paddingTop: 10,  
      marginBottom: 12,
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
    },
    inputHeader: {
      color: "#049A10",
    }
  });
  