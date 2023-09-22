import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import names from "../assets/data/model_classes.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Solution({ route, navigation }) {
  var data = route.params.obj;
  const [isloading, setLoader] = useState(false);
  const [solution, setSolution] = useState("");
  var diseaseName = "";
  for (let c in names[data.name][data.class_id]) {
    if (names[data.name][data.class_id][c] !== "_")
      diseaseName += names[data.name][data.class_id][c];
    else diseaseName += " ";
  }
  const handleGPT = async () => {
    setLoader(true);
    const header = { "Content-Type": "application/json" };
    const obj = await fetch("http://localhost:8000/solution/", {
      method: "POST",
      body: JSON.stringify({
        cropName: data.name,
        diseaseName: diseaseName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const answer = await obj.json();
    setSolution(answer["solution"]);
    setLoader(false);
  };
  useEffect(() => {
    handleGPT();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card1}>
        <Text style={styles.title}>DISEASE</Text>
        <Text style={styles.name}>{diseaseName}</Text>
      </View>
      <View style={styles.card2}>
        <Text style={styles.title}>SOLUTION</Text>
        {isloading ? (
          <ActivityIndicator size="large" colors={""} />
        ) : (
          <ScrollView style={styles.solution}>
            <Text style={styles.info}>{solution}</Text>
          </ScrollView>
        )}
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
    marginTop: windowHeight * 0.05,
    marginLeft: windowHeight * 0.05,
  },
  card2: {
    backgroundColor: "#F2F2F2",
    marginTop: windowHeight * 0.01,
    marginLeft: windowHeight * 0.05,
  },
  title: {
    fontSize: windowWidth * 0.12,
    fontFamily: "Poppins_900Black",
    color: "#049A10",
  },
  name: {
    marginTop: windowHeight * -0.03,
    fontSize: windowWidth * 0.095,
    fontFamily: "Poppins_600SemiBold",
  },
  info: {
    fontFamily: "Poppins_500Medium",
    fontSize: windowWidth * 0.04,
    marginRight: windowWidth * 0.05,
  },
  solution: {
    height: windowHeight * 0.6,
  },
});
