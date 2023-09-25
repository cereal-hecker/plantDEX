import { createStackNavigator } from '@react-navigation/stack';
import SplashCarousel from "./carousel";
import Login from "./login";
import UserLogin from "./userLogin";
import UserSwitch from './userSwitch';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashCarousel" component={SplashCarousel} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserSwitch" component={UserSwitch} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        {/* <Stack.Screen name="OtpVerify" component={OtpVerify} /> */}
      </Stack.Navigator>
  );
}