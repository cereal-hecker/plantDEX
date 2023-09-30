import React, { useState } from "react";
import {
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import * as ImagePicker from "expo-image-picker";
import './translations';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function UploadQuestion({ navigation, user }) {
  const {t} = useTranslation();
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const selectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Use the new "canceled" key and "assets" array instead of "cancelled" and "uri"
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri); // Set image URI if image is selected
    }
  };

  const postQuestion = async () => {
    if (user.displayName == null) {
      alert(
        "You need a display name before you can make a post\n\nPlease head to the profile section update it!"
      );
    } else {
      var getPostCount = await getDoc(doc(db, "user", user.uid));
      var postC = getPostCount.data();

      if (postC["postC"] == null) postC["postC"] = 0;

      const postID = `${user.uid}${postC["postC"]}`;
      const newQuestionData = {
        id: postID,
        date: Math.floor(Date.now() / 1000),
        profile: user.photoURL,
        authorUID: user.uid,
        username: user.displayName,
        question: question, // Fixed here
        description: description, // Added here
        image: image, // Added here
        answer: "",
        replies: 0,
      };
      postC["postC"] = postC["postC"] + 1;
      try {
        await setDoc(doc(db, "forum", postID), newQuestionData);
        await setDoc(doc(db, "user", user.uid), postC);
        alert("Post sent successfully!");
      } catch (e) {
        alert("Error adding post!");
        console.log(e.message);
      }
      setQuestion(""); // Fixed here
      setDescription(""); // Clearing description after posting
      setImage(null); // Clearing image after posting
      navigation.replace("QuestionList");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
        <TouchableOpacity
          style={styles.backArrowContainer}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../assets/images/left-arrow.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <View style={styles.questionContainer}>
        <TextInput
          placeholder={t("Enter your question")}
          value={question}
          onChangeText={setQuestion}
          style={styles.textInput}
        />
        <TextInput
          placeholder={t("Enter description")}
          value={description}
          onChangeText={setDescription}
          style={styles.descriptionInput}
          multiline
        />
        <TouchableOpacity style={styles.uploadArea} onPress={selectPhoto}>
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
        <TouchableOpacity onPress={postQuestion} style={styles.postButton}>
          <Text style={styles.buttonText}>{t("Post Question")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowWidth * 0.05, // 4% of window width
    backgroundColor: "#fff",
  },
  questionContainer:{
    flex:1,
    marginTop:windowHeight * -0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: windowWidth * 0.9,
    height: windowHeight * 0.05,
    borderWidth: windowHeight * 0.0025,
    borderColor: "#049A10",
    borderRadius: windowWidth * 0.08, // 1.2% of window width
    marginVertical: windowHeight * 0.01, // 1% of window height
    paddingHorizontal: windowWidth * 0.02, // 2% of window width
    paddingVertical: windowHeight * 0.01, // 1% of window height
    marginHorizontal: windowWidth * 0.04, // 4% of window width
    fontSize:'18px',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: windowWidth * 0.9,
    borderWidth: windowHeight * 0.0025,
    borderColor: "#049A10",
    borderRadius: windowWidth * 0.08, // 1.2% of window width
    marginVertical: windowHeight * 0.01, // 1% of window height
    paddingHorizontal: windowWidth * 0.02, // 2% of window width
    paddingVertical: windowHeight * 0.01, // 1% of window height
    height: windowHeight * 0.1, // 10% of window height
    marginHorizontal: windowWidth * 0.04, // 2% of window width
    fontSize:'18px',
  },
  photoButton: {
    backgroundColor: "#049A10",
    paddingVertical: windowHeight * 0.015, // 1.5% of window height
    paddingHorizontal: windowWidth * 0.05, // 5% of window width
    marginTop: windowHeight * 0.025, // 2.5% of window height
    alignItems: "center",
    borderRadius: windowWidth * 0.03, // 3% of window width
    marginHorizontal: windowWidth * 0.04, // 4% of window width
  },
  postButton: {
    backgroundColor: "#049A10",
    paddingVertical: windowHeight * 0.015, // 1.5% of window height
    paddingHorizontal: windowWidth * 0.05, // 5% of window width
    marginTop: windowHeight * 0.025, // 2.5% of window height
    alignItems: "center",
    borderRadius: windowWidth * 0.03, // 3% of window width
    marginHorizontal: windowWidth * 0.04, // 4% of window width
  },
  image: {
    width: windowWidth * 0.25, // 25% of window width
    height: windowHeight * 0.125, // 12.5% of window height
    marginVertical: windowHeight * 0.0125, // 1.25% of window height
    marginHorizontal: windowWidth * 0.04, // 4% of window width
  },
  backArrowContainer: {
    position:'absolute',
    marginTop:windowHeight * 0.054,
    paddingLeft: windowWidth * 0.02,
    zIndex: 2,
  },
  backArrow: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
  },
  buttonText: {
    color: "#fff",
    fontSize: windowWidth * 0.045, // 4.5% of window width
    fontFamily: "Poppins_500Medium",
  },
  uploadArea: {
    borderWidth: windowHeight * 0.0025,
    borderStyle: "dashed",
    borderColor: "#049A10",
    borderRadius: windowWidth * 0.08,
    height: windowHeight * 0.3,
    width: windowWidth * 0.7,
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
  selectArea: {
    alignItems: "center",
  },
});
