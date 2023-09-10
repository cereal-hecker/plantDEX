import { createStackNavigator } from '@react-navigation/stack';
import SplashCarousel from "./carousel";
import Main from "./main";
import Login from "./login";
import UserLogin from "./userLogin";
import SignUp from "./signUp";
import OtpVerify from "./otpVerify";
// import UserSignup from "./userSignUp";
// import ExpertSignup from "./expertSignUp";
import UploadImage from './uploadImage';  
import Forum from './forum';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashCarousel" component={SplashCarousel} />
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UploadImage" component={UploadImage} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
      </Stack.Navigator>
  );
}