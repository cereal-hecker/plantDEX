import React, { useState, useEffect } from "react";
import { Text, Image, View, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function UploadImage({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>UPLOAD</Text>
        <Text style={styles.imgorvid}>IMAGE OR VIDEO</Text>
      </View>
      <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 335, height: 335 }} />
        ) : (
          <View style={styles.selectArea}>
            <Image source={require("../assets/images/upload.png")} />
            <Text style={styles.select}>Select File</Text>
          </View>
        )}
      </TouchableOpacity>
      <Image source={require("../assets/images/Division-OR-bar.png")} />
      <TouchableOpacity style={styles.camButton} onPress={takePhoto}>
        <View style={styles.camView}>
          <Image source={require("../assets/images/cam.png")} />
          <Text style={styles.camText}>Take a photo</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continue} onPress={pickImage}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  selectArea: {
    alignItems: "center",
  },
  select: {
    paddingTop: 10,
    fontSize: 30,
    color: "#049A10",
    fontFamily: "Poppins_500Medium",
  },
  header: {
    fontFamily: "Poppins_900Black",
    fontSize: 64,
    color: "#049A10",
    marginTop: 70,
  },
  imgorvid: {
    fontSize: 40,
    fontFamily: "Poppins_500Medium",
    padding: 1,
    marginBottom: 10,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dotted",
    borderColor: "#049A10",
    borderRadius: 10,
    padding: 20,
    height: 335,
    width: 335,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  camButton: {
    backgroundColor: "#4fb858",
    alignItems: "center",
    borderRadius: 40,
    width: 280,
    marginTop: 10,
  },
  camText: {
    color: "#fff",
    paddingLeft: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
  camView: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  continue: {
    padding: 10,
    backgroundColor: "#049A10",
    borderRadius: 40,
    alignItems: "center",
    width: 240,
    marginTop: 20,
  },
  continueText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
});
