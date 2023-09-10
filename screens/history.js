import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import HistoryCard from '../components/historyCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';

export default function History(navigation){
    const isLoading = false;
    const error = false;

    return (
    <SafeAreaView>
        <View>      
        {isLoading ?(
            <ActivityIndicator size="large" colors='#312651' />
            ): error ? (
            <Text>Something went wrong</Text>
            ):(<FlatList
            data={[1,2,3,4]}
            renderItem={({item})=>(
                <HistoryCard 
                item={item}
                />
                )}
            keyExtractor={item =>item?.job_id}
            />)}
        </View>
    </SafeAreaView>
    );
};