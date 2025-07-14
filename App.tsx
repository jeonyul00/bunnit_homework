/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import Tab from './src/navigations/tab';

function App() {
  return (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  );
}

export default App;
