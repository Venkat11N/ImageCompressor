import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CompressionScreen from './src/screens/CompressionScreen';
import ResultScreen from './src/screens/ResultScreen';
import { CompressionResult, FileType } from './src/types';

export type RootStackParamList = {
  Home: undefined;
  Compression: { fileUri: string; fileType: FileType };
  Result: { result: CompressionResult };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'File Compressor' }}
        />
        <Stack.Screen
          name="Compression"
          component={CompressionScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Result' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}