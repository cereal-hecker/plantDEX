import React, { useState } from "react";
import { Text, Image, View, StyleSheet } from "react-native";
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
            <Image 
            style={styles.uploadImage}
            source={require("../assets/images/upload.png")} />
            <Text style={styles.select}>Select File</Text>
          </View>
        )}
      </TouchableOpacity>
      <Image source={require("../assets/images/Division-OR-bar.png")} />
      <TouchableOpacity style={styles.camButton} onPress={takePhoto}>
        <View style={styles.camView}>
          <Image 
          style={styles.cam}
          source={require("../assets/images/cam.png")} />
          <Text style={styles.camText}>Take a photo</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continue} onPress={navigation.navigate('UserLogin')}>
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
  uploadImage: {
    width: 40,
    height: 40,
    opacity: 0.5,
  },
  selectArea: {
    alignItems: "center",
  },
  select: {
    paddingTop: 10,
    fontSize: 30,
    color: "#049A1050",
    fontFamily: "Poppins_500Medium",
  },
  header: {
    fontFamily: "Poppins_900Black",
    fontSize: 64,
    color: "#049A10",
    marginTop: "8%",
  },
  imgorvid: {
    fontSize: 42,
    fontFamily: "Poppins_500Medium",
    marginBottom: 10,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#049A10",
    borderRadius: 20,
    padding: 20,
    height: 335,
    width: 335,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cam: {
    width: 20,
    height: 20,
  },
  camButton: {
    backgroundColor: "#049a10b2",
    alignItems: "center",
    justifyContent: "center", 
    borderRadius: 20,
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
    alignItems: "center", 
    justifyContent: "center",
  },
  continue: {
    padding: 10,
    backgroundColor: "#049A10",
    borderRadius: 20,
    alignItems: "center",
    width: 240,
    marginTop: "15%",
  },
  continueText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
});
