import React, { useState, useRef } from "react";
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import splash1 from "../assets/images/splash1.png";
import splash2 from "../assets/images/splash2.png";
import splash3 from "../assets/images/splash3.png";

const DATA = [
  {
    image: splash1,
    title: "Plant Care",
    content: "Simplify disease diagnosis and crop protection with easy access to plant health records.",
    width: 280,
    height: 280,
  },
  {
    image: splash2,
    title: "Scan & Detect",
    content: "Use AI for quick plant disease detection, ensuring healthier and more abundant harvests.",
    width: 280,
    height: 280,
  },
  {
    image: splash3,
    title: "Crop Precision",
    content: "Customized solutions for plant diseases, optimizing crop yields with precision and personalized care.",
    width: 350,
    height: 280,
  },
];

export default function SplashCarousel({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={[styles.image, { width: item.width, height: item.height }]} source={item.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </View>
  );

  const handleArrowPress = () => {
    if (activeSlide < DATA.length - 1) {
      carouselRef.current.snapToNext();
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
      <Carousel
        ref={carouselRef}
        data={DATA}
        renderItem={renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View style={styles.bottom}>
        <Pagination
          dotsLength={DATA.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          inactiveDotStyle={styles.inactivePaginationDot}
          inactiveDotOpacity={0.5}
          inactiveDotScale={1}
          dotStyle={styles.dot}
        />
        <TouchableOpacity onPress={handleArrowPress}>
          <Image 
            style={styles.arrow}
            source={require("../assets/images/arrow.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "15%",
    paddingBottom: 50,
  },
  card: {
    alignItems: "center",
  },
  textContainer: {
    textAlign: "left",
    paddingHorizontal: 10,
  },
  title: {
    marginTop: "10%",
    fontSize: 48,
    fontFamily: "Poppins_700Bold",
    color: "#049A10",
  },
  content: {
    textAlign: "left",
    paddingTop: 10,
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
  },
  image: {
    marginTop: 50,
  },
  logo: {
    height: 85,
    width: 135,
  },
  dot: {
    backgroundColor: "#049A10",
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  arrow: {
    width: 50,
    height: 50,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
});
