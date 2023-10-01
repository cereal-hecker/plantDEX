import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HistoryCard = ({ item }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [image,setImage] = useState("")
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const itemDate = new Date(item.date * 1000);

  useEffect(() => {
    if (item.photo) {
      const base64Icon = `${item.photo}`;
      setImage("data:image/png;base64," + base64Icon);
    }
  }, [item.photo]);

  return (
    <ScrollView>
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.card}>
          {image&&(<Image
            source={{ uri: "data:image/png;base64," + item.photo }}
            style={styles.image}
          />)}
          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              {item.cropName} - {item.diseaseName} - {itemDate.toString()}
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
            <Text style={styles.modalname}>{item.cropName}</Text>
            <Text style={styles.modaldisease}>{item.diseaseName}</Text>
            <Image
            source={{ uri: image }}
            style={styles.modalImage}
          />
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
    borderRadius: 8,
    width: 136,
    height: 81,
    margin: 5,
  },
  modalImage: {
    flex: 1,
    resizeMode:'stretch',
    borderRadius: 8,
    width: windowWidth*0.7,
    height: windowHeight*0.2,
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
    color: "#049A10",
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
    color: "white",
  },
});

export default HistoryCard;
