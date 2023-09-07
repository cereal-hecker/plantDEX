import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import ExpertSignup from "./expertSignUp";
import UserSignup from "./userSignUp";

export default function SignUp({navigation}){

    const [isExpert,setExpert] = useState(false)

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.heading}>Sign Up</Text>
          <Image source={require("../assets/images/translate.png")}/>
        </View>
        <View style={styles.signup}>
          <View style={styles.slider}>
            <TouchableOpacity onPress={() => {setExpert(false)}}>
                <Text>User </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setExpert(true)}}>
                <Text>Expert</Text>
            </TouchableOpacity>
          </View>
          <View>
            {isExpert?(<ExpertSignup />):(<UserSignup />)}
          </View>
        </View>

          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('UserLogin')}>
              <Text>Login</Text>
            </TouchableOpacity>
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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 30,
    }
  });
  