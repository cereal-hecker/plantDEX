import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./screens/authStackNav";
import TabNavigator from "./screens/navbar";
import { createStackNavigator } from "@react-navigation/stack";
import {auth} from "./screens/firebase";
import { onAuthStateChanged } from "@firebase/auth";

import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_900Black,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const Stack = createStackNavigator();

  onAuthStateChanged(auth, (user) => {
    if(user){
      console.log(user.uid);
      //navigation.navigate('MainApp',{screen:'History'})
    }else{
      //navigation.navigate('AuthStack')
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
