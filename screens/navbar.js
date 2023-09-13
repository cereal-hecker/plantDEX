import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import History from './history'
import Main from './main'
import Forum from './forum'
import UploadImage from './uploadImage'
import Solution from './solution'


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Forum" component={Forum} />
      <Tab.Screen name="UploadImage" component={UploadImage} />
      <Tab.Screen name="Solution" component={Solution} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  )
}

export default TabNavigator