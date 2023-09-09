import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashCarousel from "./screens/carousel";
import Main from "./screens/main";
import Login from "./screens/login";
import UserLogin from "./screens/userLogin";
import SignUp from "./screens/signUp";
import OtpVerify from "./screens/otpVerify";
import UserSignup from "./screens/userSignUp";
import ExpertSignup from "./screens/expertSignUp";
import UploadImage from "./screens/uploadImage";

import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashCarousel" component={SplashCarousel} />
        <Stack.Screen name="UploadImage" component={UploadImage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="UserSignup" component={UserSignup} />
        <Stack.Screen name="ExpertSignup" component={ExpertSignup} /> */}
        
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
