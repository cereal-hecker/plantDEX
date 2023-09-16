import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DropdownMenu = ({ options, onSelect, crop }) => {
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
        <Text style={styles.selectText}>{crop}</Text>
      </TouchableOpacity>

      {isVisible && (
        <View
          style={[
            styles.menuContainer,
            { maxHeight: windowHeight * 0.5 },
          ]}
          pointerEvents='auto'
        >
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
    width: windowWidth * 0.35,
  },
  button: {
    paddingVertical: windowHeight * 0.01,
    backgroundColor: '#049810',
    borderRadius: windowHeight * 0.01,
    justifyContent: 'center', 
    alignItems: 'center',
    height: windowHeight * 0.05,
    width: windowWidth * 0.35,
  },
  menuContainer: {
    borderWidth: windowWidth * 0.0025,
    borderColor: '#ddd',
    borderRadius: windowHeight * 0.01,
    backgroundColor: 'white',
    zIndex: 1,
  },
  item: {
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.01,
    borderBottomWidth: windowWidth * 0.0025,
    borderBottomColor: '#ddd',
  },
  selectText: {
    fontFamily: 'Poppins_500Medium',
    color: 'white',
    textAlign: 'center',
  },
});

export default DropdownMenu;