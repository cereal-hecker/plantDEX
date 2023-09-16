import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, View, Text, TouchableOpacity } from 'react-native'
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
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              backgroundColor: '#049810',  // Just to check if styling works
              borderRadius: 15,
              height: 70,
            },
            null
          ],
        }}
      >
      
      <Tab.Screen 
          name="Home" 
          component={Main} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <View style={{alignItems:'center',
              justifyContent:'center',
              top:5,}}>
              <Image
                source={require('../assets/images/home.png')}
                style={{ width: size, height: size, tintColor: 'white' }}
              />
              <Text style={{color:'white'}}>Home</Text>
              </View>
            )
          }} 
        />
        <Tab.Screen 
    name="Camera" 
    component={Camera} 
    options={{
      tabBarButton: (props) => (
        <TouchableOpacity
          onPress={props.onPress}  // added this line
          style={{
            top:-30,
            justifyContent:'center',
            ...styles.shadow
          }}
        >
          <View style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor:'#fff',
            alignItems:'center',
            justifyContent:'center',
            top:10,
          }}
          >
            <Image
              source={require('../assets/images/cam.png')}
              style={{ width: 30, height: 30, tintColor: '#049810' }}
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
      )
    }} 
/>

        <Tab.Screen name="Forum" component={Forum} options={{
            tabBarIcon: ({ color, size }) => (
              <View style={{alignItems:'center',
              justifyContent:'center',
              top:5,}}>
              <Image
                source={require('../assets/images/forum.png')}
                style={{ width: size, height: size, tintColor: 'white' }}
              />
              <Text style={{color:'white'}}>Forum</Text>
              </View>
            )
          }} 
        />
      </Tab.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
    shadow:{
      shadowColor:'#7F5DF0',
      shadowOffset: {
        width:0,
        height:10
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5
    },  
  })

export default TabNavigator