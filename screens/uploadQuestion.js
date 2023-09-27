import React, { useState } from 'react';
import {
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
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
import { db } from './firebase';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function UploadQuestion ({navigation, user }) {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); 
  

  const selectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
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
          var postC = 0;
          if (getPostCount.exists()) {
            getPostCount = getPostCount.data();
            postC = getPostCount["postCount"];
          } else {
            await setDoc(doc(db, "user", user.uid), { postCount: postC });
          }
          const postID = `${user.uid}${postC}`;
          const newQuestionData = {
            id: postID,
            date: Math.floor(Date.now() / 1000),
            profile: user.photoURL,
            authorUUID: user.uid,
            username: user.displayName,
            question: question, // Fixed here
            description: description, // Added here
            image: image, // Added here
            answer: "",
            replies: 0,
          };
          try {
            await setDoc(doc(db, "forum", postID), newQuestionData);
            await setDoc(doc(db, "user", user.uid), {
              postCount: postC + 1,
            });
            alert("Post sent successfully!");
          } catch (e) {
            alert("Error adding post!");
            console.log(e.message);
          }
          setQuestion(""); // Fixed here
          setDescription(""); // Clearing description after posting
          setImage(null); // Clearing image after posting
          navigation.replace('QuestionList')
        }
    };
    

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => {navigation.goBack();
            }}
        >
            <Image source={require('../assets/images/arrow.png')} style={styles.backArrow} />
        </TouchableOpacity>

      <TextInput
        placeholder="Enter your question"
        value={question}
        onChangeText={setQuestion}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={styles.textInput}
        multiline
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={selectPhoto} style={styles.photoButton}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={postQuestion} style={styles.postButton}>
        <Text style={styles.buttonText}>Post Question</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  photoButton: {
    backgroundColor: '#049A10',
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  postButton: {
    backgroundColor: '#049A10',
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  backArrowContainer: {
    marginRight: windowWidth * 0.05,
  },
  backArrow: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
  },
});

