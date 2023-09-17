import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ExpertSignup from "./expertSignUp";
import UserSignup from "./userSignUp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useRef } from "react";
import { auth, firebaseConfig } from "./firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SignUp({ navigation }) {
  const [isUserActive, setUserActive] = useState(true);
  const [isExpertActive, setExpertActive] = useState(false);

  const [isExpert, setExpert] = useState(false);
  
  // for exper sign up
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const handleSignUp = () => {
    if (pass == repass) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCreds) => {
          const user = userCreds.user;
          console.log(user.email);

          navigation.navigate("MainApp", { screen: "History" });
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Passwords don't match.");
    }
  };
  // for user sign up

  const recaptchaVerifier = useRef(null);

  const [phone, setPhone] = useState("");
  const [rephone, setRephone] = useState("");

  const [verificationId, setVerificationID] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const attemptInvisibleVerification = true;
  const [info, setInfo] = useState("");

  const handleSendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91 ${phone}`,
        recaptchaVerifier.current
      ); // get the verification id
      setVerificationID(verificationId); // set the verification id
      setInfo("Success : Verification code has been sent to your phone"); // If Ok, show message.
    } catch (error) {
      setInfo(`Error : ${error.message}`); // show the error
    }
  };

  const handleVerifyVerificationCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      ); // get the credential
      await signInWithCredential(auth, credential); // verify the credential
      setInfo("Success: Phone authentication successful"); // if OK, set the message

      //Navigate to main window
      navigation.navigate("MainApp", { screen: "Main" });
    } catch (error) {
      setInfo(`Error : ${error.message}`); // show the error.
    }
  };

  const userSignupProps = {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Sign Up</Text>
        <Image 
        style={styles.translate}
        source={require("../assets/images/translate.png")} />
      </View>
      <View style={styles.signup}>
        <View style={styles.slider}>
          <TouchableOpacity
            style={[
              styles.button,
              isUserActive ? styles.activeButton : null,
              !isUserActive ? styles.inactiveButton : null,
            ]}
            onPress={() => {
              setExpert(false);
              setUserActive(true);
              setExpertActive(false);
            }}
          >
            <Text
              style={[
                styles.butt,
                isUserActive ? styles.activeButtonText : null,
                !isUserActive ? styles.inactiveButtonText : null,
              ]}
            >
              User
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              isExpertActive ? styles.activeButton : null,
              !isExpertActive ? styles.inactiveButton : null,
            ]}
            onPress={() => {
              setExpert(true);
              setUserActive(false);
              setExpertActive(true);
            }}
          >
            <Text
              style={[
                styles.butt,
                isExpertActive ? styles.activeButtonText : null,
                !isExpertActive ? styles.inactiveButtonText : null,
              ]}
            >
              Expert
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {isExpert ? (
            <ExpertSignup
              handleSignup={handleSignUp}
              email={email}
              setEmail={setEmail}
              pass={pass}
              setPass={setPass}
              repass={repass}
              setRepass={setRepass}
            />
          ) : (
            <UserSignup {...userSignupProps} />
          )}
        </View>
        
        <View style={styles.dontHaveAccountContainer}>
          <Text style={styles.dontHaveAccountText}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("UserSwitch")}>
            <Text style={styles.loginText}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth * 1,
    paddingHorizontal: windowWidth * 0.04,
    marginTop: windowHeight * 0.02,
  },
  heading: {
    fontSize: windowHeight * 0.07,
    color: "#049A10",
    fontFamily: "Poppins_900Black",
  },
  translate: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
  },
  signup: {
    top: windowHeight * 0.25,
  },
  slider: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#75C07C",
    height: windowHeight * 0.08,
    width: windowWidth * 0.825,
    borderRadius: windowWidth * 0.085,
    marginBottom: windowHeight * 0.05,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: windowWidth * 0.07,
    width: windowWidth * 0.4,
    height: windowHeight * 0.07,
  },
  loginTextText: {
    color: "#587DBD",
    fontFamily: "Poppins_700Bold",
  },
  butt: {
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center",
  },
  activeButton: {
    backgroundColor: "#049A10", 
  },
  activeButtonText: {
    color: "#FFFFFF",
  },
  inactiveButton: {
    backgroundColor: "#75C07C", 
  },
  inactiveButtonText: {
    color: "#FFFFFF",
  },
  loginText: {
    color: "#587DBD",
    fontFamily: "Poppins_700Bold",
  },
  dontHaveAccountContainer: {
    marginTop: windowHeight * 0.04,
    flexDirection: "row",
    justifyContent: "center",
  },
  dontHaveAccountText: {
    fontFamily: "Poppins_600SemiBold",
  },
});
