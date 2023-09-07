import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function UserLogin({navigation}){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Login</Text>
          <Image source={require("../assets/images/translate.png")}/>
        </View>
          
          <View style={styles.inputFeild}>
            <TextInput placeholder="Email/Phone number"  keyboardType='email-address' autoCapitalize = 'none'/>
          </View>
          <View style={styles.inputFeild}>
            <TextInput secureTextEntry= {true}placeholder="Password"/>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{textAlign:"right"}}>Forgot?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate()}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.or}>----------OR----------</Text>
          <View style={{flexDirection:'row', justifyContent:'center'}} >
            <Image source={require("../assets/images/googleIcon.svg")} />
            <TouchableOpacity onPress={() => navigation.navigate()}>
              <Text>Log in with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    logo: {
      marginTop: 50,
    },
    heading: {
      fontSize: 50,
      color: "#049A10",
      fontFamily: "Poppins_700Bold",
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
    inputFeild: {
      borderWidth :  1.8 ,
      borderColor :"#EAECEF",
      flexDirection:"row",
      padding: 10,
      borderRadius: 20,
      width: "70%",
      height: 50,
      alignItems: "center",
  }

  });
  