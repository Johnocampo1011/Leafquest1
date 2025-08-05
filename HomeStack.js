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
    LibraryScreen,        
    
   
} from './Homescreen'; // Adjust the path as necessary

// Import the standard camera screen (default export)
import CameraScreen from './CameraScreen';


// Import plant detail screens
import 
{
    PothosDetail,
    PhilodenronDetail,
    PrayerPlantDetail,
    BirdNestFernDetail,
    ZzPlantDetail
}from './plantdetails'; // Adjust the path as necessary

import { PothosLibrary,PhilodendronLibrary } from './libraryLowLight';  

// --- Navigator Setups ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Stack Navigator specifically for the "Home" Tab ---
// This allows navigating from Home grid to Plant Detail
function HomeStackNavigator() {
  return (
    <Stack.Navigator>

  <Stack.Screen name="Homefeed" 
    component={HomeScreenContent} 
    options={{ headerShown: false }}
  />

  <Stack.Screen name="Pothos" 
    component={PothosDetail} 
    options={{ headerShown: false }}
  />

  <Stack.Screen name="Philodenron" 
    component={PhilodenronDetail} 
    options={{ headerShown: false }}
  />

  <Stack.Screen name="PrayerPlant" 
    component={PrayerPlantDetail} 
    options={{ headerShown: false }}
  />

  <Stack.Screen name="BirdNestFern" 
    component={BirdNestFernDetail} 
    options={{ headerShown: false }}
  />

<Stack.Screen name="ZzPlant" 
    component={ZzPlantDetail} 
    options={{ headerShown: false }}
  />



</Stack.Navigator>
  );
}

export function PlantLibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PothosLibrary"
        component={PothosLibrary}
        
      />
      <Stack.Screen
        name="PhilodenronLibrary" // Keep the name matching with the component
        component={PhilodendronLibrary}
        options={{ title: 'Philodendron Details' }}
/>

    </Stack.Navigator>
  );
}




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
          tabBarInactiveTintColor: 'gray',
          // Add styles previously defined in bottomStyles here if needed
          // tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, /* ... */ },
          // tabBarLabelStyle: { fontSize: 12, marginBottom: 4, /* ... */ },
        })}
    >
      {/* Tab 1: Home */}
      <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
      />
      {/* Tab 2: Videos - Using VideosStackNavigator from Homescreen.js */ }
      <Tab.Screen
          name="Videos"
          component={VideosStackNavigator} // *** Use imported component ***
      />
      {/* Tab 3: Camera */ }
      <Tab.Screen
          name="Camera"
          component={CameraScreen} // *** Use imported component from CameraScreen.js ***
      />
      {/* Tab 4: Library - Using LibraryScreen from Homescreen.js */ }
      <Tab.Screen
          name="Library"
          component={LibraryScreen} // *** Use imported component ***
      />
      
    </Tab.Navigator>
  );
}