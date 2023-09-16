import React from "react";
import { View, Text, StyleSheet,SafeAreaView, ScrollView   } from "react-native";
import names from "../assets/data/model_classes.json";

export default function Solution({route, navigation}) {
  const data = route.params.obj;
  var diseaseName = names[data.name][data.class_id];

  console.log(route);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card1}>
        <Text style={styles.title}>DISEASE</Text>
        <Text style={styles.name}>{diseaseName}</Text>
      </View>
        <View style={styles.card2}>
          <Text style={styles.title}>SOLUTION</Text>
          <Text style={styles.name}>METHODS</Text>
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
    marginBottom: "5%",
    padding: "4%",
    marginTop: "5%",
  },
  card2: {
    backgroundColor: "#F2F2F2",
    padding: "4%",
    marginBottom : "90%"
  },
  title: {
    fontSize: 64,
    fontFamily: "Poppins_900Black",
    color: "#049A10",
  },
  name: {
    marginTop: "-10%",
    fontSize: 45,
    fontFamily: "Poppins_600SemiBold",
  },
  info: {
    marginTop: "2%",
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
  },
});
