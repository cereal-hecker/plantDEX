import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HistoryCard = () => {
    return (
        <View style={styles.card}>
          <Image source={require("../assets/images/logo.png")} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Diesease</Text>
            <Text style={styles.description}>Lorem ipsum loda lasan eidbcwijbxijwdbcihwbdhbs</Text>
          </View>
        </View>
      );
    };
    
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
      image: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
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

export default HistoryCard