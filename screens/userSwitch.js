import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth, db, firebaseConfig } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import React, { useState, useRef, useEffect } from "react";
import UserLogin from "./userLogin";
import ExpertLogin from "./expertLogin";
import './translations';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';
import TranslateButton from "../components/translatebutton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function UserSwitch({ navigation }) {
  const {t} = useTranslation();

  const [isUserActive, setUserActive] = useState(true);
  const [isExpertActive, setExpertActive] = useState(false);
  const [isExpert, setExpert] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then(async (userCreds) => {
        const user = userCreds.user;
        var details = await getDoc(doc(db, "user", auth.currentUser.uid));
        details = details.data();
        if (details == null) details = {};
        details["type"] = "expert";
        await setDoc(doc(db, "user", auth.currentUser.uid), details);
        navigation.replace("MainApp", { screen: "History" });
      })
      .catch((error) => {
        console.log(error);
        createUserWithEmailAndPassword(auth, email, pass)
          .then(async (userCreds) => {
            const user = userCreds.user;
            sendEmailVerification(auth.currentUser);
            await setDoc(doc(db, "user", auth.currentUser.uid), {
              type: "expert",
            });
            navigation.replace("MainApp", { screen: "History" });
          })
          .catch((error) => {
            alert(error.message);
          });
      });
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
      setInfo("Success : Verification code has been sent to your phone");
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

      await setDoc(doc(db, "user", auth.currentUser.uid), { type: "user" });
      navigation.replace("MainApp", { screen: "Main" });
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
        <Text style={styles.heading}>{t("Log In")}</Text>
        <View style={styles.translateButtonContainer}>
          <TranslateButton />
        </View>
      </View>
      <View style={styles.login}>
        <View style={styles.slider}>
          {/* Slider Indicator */}
          <Animated.View
            style={[
              styles.sliderIndicator,
              {
                left: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["1%", "49%"],
                }),
              },
            ]}
          />

          <Animated.View
            style={[
              styles.sliderIndicator,
              {
                left: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["1%", "49%"],
                }),
              },
            ]}
          />

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
            <Text style={styles.butt}>{t("User")}</Text>
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
            <Text style={styles.butt}>{t("Expert")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
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
    height: "100%",
  },
  login: {
    marginTop: windowWidth * 0.4,
    alignItems: "center",
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
    backgroundColor: "#75C07C", // Dark green background for the entire slider
    alignItems: "center", // Align buttons in the center horizontally
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: "10%",
    width: "80%",
    alignSelf: "center",
    overflow: "hidden",
    overflow: "hidden",
  },
  sliderIndicator: {
    position: "absolute",
    width: "50%", // The width of each button
    height: "90%", // The height of the slider
    backgroundColor: "#049A10", // The color of the active button
    borderRadius: 100,
  },
  content:{
    
  },
  button: {
    borderRadius: 20,
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  butt: {
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center",
    color: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: windowWidth * 1,
    paddingHorizontal: windowWidth * 0.05,
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
  translateButtonContainer: {
    position: 'absolute', // position the container absolutely
    top: windowHeight * 0.01, // Adjust the top and right values as needed
    right: windowWidth * 0.05, // to position the button at the top right of the screen
    zIndex: 2, // Ensure the translate button is above other elements
  },
});
