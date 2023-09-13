import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';

const DropdownMenu = ({ options, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setIsVisible(false);
        onSelect(item);
      }}
      onPressOut={(e) => e.stopPropagation()}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} pointerEvents='box-none'>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text>Select an item</Text>
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.menuContainer} pointerEvents='auto'>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  menuContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default DropdownMenu;
