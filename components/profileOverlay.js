import React, { useState } from 'react';
import {
Modal,
View,
Text,
TouchableOpacity,
StyleSheet,
TextInput,
Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Assuming you are using Expo
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo

const ProfileOverlay = () => {
const [modalVisible, setModalVisible] = useState(false);
const [userName, setUserName] = useState('John Doe');
const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
const [email, setEmail] = useState('john.doe@example.com');
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

const handleUpdate = () => {
    console.log('called')
};

return (
    <View style={styles.centeredView}>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
            source={require("../assets/images/account.png")}
            />
    </TouchableOpacity>

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
            <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
            {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
                <Image
                    source={require("../assets/images/account.png")}
                    />  
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

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
            >
            <Text style={styles.closeButtonText}>Close</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
},
modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
},
profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
},
profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
},
updateButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
},
updateButtonText: {
    color: 'white',
},
closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
},
closeButtonText: {
    color: 'white',
},
});

export default ProfileOverlay;
