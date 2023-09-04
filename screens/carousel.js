import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";

import splash1 from "../assets/splash1.png";
import splash2 from "../assets/splash2.png";
import splash3 from "../assets/splash3.png";

const DATA = [
  {
    image: splash1,
    title: "Lorem Ipsum",
    content: "lorem le lorem le ipsum la ipsum la ipsum la",
  },
  {
    image: splash2,
    title: "Lorem Ipsum",
    content: "lorem le lorem le ipsum la ipsum la ipsum la",
  },
  {
    image: splash3,
    title: "Lorem Ipsum",
    content: "lorem le lorem le ipsum la ipsum la ipsum la",
  },
];

const SplashCarousel = () => {
  const renderItem = (data) => (
    <View key={data.image} style={styles.cardContainer}>
        <Image style={styles.image} source={data.image} />
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.content}>{data.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} />
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={DATA}
        // autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 80,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
  },
  content: {
    paddingTop: 10,
    fontSize: 24,
    width: '70%',
    flexWrap: 'wrap',
  },
  image: {
    // resizeMode: 'contain',
    marginTop: 50,
  },
});

export default SplashCarousel;
