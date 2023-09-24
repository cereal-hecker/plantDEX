import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useRef, useEffect } from "react";
import { auth } from "./firebase"
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import UserLogin from "./userLogin";
import ExpertLogin from "./expertLogin";

export default function UserSwitch({ navigation }) {
  const [isUserActive, setUserActive] = useState(true);
  const [isExpertActive, setExpertActive] = useState(false);
  const [isExpert, setExpert] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const handleLogin = () => {
    if (email == "admin" && pass == "admin")
      navigation.navigate("MainApp", { screen: "History" });
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCreds) => {
        const user = userCreds.user;
        console.log(user.email);

        navigation.navigate("MainApp", { screen: "History" });
      })
      .catch((error) => alert(error.message));
  };

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

  const userLoginProps = {
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

  const animation = useRef(new Animated.Value(0)).current;
  
  const startAnimation = (toValue) => {
    Animated.timing(animation, {
      toValue,
      duration: 250, // Duration of the animation, in milliseconds
      useNativeDriver: false, // We are animating a non-native property (left)
    }).start();
  };
  
  useEffect(() => {
    // Move the slider to the appropriate position when the component mounts
    if (isExpertActive) {
      startAnimation(1);
    } else {
      startAnimation(0);
    }
  }, [isExpertActive]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Log In</Text>
        <Image
          style={styles.translate}
          source={require("../assets/images/translate.png")}
        />
      </View>
      <View style={styles.login}>
        <View style={styles.slider}>
          {/* Slider Indicator */}
          <Animated.View style={[styles.sliderIndicator, {
            left: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '50%'],
            }),
          }]} />
          
          {/* User Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setExpert(false);
              setUserActive(true);
              setExpertActive(false);
              startAnimation(0); // Start the animation to slide to User
            }}
          >
            <Text style={styles.butt}>User</Text>
          </TouchableOpacity>
          
          {/* Expert Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setExpert(true);
              setUserActive(false);
              setExpertActive(true);
              startAnimation(1); // Start the animation to slide to Expert
            }}
          >
            <Text style={styles.butt}>Expert</Text>
          </TouchableOpacity>
        </View>
        <View>
          {isExpert ? (
            <ExpertLogin
              handleLogin={handleLogin}
              email={email}
              setEmail={setEmail}
              pass={pass}
              setPass={setPass}
            />
          ) : (
            <UserLogin {...userLoginProps} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  login: {
    top: "30%",
  },
  translate: {
    width: 45,
    height: 45,
  },
  heading: {
    fontSize: 50,
    color: "#049A10",
    fontFamily: "Poppins_900Black",
  },
  slider: {
    backgroundColor: "#034A0A", // Dark green background for the entire slider
    alignItems: "center", // Align buttons in the center horizontally
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: "10%",
    width: "80%",
    alignSelf: "center",
    overflow: 'hidden',
  },
  sliderIndicator: {
    position: 'absolute',
    width: '50%', // The width of each button
    height: '100%', // The height of the slider
    backgroundColor: '#049A10', // The color of the active button
    borderRadius: 100
  },
  or: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Poppins_700Bold",
  },
  button: {
    borderRadius: 20,
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center", // Center text vertically
  },

  butt: {
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center",
    color: "#FFFFFF", // Center text vertically
  },
  activeButton: {
    backgroundColor: "#049A10", // Light green background for active button
  },
  activeButtonText: {
    color: "#FFFFFF", // White text color for active button
  },
  inactiveButton: {
    backgroundColor: "#034A0A", // Dark green background for inactive button
  },
  inactiveButtonText: {
    color: "#FFFFFF", // White text color for inactive button
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: "4%",
  },
  loginText: {
    color: "#587DBD",
    fontFamily: "Poppins_700Bold",
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
});
