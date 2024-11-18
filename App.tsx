/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home';
import SettingsScreen from './src/screens/Setting';
import Icon from 'react-native-vector-icons/EvilIcons';
import { ThemeProvider, useTheme } from './src/components/theme/ThemeContext';

const Tab = createBottomTabNavigator();

const AppContainer = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: theme.background },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let colors = focused ? 'green' : 'gray';
            if (route.name === 'Home') {
              iconName = focused
                ? 'archive'
                : 'archive'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'gear' : 'gear';
            }
            return <Icon name={iconName} size={26} color={colors} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{
          headerStyle: {
            backgroundColor: theme.background
          },
          headerTintColor: theme.text,
          tabBarBadge: '1',
        }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{
          headerStyle: {
            backgroundColor: theme.background
          },
          headerTintColor: theme.text,
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}

export default App;
