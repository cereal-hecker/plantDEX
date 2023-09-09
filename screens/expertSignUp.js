import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function ExpertSignup({ onPress= () => {}}){
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
          <TouchableOpacity style={styles.button} onPress>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.or}>----------OR----------</Text>
          <View style={{flexDirection:'row', justifyContent:'center'}} >
            <Image source={require("../assets/images/googleIcon.png")} />
            <TouchableOpacity onPress={() => navigation.navigate()}>
              <Text>Sign up with Google</Text>
            </TouchableOpacity>
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
    }
  });
  