import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const HistoryCard = ({ item }) => {
  return (
    <ScrollView>
      <TouchableOpacity>
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
  textContainer: {
    flex: 2,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default HistoryCard;
