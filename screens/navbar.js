import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Main from './main';
import Forum from './forum';
import UploadImage from './uploadImage';
import Solution from './solution';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Camera = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="UploadImage" component={UploadImage} />
      <Stack.Screen name="Solution" component={Solution} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBarStyle, null],
      }}>
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabItemContainer}>
              <Image
                source={require('../assets/images/home.png')}
                style={{ width: size, height: size, tintColor: 'white' }}
              />
              <Text style={styles.tabItemText}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={props.onPress}
              style={styles.cameraTabButton}>
              <View style={styles.cameraIcon}>
                <Image
                  source={require('../assets/images/cam.png')}
                  style={styles.cameraImage}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabItemContainer}>
              <Image
                source={require('../assets/images/forum.png')}
                style={{ width: size, height: size, tintColor: 'white' }}
              />
              <Text style={styles.tabItemText}>Forum</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#049810',
    borderRadius: windowWidth * 0.1,
    height: windowHeight * 0.085,
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemText: {
    color: 'white',
  },
  cameraTabButton: {
    top: windowHeight * -0.05,
    justifyContent: 'center',
  },
  cameraIcon: {
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    borderRadius: windowWidth * 0.2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: windowHeight * 0.02,
  },
  cameraImage: {
    width: windowWidth * 0.075,
    height: windowWidth * 0.075,
    tintColor: '#049810',
  },
});

export default TabNavigator;
