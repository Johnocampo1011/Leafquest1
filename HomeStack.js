// FINAL: Imports components from Homescreen.js and CameraScreen.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import from the revised Homescreen.js
import {
  HomeScreenContent,
  PlantDetailScreen,
  VideosStackNavigator,
  PlantLibraryDetailsScreen,
} from './Homescreen';

import { LibraryScreen } from './PlantLibraryDetails';

// Import the standard camera screen
import CameraScreen from './CameraScreen';

// Import plant detail screens
import PlantDetailsScreen from './PlantDetails';

// --- Create one shared Stack for all stacks in this file ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Home Stack ---
function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homescreen"
        component={HomeScreenContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddPlant" component={PlantLibraryDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlantDetails" component={PlantDetailsScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}

// --- Library Stack ---
function LibraryStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Plant Library"
        component={LibraryScreen}
        options={{ headerShown: true, 
        headerStyle: { backgroundColor: '#2E481E' }, 
        headerTintColor: '#fff', // ✅ text and icon color
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="PlantDetails"
        component={PlantLibraryDetailsScreen}
        options={{ headerShown: true, title: 'PLANT DETAILS', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}


// --- Bottom Tabs ---
export function HomeStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Videos') {
            iconName = focused ? 'videocam' : 'videocam-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      {/* Home Tab */}
      <Tab.Screen name="Home" component={HomeStackNavigator} />

      {/* Videos Tab */}
      <Tab.Screen name="Videos" component={VideosStackNavigator} />

      {/* Camera Tab */}
      <Tab.Screen name="Camera" component={CameraScreen} />

      {/* Library Tab */}
      <Tab.Screen name="Library" component={LibraryStackNavigator} />
    </Tab.Navigator>
  );
}
