import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashCarousel from './screens/carousel';
import SplashScreen from './screens/splashscreen';
import Main from './screens/main';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SplashCarousel" component={SplashCarousel} />
        {/* <Stack.Screen name="Main" component={Main} /> */}
        {/* Add your main screen here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
