import { NavigationContainer } from '@react-navigation/native';
import Tab from '@src/navigations/tab';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
