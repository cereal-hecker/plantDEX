import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function SignUp({navigation}){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Image
            style={styles.logo}
            source={require("../assets/images/logo.png")}
          />
          <Image source={require("../assets/images/translate.png")}/>
        </View>
          <View style={styles.loginImage}>
            <Text style={styles.welcome}>Sign Up</Text>
            {/* <Image source={require("../assets/images/login.png")} /> */}
          </View>

          <View>
            <TextInput placeholder="Email"  keyboardType='email-address' autoCapitalize = 'none'/>
          </View>
          <View>
            <TextInput secureTextEntry= {true}placeholder="Password"/>
            <TouchableOpacity onPress={() => {}}>
              <Text>Forgot?</Text>
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
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
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
    }
  });
  