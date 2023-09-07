import { View,Text,StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function UserSignup(){
    return (
      <View style={styles.container}>
          <View>
            <TextInput placeholder="Phone Number" autoCapitalize = 'none'/>
          </View>
          <View>
            <TextInput placeholder="Re-enter Phone Number" autoCapitalize = 'none'/>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate()}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
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
  