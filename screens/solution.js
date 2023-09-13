import React from "react";
import { View, Text, StyleSheet } from "react-native";
import names from "../assets/data/model_classes.json";

export default function Solution({route, navigation}) {
  const data = route.params.obj;
  var diseaseName = "";
  for(let c in names[data.name][data.class_id]){
    if (names[data.name][data.class_id][c] != '_')
      diseaseName += names[data.name][data.class_id][c];
    else
      diseaseName += ' ';
  }
  console.log(route);
  return (
    <View style={styles.container}>
      <View style={styles.card1}>
        <Text style={styles.title}>DISEASE</Text>
        <Text style={styles.name}>NAME</Text>
        <Text style={styles.info}>{diseaseName}</Text>
      </View>
      <View style={styles.card2}>
        <Text style={styles.title}>SOLUTION</Text>
        <Text style={styles.name}>NAME</Text>
        <Text style={styles.info}>INFO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingTop: "4%",
  },
  card1: {
    backgroundColor: "#F2F2F2",
    marginBottom: "40%",
    padding: "4%",
    marginTop: "12%",
  },
  card2: {
    backgroundColor: "#F2F2F2",
    padding: "4%",
  },
  title: {
    fontSize: 64,
    fontFamily: "Poppins_900Black",
    color: "#049A10",
  },
  name: {
    marginTop: "-8%",
    fontSize: 45,
    fontFamily: "Poppins_600SemiBold",
  },
  info: {
    marginTop: "-2%",
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
  },
});
