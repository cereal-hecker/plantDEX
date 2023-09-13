import { createStackNavigator } from '@react-navigation/stack';
import SplashCarousel from "./carousel";
import Main from "./main";
import Welcome from "./welcome";
import Login from './login';
import Signup from './signUp';
import OtpVerify from "./otpVerify";
import UploadImage from './uploadImage';  
import Forum from './forum';
import UserLogin from './userLogin';
import ExpertLogin from './expertLogin';
import UserSignup from './userSignUp';
import ExpertSignUp from './expertSignUp';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashCarousel" component={SplashCarousel} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="UserSignup" component={UserSignup} />
        <Stack.Screen name="ExpertSignUp" component={ExpertSignUp} />
        <Stack.Screen name="ExpertLogin" component={ExpertLogin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
  );
}