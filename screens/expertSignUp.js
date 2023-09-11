import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";

export default function ExpertSignup({handleSignup,email,setEmail,pass, setPass,repass, setRepass}){

    return (
      <View style={styles.container}>
          <View>
            <TextInput placeholder="Email"  keyboardType='email-address' autoCapitalize = 'none'/>
          </View>
          <View>
            <TextInput secureTextEntry= {true}placeholder="Password"/>
          </View>
          <View>
            <TextInput secureTextEntry= {true}placeholder="Re-enter Password"/>
          </View>
          <TouchableOpacity style={styles.button}  onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.or}>----------OR----------</Text>
          <View style={styles.googleContainer}>
          <Image
            style={styles.googleIcon}
            source={require("../assets/images/googleIcon.png")}
          />
          <View style={styles.googleTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate()}>
              <Text style={styles.googleText}>Log in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    googleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    googleIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
  
    googleTextContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  
    googleText: {
      fontSize: 20,
      fontFamily: "Poppins_500Medium",
    },
  
    dontHaveAccountContainer: {
      marginTop: "4%",
      flexDirection: 'row',
      justifyContent: 'center',
    },
  
    dontHaveAccountText: {
      fontFamily: "Poppins_600SemiBold",
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
  