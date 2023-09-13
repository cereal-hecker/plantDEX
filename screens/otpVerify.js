import OTPInputView from "@twotalltotems/react-native-otp-input";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";

export default function OtpVerify({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          <View style={styles.centeredContainer}>
            <Text style={styles.heading}>Confirm OTP code</Text>
            <Text style={styles.subText}>Enter 4-digit code sent via SMS to your mobile number</Text>
            <View style={styles.inputContainer}>
              <OTPInputView
                style={styles.otpInput}
                pinCount={4}
                autoFocusOnLoad
                selectionColor={'transparent'}
                codeInputFieldStyle={styles.otpInputField}
                codeInputHighlightStyle={styles.otpInputHighlight}
                onCodeFilled={(code) => {
                  console.log(`code is ${code}`);
                }}
              />
              <View style={styles.resendContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.blackText}>Haven't received the confirmation code yet? </Text>
                  <Text style={styles.greenText}>Resend</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => { /* Add your confirmation logic here */ }}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reenterContainer}>
              <Text style={styles.altText}>Wrong phone number?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                <Text style={styles.Text}>Re-enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  background: {
    flex: 1,
    padding: 36, 
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
  },
  heading: {
    fontSize: 54, 
    color: "#049A10",
    fontFamily: "Poppins_700Bold",
    marginVertical: '4%',
  },
  subText: {
    paddingHorizontal: '5%',
    fontSize: 18,
    color: "#16171880",
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: '3%', 
    alignItems: "center",
  },
  otpInput: {
    width: "100%",
    height: 100, 
    paddingHorizontal: '5%', 
  },
  otpInputField: {
    color: "#049A10",
    backgroundColor: "#049A1050",
    borderRadius: 10,
    fontSize: 24, 
    height: '60%',
    width: 60, 
  },
  resendContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '2%', 
    paddingBottom: '4%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  blackText: {
    color: 'black',
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
  },
  greenText: {
    color: '#049A10',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
  },
  button: {
    backgroundColor: "#049A10",
    padding: '1%',
    borderRadius: 20, 
    width: '70%',
    height: 50, 
    alignItems: "center",
    justifyContent: "center",
    marginTop: '2%', 
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20, 
  },
  reenterContainer: {
    paddingTop: '4%', 
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '2%', 
  },
  Text: {
    color: '#049A10',
    marginLeft: '1%', 
    fontFamily: 'Poppins_600SemiBold',
  },
  altText: {
    fontFamily: 'Poppins_500Medium',
  }
});