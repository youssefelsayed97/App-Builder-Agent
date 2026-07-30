import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainMenu from './src/screens/MainMenu';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import HighScoresScreen from './src/screens/HighScoresScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenu} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GameScreen" 
          component={GameScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GameOverScreen" 
          component={GameOverScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HighScoresScreen" 
          component={HighScoresScreen} 
          options={{ 
            title: 'High Scores',
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#00FF00',
            headerTitleStyle: { fontWeight: 'bold' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}