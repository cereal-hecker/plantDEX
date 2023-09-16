import React, { useState } from "react";
import { Text, Image, View, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as File from "expo-file-system";
import DropdownMenu from "../components/dropdown";
import options from "../assets/data/models";

export default function UploadImage({ navigation }) {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState("Select your crop");
  const [isloading,setloader] = useState(false)

  const handleUpload = async () => {
    setloader(true)
    // DON'T TOUCH THIS
    const actual = await File.readAsStringAsync(image, {
      encoding: File.EncodingType.Base64,
    });

    const url = `https://plant-dex-9e9e8.el.r.appspot.com/${crop}/predict`;

    const response = await File.uploadAsync(url, image, {
      fieldName: "file",
      httpMethod: "POST",
      uploadType: File.FileSystemUploadType.MULTIPART,
    });

    var obj = JSON.parse(response.body);
    console.log(obj);
    obj["name"] = crop
    // DON'T TOUCH THIS
    setloader(false)

    navigation.navigate("Solution", { obj });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access the camera is required!");
      return;
    }

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

  const handleSelect = (selectedOption) => {
    setCrop(selectedOption.value);
  };

return (
    <SafeAreaView style={styles.container}>
      {isloading ? (
        <ActivityIndicator size="large" colors={""} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.heading}>UPLOAD</Text>
            <Text style={styles.imgorvid}>IMAGE OR VIDEO</Text>
          </View>
          <View style={styles.dropdown}>
            <DropdownMenu options={options} onSelect={handleSelect} crop={crop} />
          </View>
          <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={{ width: 335, height: 335 }} />
            ) : (
              <View style={styles.selectArea}>
                <Image
                  style={styles.upload}
                  source={require("../assets/images/upload.png")}
                />
                <Text style={styles.select}>Select File</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line}></View>
          </View>
          <TouchableOpacity style={styles.camButton} onPress={takePhoto}>
            <View style={styles.camView}>
              <Image
                style={styles.cam}
                source={require("../assets/images/cam.png")}
              />
              <Text style={styles.camText}>Take a photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continue} onPress={handleUpload}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    paddingTop: "4%",
  },
  heading: {
    fontFamily: "Poppins_900Black",
    fontSize: 64,
    color: "#049A10",
  },
  imgorvid: {
    marginTop: "-10%",
    fontSize: 40,
    fontFamily: "Poppins_500Medium",
    marginBottom: "10%",
  },
  upload: {
    width: 40,
    height: 40,
    opacity: 0.5,
  },
  uploadArea: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#049A10",
    borderRadius: 25,
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cam: {
    width: 20,
    height: 20,
  },
  camButton: {
    backgroundColor: "#4fb858",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 280,
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
  },
  continue: {
    padding: 10,
    backgroundColor: "#049A10",
    borderRadius: 40,
    alignItems: "center",
    width: 240,
    marginTop: "8%",
  },
  continueText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
  orContainer: {
    paddingVertical: "2%",
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: 50,
    height: 1,
    backgroundColor: "#3F3D56",
    marginHorizontal: "2%",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#3F3D56",
  },
  dropdown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingVertical: "6%",
  },
});