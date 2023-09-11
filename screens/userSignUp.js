import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState,useRef } from "react";
import {auth, firebaseConfig} from "./firebase"
import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import {PhoneAuthProvider,signInWithCredential} from 'firebase/auth';

export default function UserSignup({ onPress= () => {}}){
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

    
  const recaptchaVerifier = useRef(null);

  const [phone, setPhone] = useState('');  
  const [rephone, setRephone] = useState('');  

  const [verificationId,setVerificationID] = useState('');
  const [verificationCode,setVerificationCode] = useState('');
  const attemptInvisibleVerification = true;
  const [info,setInfo] = useState("");
  
  const handleSendVerificationCode = async () => {
    try{
        const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
        const verificationId = await phoneProvider.verifyPhoneNumber(
            `+91 ${phone}`,
            recaptchaVerifier.current
        ); // get the verification id
        setVerificationID(verificationId); // set the verification id
        setInfo('Success : Verification code has been sent to your phone'); // If Ok, show message.
    }catch(error){
        setInfo(`Error : ${error.message}`); // show the error
    }
  };

  const handleVerifyVerificationCode = async () => {
    try{
        const credential = PhoneAuthProvider.credential(verificationId,verificationCode); // get the credential
        await signInWithCredential(auth,credential); // verify the credential
        setInfo('Success: Phone authentication successful'); // if OK, set the message
        
        //Navigate to main window


    }catch(error){
        setInfo(`Error : ${error.message}`); // show the error.
    }
  }

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
        <View>
          <TextInput placeholder="Phone Number" value = {phone} onChangeText = {text => setPhone(text)} autoCapitalize = 'none'/>
        </View>
        <View>
          <TextInput placeholder="Re-enter Phone Number" value = {rephone} onChangeText = {text => setRephone(text)} autoCapitalize = 'none'/>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
          if(phone == rephone){
            handleSendVerificationCode()
          }else{
            alert("Phone numbers don't match.");
          }
          console.log("Called");
        }}>
        <Text style={styles.buttonText}>Sign up</Text>
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
      width: "70%",
      height: 50,
      alignItems: "center",
    },
    buttonText: {
      textAlign: "center",
      color: "white", // Change sign up button text color to white
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
      width: '80%',
      height: 75,
      borderColor: '#049A10',
      borderWidth: 1,
      borderRadius: 30,
      paddingHorizontal: 15,
      marginBottom: 12,
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
    },
    
  });
  