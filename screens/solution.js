import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Solution() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Solution Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});