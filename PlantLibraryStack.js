import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LibraryScreen } from './Homescreen';
import {
  PothosLibrary,
  PhilodendronLibrary, // fix spelling
} from './libraryLowLight';

const Stack = createNativeStackNavigator();



// DI PA NAGANA TO BE UPDATED

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