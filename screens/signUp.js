import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import ExpertSignup from "./expertSignUp";
import UserSignup from "./userSignUp";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";


export default function SignUp({navigation}){

    const [isExpert,setExpert] = useState(false)
    
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRepass] = useState('');

    const handleSignUp = () => {
      if(pass == repass){
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCreds) => {
          const user = userCreds.user;
          console.log(user.email);
          
          //navigation.navigate('MainApp',{screen:'History'})
  
        })
        .catch((error) => alert(error.message))
      }else{
        alert("Passwords don't match.");
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.heading}>Sign Up</Text>
        <Image source={require("../assets/images/translate.png")}/>
        </View>
        <View style={styles.signup}>
          <View style={styles.slider}>
            <TouchableOpacity style={styles.button} onPress={() => {setExpert(false)}}>
                <Text style={{textAlign:"left"}}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {setExpert(true)}}>
                <Text style={{textAlign:"right"}}>Expert</Text>
            </TouchableOpacity>
          </View>
          <View>
            {isExpert?(<ExpertSignup handleSignup={handleSignUp}
      email={email}
      setEmail={setEmail}
      pass={pass}
      setPass={setPass}
      repass={repass}
      setRepass={setRepass} />):(<UserSignup onPress={() => navigation.navigate('OtpVerify')}/>)}
          </View>
          
          <View style={styles.dontHaveAccountContainer}>
            <Text style={styles.dontHaveAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>Sign Up</Text>
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
    signup:{
        marginTop: 40,
      marginBottom: 70,
      top: '50%'
    },
    logo: {
      marginTop: 50,
    },
    heading: {
        fontSize: 50,
        color: "#049A10",
        fontFamily: "Poppins_700Bold",
      },
    slider:{
        backgroundColor: "#049A10",
        padding: 10,
        height: 50,
        alignItems: "center",
        flexDirection:'row', 
        justifyContent:'center',
        borderRadius:40,
    },
    or: {
      fontSize: 16,
      marginVertical: 10,
      fontFamily: "Poppins_700Bold",
    },
    button: {
      backgroundColor: "#049A10",
      borderRadius: 20,
      width: "30%",
      height: 50,
      alignItems: "center",
    },
    buttonText: {
      textAlign: "center",
      color: "white", // Change sign up button text color to white
      fontSize: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 30,
    },
    loginText: {
      color: "#587DBD",
      fontFamily: "Poppins_700Bold",
    },
    dontHaveAccountContainer: {
      marginTop: "4%",
      flexDirection: 'row',
      justifyContent: 'center',
    },
  
    dontHaveAccountText: {
      fontFamily: "Poppins_600SemiBold",
    },
  
    signUpText: {
      color: "#587DBD",
      fontFamily: "Poppins_700Bold",
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
    