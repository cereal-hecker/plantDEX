import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image ,  Dimensions} from 'react-native';
import i18n from 'i18next'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TranslateButton() {
  const [language, setLanguage] = useState(i18n.language); // Initial language

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en'; // Toggle between 'en' and 'hi'
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // Change the app's language
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
      <Image 
        style={styles.translate}
        source={require("../assets/images/translate.png")}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.005,
  },
  translate: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
  },
});
