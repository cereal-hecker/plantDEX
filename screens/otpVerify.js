import OTPInputView from "@twotalltotems/react-native-otp-input";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";

export default function OtpVerify({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
        behaviour={Platform.OS == "ios"? "" : ""}
        style={{
            height: "100%",
            width: "100%",
            background:"#fff"
        }}
        >
            <View style={{flex:1,alignItems:"center"}}>
                <Text style={styles.heading}>Confirm OTP code</Text>
                <Text style={{fontSize:16}}>Enter X digit code sent via SMS to your mobile number</Text>
                <View style={{width:'100%',paddingHorizontal:22, alignItems:"center"}}>
                    <OTPInputView
                        style={{width:"100%", height:200, paddingHorizontal:32}} 
                        pinCount={4}
                        autoFocusOnLoad
                        codeInputFieldStyle={{
                            width:30,
                            height:45,
                            color:"#f4a135",
                            borderWidth: 0,
                            borderBottomWidth:3,
                            borderBottomColor:'#111',
                        }}
                        codeInputHighlightStyle={{borderColor:"#2ab12f"}}
                        onCodeFilled={(code) => {
                            console.log(`code is ${code}`)
                        }}
                    />
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Text>Haven't got the confirmation code yet?</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text>Resend</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text>Wrong phone number?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                    <Text>Re-enter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex:1
  },
  logo: {
    width: 136,
    height: 81,
    marginTop: 50,
  },
  heading: {
    fontSize: 70,
    flexWrap: true,
    color: "#049A10",
    fontFamily: "Poppins_700Bold",
    marginVertical:60,
  },
  button: {
    backgroundColor: "#049A10",
    padding:10,   
    borderRadius: 20,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent:"center",
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
  }
});
