// PlantStatusBar.js
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

export default function PlantStatusBar({ initialValues }) {
  const [waterLevel, setWaterLevel] = useState(initialValues?.water || 0.3);
  const [lightLevel, setLightLevel] = useState(initialValues?.light || 0.5);
  const [fertilizerLevel, setFertilizerLevel] = useState(initialValues?.fertilizer || 0.2);

  const increase = (type) => {
    if (type === 'water') setWaterLevel((prev) => Math.min(prev + 0.1, 1));
    if (type === 'light') setLightLevel((prev) => Math.min(prev + 0.1, 1));
    if (type === 'fertilizer') setFertilizerLevel((prev) => Math.min(prev + 0.1, 1));
  };

  const getColor = (type) => {
    switch (type) {
      case 'water': return '#1E90FF'; // DodgerBlue
      case 'light': return '#FFD700'; // Gold
      case 'fertilizer': return '#32CD32'; // LimeGreen
      default: return '#3a7d44';
    }
  };

  const bar = (icon, value, type) => {
    const color = getColor(type);
    return (
      <View key={type} style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => increase(type)}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: color,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${color}20`, // light background
          }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </TouchableOpacity>
        <Progress.Bar
          progress={value}
          width={60}
          height={8}
          color={color}
          borderColor="#ccc"
          style={{ marginTop: 6 }}
        />
      </View>
    );
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
      {bar('water', waterLevel, 'water')}
      {bar('sunny', lightLevel, 'light')}
      {bar('leaf', fertilizerLevel, 'fertilizer')}
    </View>
  );
}
