import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    color: '#333',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
}
