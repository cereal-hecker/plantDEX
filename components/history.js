import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import HistoryCard from './historyCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';

export default function History( {navigation} ){
    const isLoading = false;
    const error = false;

    return (
        <View style={{paddingBottom: 420, paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
          <Text style={{fontFamily: 'Poppins_900Black', fontSize: 48, paddingLeft: 10, color: "#049A10"}}>History</Text>
          {isLoading ? (
            <ActivityIndicator size="large" colors='#312651' />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={[1, 2, 3, 4]}
              renderItem={({ item }) => (
                <HistoryCard
                  item={item}
                />
              )}
              keyExtractor={item => item?.job_id}
            />
          )}
        </View>
      );
    }