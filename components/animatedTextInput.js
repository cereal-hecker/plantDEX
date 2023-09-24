import React, { useState, useRef } from 'react';
import { View, Text, Animated, TextInput, StyleSheet } from 'react-native';

const AnimatedTextInput = ({ value, onChangeText, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value.length > 0 ? 1 : 0)).current;

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

  return (
    <View style={styles.inputField}>
      <Animated.Text style={labelStyle}>
        {placeholder}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
    </View>
  );
};

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
  input: {
    height: '100%',
    fontSize: 20,
    color: '#3f4146',
    paddingHorizontal: 15, // Added padding to align the text inside TextInput
  },
});

export default AnimatedTextInput;
