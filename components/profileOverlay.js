import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { updateProfile, signOut } from "firebase/auth";
import { auth, firebaseConfig, db } from "./firebase";
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
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ProfileOverlay({handleLogout}){
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState(auth.currentUser.displayName);
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [email, setEmail] = useState("john.doe@example.com");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    try {
      if (userName !== auth.currentUser.displayName) {
        updateProfile(auth.currentUser, { displayName: userName });
      }

      alert("Successfully Updated");
    } catch (e) {
      alert("Error Occurred!");
    }
  };


  return (
    <View style={styles.centeredView}>
      <View style={styles.accmodal}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={styles.accimg}
            source={require("../assets/images/account.png")}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.profileImageContainer}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <Image source={require("../assets/images/account.png")} />
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              placeholder="User Name"
            />
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />

            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdate}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible)
                handleLogout()
            }}
            >
              <Text style={styles.closeButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight * 0.05,
  },
  accimg: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
  },
  accmodal: {
    alignSelf: "flex-end",
    marginTop: windowHeight * -0.05,
  },
  modalView: {
    margin: windowWidth * 0.05,
    backgroundColor: "white",
    borderRadius: windowWidth * 0.04,
    padding: windowWidth * 0.07,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: windowWidth * 0.01,
    },
    shadowOpacity: 0.25,
    shadowRadius: windowWidth * 0.02,
    elevation: 5,
  },
  input: {
    height: windowHeight * 0.065,
    width: windowWidth * 0.75,
    marginVertical: windowHeight * 0.015,
    borderWidth: 1,
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.08,
    borderColor: "#049A10",
    fontFamily: "Poppins_400Regular",
  },
  profileImageContainer: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.1,
    marginBottom: windowHeight * 0.04,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
  },
  profileImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.1,
  },
  updateButton: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.06,
    backgroundColor: "#2196F3",
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.08,
    marginTop: windowHeight * 0.01,
    justifyContent: "center",
  },
  updateButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: windowHeight * 0.02,
    color: "white",
    textAlign: "center",
  },
  closeButton: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.06,
    backgroundColor: "red",
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.08,
    marginTop: windowHeight * 0.015,
    justifyContent: "center",
  },
  closeButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: windowHeight * 0.02,
    color: "white",
    textAlign: "center",
  },
});