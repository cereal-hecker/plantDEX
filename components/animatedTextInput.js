import React, { useState, useRef } from 'react';
import { View, Text, Animated, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import '../screens/translations';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';

export default function AnimatedTextInput({ value, onChangeText, placeholder, isSecureTextEntry}){
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value.length > 0 ? 1 : 0)).current;
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value.length === 0) {
      Animated.timing(animatedIsFocused, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: 15,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [25, -8],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#049A1050', '#049A10'],
    }),
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 2,
  };

  const { t } = useTranslation();

  return (
    <View style={styles.inputField}>
      <Animated.Text style={labelStyle}>
        {placeholder}
      </Animated.Text>
      <View style={styles.inputBox}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
          secureTextEntry={isSecureTextEntry ? !isPasswordVisible : false}
        />
        {isSecureTextEntry && (
          <TouchableOpacity
            onPress={() => setPasswordVisibility(!isPasswordVisible)}
            style={styles.visibilityToggle}
          >
            <Text style={styles.visibilityToggleText}>
              {isPasswordVisible ? t('Hide') : t('Show')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputField: {
    width: 300,
    height: 75,
    borderColor: '#049A10',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  inputBox: {
    position: 'relative', // added this
    flexDirection: 'row',
    width: '100%',
    height: '100%', // added this
  },
  input: {
    height: '100%',
    fontSize: 20,
    color: '#3f4146',
    paddingHorizontal: 15,
    width: '100%', // added this
  },
  visibilityToggle: {
    position: 'absolute', // changed this
    right: 10, // added this
    height: '100%', // added this
    justifyContent: 'center', // added this
    paddingHorizontal: 10, // changed this
  },
  visibilityToggleText: {
    fontSize: 16,
    color: '#049A10',
  },
});