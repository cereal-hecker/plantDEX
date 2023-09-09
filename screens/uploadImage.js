import React, { useState, useEffect } from 'react';
import { Button, Text, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function UploadImage({ navigation }) {

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      return (
        <View>
        <Text style = {styles.header}>UPLOAD</Text>
        <Text style = {styles.imgorvid}>IMAGE OR VIDEO</Text>
          <TouchableOpacity title="Pick an image from camera roll" style = {styles.uploadArea} onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      );
    }

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontFamily: "Poppins_700Bold",
    fontSize: 64,
    color: "#049A10",
  },
  imgorvid: {
fontSize: 45,
fontFamily: "Poppins_500Medium"
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dotted",
    borderColor: "#049A10",
    borderRadius: 10,
    padding: 20,
  },
  uploadText: {
    fontSize: 16,
    color: "#049A10",
    fontFamily: "Poppins_700Bold",
  },
});
