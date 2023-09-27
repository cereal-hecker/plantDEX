import {React,useState} from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import AnimatedTextInput from "../components/animatedTextInput";

export default function ExpertLogin({
  handleLogin,
  email,
  setEmail,
  pass,
  setPass,
  navigation,
}) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  return (
    <View style={styles.container}>
      <AnimatedTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <View style={styles.passwordContainer}>
        <AnimatedTextInput
          value={pass}
          onChangeText={setPass}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          style={styles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisibility(!isPasswordVisible)}
          style={styles.visibilityToggle}
        >
          <Text style={styles.visibilityToggleText}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    width: "100%",
    height: 75,
    borderColor: "#049A10",
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    position: "relative",
  },
  input: {
    height: "100%",
    fontSize: 20,
    color: "#3f4146",
  },
  button: {
    backgroundColor: "#049A10",
    padding: 10,
    borderRadius: 20,
    width: 240,
    height: 50,
    alignItems: "center",
    marginTop: "2%",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  labelContainer: {
    position: "absolute",
    top: -8,
    left: 15,
    zIndex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    color: "#049A1050",
    fontFamily: "Poppins_400Regular",
  },

  forgotPasswordContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },

  forgotPasswordText: {
    color: "#587DBD",
    fontFamily: "Poppins_600SemiBold",
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4%",
    marginBottom: "4%",
  },

  line: {
    width: 50,
    height: 1,
    backgroundColor: "#3F3D56",
    marginHorizontal: "2%",
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#3F3D56",
  },

  googleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  googleText: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
  passwordContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    position: 'relative', 
    
  },
  
  passwordInput: {
    flex: 1,
  },
  
  visibilityToggle: {
    padding: 10,
  },
  
  visibilityToggleText: {
    position: 'absolute',
    fontSize: 16, 
    color: '#049A10', 
  }
});
