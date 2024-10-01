// Fallback.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Fallback = () => {
  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>No Tasks Available</Text>
    </View>
  );
};

export default Fallback;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#1e90ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
