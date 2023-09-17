import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import names from "../assets/data/model_classes.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Solution({ route, navigation }) {
  const data = route.params.obj;
  var diseaseName = "";
  for (let c in names[data.name][data.class_id]) {
    if (names[data.name][data.class_id][c] !== "_")
      diseaseName += names[data.name][data.class_id][c];
    else diseaseName += " ";
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card1}>
        <Text style={styles.title}>DISEASE</Text>
        <Text style={styles.name}>{diseaseName}</Text>
      </View>
      <View style={styles.card2}>
        <Text style={styles.title}>SOLUTION</Text>
        <ScrollView>
          <Text style={styles.info}>{data.solution}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex",
    alignItems: "stretch",
  },
  card1: {
    backgroundColor: "#F2F2F2",
    marginBottom: "4%",
    marginTop: windowHeight*0.05,
    marginLeft: windowHeight*0.05,
  },
  card2: {
    backgroundColor: "#F2F2F2",
    marginTop: windowHeight*0.01,
    marginLeft: windowHeight*0.05,
  },
  title: {
    fontSize: windowWidth * 0.12,
    fontFamily: "Poppins_900Black",
    color: "#049A10",
  },
  name: {
    marginTop: windowHeight*-0.03,
    fontSize: windowWidth * 0.095,
    fontFamily: "Poppins_600SemiBold",
  },
  info: {
    fontFamily: "Poppins_500Medium",
    fontSize: windowWidth * 0.04,
    marginRight: windowWidth * 0.05,
  },
});
