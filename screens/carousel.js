import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import './translations';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const splash1 = require("../assets/images/splash1.png");
const splash2 = require("../assets/images/splash2.png");
const splash3 = require("../assets/images/splash3.png");

export default function SplashCarousel({ navigation }) {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        style={[styles.image, { width: item.width, height: item.height }]}
        source={item.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </View>
  );

  const DATA = [
    {
      image: splash1,
      title: t("Plant Care"),
      content:
        t("Simplify disease diagnosis and crop protection with easy access to plant health records."),
      width: 0.8 * windowWidth,
      height: 0.8 * windowWidth,
    },
    {
      image: splash2,
      title: t("Scan & Detect"),
      content:
        t("Use AI for quick plant disease detection, ensuring healthier and more abundant harvests."),
      width: 0.8 * windowWidth,
      height: 0.8 * windowWidth,
    },
    {
      image: splash3,
      title: t("Crop Precision"),
      content:
        t("Customized solutions for plant diseases, optimizing crop yields with precision and personalized care."),
      width: 1 * windowWidth,
      height: 0.8 * windowWidth,
    },
  ];

  const handleArrowPress = () => {
    if (activeSlide < DATA.length - 1) {
      carouselRef.current.snapToNext();
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.skipText}>{t("Skip")}</Text>
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
      <Carousel
        ref={carouselRef}
        data={DATA}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
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
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={handleArrowPress}
        >
          <Image
            style={styles.arrow}
            source={require("../assets/images/arrow.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: windowHeight * 0.08,
  },
  card: {
    alignItems: "center",
  },
  textContainer: {
    textAlign: "left",
    paddingHorizontal: windowWidth * 0.08,
  },
  title: {
    marginTop: windowHeight * 0.02,
    fontSize: windowWidth * 0.11,
    fontFamily: "Poppins_700Bold",
    color: "#049A10",
  },
  content: {
    textAlign: "left",
    paddingTop: windowHeight * 0.02,
    fontSize: windowWidth * 0.05,
    fontFamily: "Poppins_500Medium",
  },
  image: {
    marginTop: "10%",
  },
  logo: {
    height: 80,
    width: 135,
  },
  dot: {
    backgroundColor: "#049A10",
    width: windowWidth * 0.02,
    height: windowWidth * 0.02,
    borderRadius: windowWidth * 0.02,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: windowWidth * 0.05,
    paddingBottom: windowHeight * 0.03,
  },
  paginationContainer: {
    marginEnd: windowWidth * 0.45,
  },
  arrowContainer: {
    marginRight: windowWidth * 0.05,
  },
  arrow: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
  },
  skipButton: {
    position: 'absolute',
    top: windowHeight * 0.05,  // Adjust as needed
    right: windowWidth * 0.05, // Adjust as needed
    padding: 10,  // Adjust as needed
    zIndex: 1, // Ensure the skip button is above other elements
  },
  skipText: {
    fontSize: 16, // Adjust as needed
    color: '#049A10', // Adjust as needed
  },
});
