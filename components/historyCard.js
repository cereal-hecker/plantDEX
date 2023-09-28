import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

const HistoryCard = ({ item }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.card}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              {item.cropName} - {item.diseaseName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <ScrollView>
          <View style={styles.modalContainer}>
            <Text style={styles.modalname}>
              {item.cropName}
            </Text>
            <Text style={styles.modaldisease}>
            {item.diseaseName}
            </Text>
            <Text style={styles.modalsolution}>{item.solution}</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closetext}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    margin: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 136,
    height: 81,
    margin: 5,
  },
  modalname: {
    fontFamily: "Poppins_900Black",
    fontSize: 40,
  },
  modaldisease: {
    marginTop: -10,
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#049A10"
  },
  modalsolution: {
    fontFamily: "Poppins_500Medium",
  },
  textContainer: {
    flex: 2,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalContainer: {
    padding: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#049A10",
    borderRadius: 8,
  },
  closetext: {
    color: "white"
  }
});

export default HistoryCard;
