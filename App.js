import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashCarousel from "./screens/carousel";
import SplashScreen from "./screens/splashscreen";
import Main from "./screens/main";
import { useFonts, Poppins_700Bold, Poppins_500Medium } from "@expo-google-fonts/poppins";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium
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
        {/* <Stack.Screen name="Main" component={Main} /> */}
        {/* Add your main screen here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
