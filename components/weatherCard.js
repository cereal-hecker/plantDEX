import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { weatherAPI } from '../assets/data/api';

export default function WeatherCard() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${latitude},${longitude}&aqi=no`,
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Weather</Text>
        {weatherData ? (
          <>
            <Text style={styles.description}>Location: {weatherData.location.name}</Text>
            <Text style={styles.description}>Temperature: {weatherData.current.temp_c} °C</Text>
          </>
        ) : (
          <Text style={styles.description}>Fetching Weather Data...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    margin: 10,
  },
  textContainer: {
    flex: 2,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});
