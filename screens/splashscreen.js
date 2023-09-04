import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Add any necessary logic here, e.g., loading data or performing initial setup
    // After the splash screen is displayed for a certain duration or when your app's setup is complete, you can navigate to the main screen.
    setTimeout(() => {
      navigation.navigate('Main'); // Replace 'Main' with the name of your main screen
    }, 2000); // Change the duration as needed (in milliseconds)
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.splashImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    // width: 200, // Adjust the width and height according to your image
    // height: 200,
  },
});

export default SplashScreen;
