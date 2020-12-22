import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './Screens/LoginScreen'

export default function App() {
  return (
    <View style={styles.screen}>
      <LoginPage/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  }
});
