import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Image } from 'react-native'
import History from './history'
import Main from './main'
import Forum from './forum'
import UploadImage from './uploadImage'
import Solution from './solution'
import { StyleSheet } from 'react-native'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();

const Camera = () => {
  return (
    <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="UploadImage" component={UploadImage} />
        <Stack.Screen name="Solution" component={Solution} />
      </Stack.Navigator>
  );}


  const TabNavigator = () => {
    return (
      <Tab.Navigator 
        screenOptions={{
          headerShown: false,
        }}
        tabBarOptions={{
          showLabel:false,
          style: {
            position: 'absolute',
            bottom: 25,
            left:20,
            right:20,
            elevation:0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height:90,
            ...styles.shadow
          }
        }}
      >
        <Tab.Screen name="Home" component={Main} />
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="Forum" component={Forum} />
      </Tab.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
    shadow:{
      shadowColour:'#7F5DF0',
      shadowOffset: {
        width:0,
        height:10
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5

    }
  })

export default TabNavigator
