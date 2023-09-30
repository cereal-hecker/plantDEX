import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as File from "expo-file-system";
import DropdownMenu from "../components/dropdown";
import options from "../assets/data/models";
import './translations';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function UploadImage({ navigation }) {
  const {t} = useTranslation();
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState(t("Select your crop"));
  const [isloading, setLoader] = useState(false);

  const handleUpload = async () => {
    setLoader(true);
    // DON'T TOUCH THIS
    const url = `https://plant-dex-9e9e8.el.r.appspot.com/${crop}/predict`;

    const response = await File.uploadAsync(url, image, {
      fieldName: "file",
      httpMethod: "POST",
      uploadType: File.FileSystemUploadType.MULTIPART,
    });

    var obj = JSON.parse(response.body);
    obj["name"] = crop;
    obj["photo"] = image;
    // DON'T TOUCH THIS
    setLoader(false);
    setCrop(t("Select your crop"));
    setImage(null);
    navigation.navigate("Solution", { obj });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert(t("Permission to access media library is required!"));
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
      alert(t("Permission to access the camera is required!"));
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
            <Text style={styles.heading}>{t("UPLOAD")}</Text>
            <Text style={styles.imgorvid}>{t("IMAGE")}</Text>
          </View>
          <View style={styles.dropdown}>
            <DropdownMenu
              options={options}
              onSelect={handleSelect}
              crop={crop}
            />
          </View>
          <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: windowWidth * 0.9, height: windowWidth * 0.9 }}
              />
            ) : (
              <View style={styles.selectArea}>
                <Image
                  style={styles.upload}
                  source={require("../assets/images/upload.png")}
                />
                <Text style={styles.select}>{t("Select File")}</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>{t("OR")}</Text>
            <View style={styles.line}></View>
          </View>
          <TouchableOpacity style={styles.camButton} onPress={takePhoto}>
            <View style={styles.camView}>
              <Image
                style={styles.cam}
                source={require("../assets/images/cam.png")}
              />
              <Text style={styles.camText}>{t("Take a photo")}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continue} onPress={handleUpload}>
            <Text style={styles.continueText}>{t("Continue")}</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header:{
    marginTop: windowWidth * -0.1,
    alignItems: "center",
  },
  heading: {
    fontFamily: "Poppins_900Black",
    fontSize: windowWidth * 0.2,
    color: "#049A10",
  },
  imgorvid: {
    marginTop: windowHeight * -0.03,
    fontSize: windowWidth * 0.1,
    fontFamily: "Poppins_500Medium",
  },
  selectArea: {
    alignItems: "center",
  },
  dropdown: {
    height: windowHeight * 0.05,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginBottom: windowHeight * 0.02,
  },
  uploadArea: {
    borderWidth: windowHeight * 0.0025,
    borderStyle: "dashed",
    borderColor: "#049A10",
    borderRadius: windowWidth * 0.08,
    height: windowHeight * 0.4,
    width: windowWidth * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    fontSize: windowWidth * 0.08,
    color: "#049A1050",
    fontFamily: "Poppins_500Medium",
  },
  upload: {
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    opacity: 0.5,
  },
  orContainer: {
    paddingVertical: windowHeight * 0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.0025,
    backgroundColor: "#3F3D56",
  },
  orText: {
    marginHorizontal: windowHeight * 0.02,
    fontSize: windowWidth * 0.05,
    fontFamily: "Poppins_700Bold",
    color: "#3F3D56",
  },
  camButton: {
    backgroundColor: "#4fb858",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: windowWidth * 0.1,
    width: windowWidth * 0.7,
  },
  cam: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  camText: {
    color: "#fff",
    paddingLeft: windowWidth * 0.05,
    fontFamily: "Poppins_400Regular",
    fontSize: windowWidth * 0.05,
  },
  camView: {
    padding: windowWidth * 0.025,
    flexDirection: "row",
    alignItems: "center",
  },
  continue: {
    paddingVertical: windowWidth * 0.025,
    backgroundColor: "#049A10",
    borderRadius: windowWidth * 0.1,
    alignItems: "center",
    width: windowWidth * 0.6,
    marginTop: windowHeight * 0.02,
  },
  continueText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: windowWidth * 0.05,
  },
});
