import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

export default function PlantStatusBar({ initialValues }) {
  const [waterLevel, setWaterLevel] = useState(initialValues?.water || 0.3);
  const [lightLevel, setLightLevel] = useState(initialValues?.light || 0.5);
  const [fertilizerLevel, setFertilizerLevel] = useState(initialValues?.fertilizer || 0.2);
  const [plantLevel, setPlantLevel] = useState(1);
  const [points, setPoints] = useState(0);

  // Individual scale animations
  const scaleAnims = {
    water: useRef(new Animated.Value(1)).current,
    light: useRef(new Animated.Value(1)).current,
    fertilizer: useRef(new Animated.Value(1)).current,
  };

  const animatePress = (type) => {
    Animated.sequence([
      Animated.timing(scaleAnims[type], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[type], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const reward = () => {
    setPoints((prev) => {
      const newPoints = prev + 10;
      if (newPoints >= 30) {
        setPlantLevel((level) => level + 1);
        setWaterLevel(0);
        setLightLevel(0);
        setFertilizerLevel(0);
        return 0;
      }
      return newPoints;
    });
  };

  const increase = (type) => {
    animatePress(type);
    if (type === 'water') {
      const newVal = Math.min(waterLevel + 0.1, 1);
      setWaterLevel(newVal);
      if (newVal === 1) reward();
    }
    if (type === 'light') {
      const newVal = Math.min(lightLevel + 0.1, 1);
      setLightLevel(newVal);
      if (newVal === 1) reward();
    }
    if (type === 'fertilizer') {
      const newVal = Math.min(fertilizerLevel + 0.1, 1);
      setFertilizerLevel(newVal);
      if (newVal === 1) reward();
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'water': return '#004a94ff';
      case 'light': return '#e2c000ff';
      case 'fertilizer': return '#1d9b1dff';
      default: return '#3a7d44';
    }
  };

  const bar = (icon, value, type, label) => {
    const color = getColor(type);
    return (
      <View key={type} style={{ alignItems: 'center' }}>
        <Animated.View style={{ transform: [{ scale: scaleAnims[type] }] }}>
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
              backgroundColor: `${color}20`,
            }}
          >
            <Ionicons name={icon} size={24} color={color} />
          </TouchableOpacity>
        </Animated.View>

        <Text style={{ fontSize: 12, marginTop: 4 }}>{label}</Text>

        <Progress.Bar
          progress={value}
          width={70}
          height={8}
          color={color}
          borderColor="#ccc"
          style={{ marginTop: 6 }}
          animated={true}
          animationType="spring"
        />
      </View>
    );
  };

  return (
    <View style={{ alignItems: 'center', marginBottom: 30 }}>
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Plant Level: {plantLevel}</Text>
        <Text style={{ color: 'green' }}>Points: {points}/30</Text>
        {points === 0 && (
          <Text style={{ color: '#4CAF50', fontStyle: 'italic' }}>
            🌱 Leveled up!
          </Text>
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        {bar('water', waterLevel, 'water', 'Water')}
        {bar('sunny', lightLevel, 'light', 'Sunlight')}
        {bar('leaf', fertilizerLevel, 'fertilizer', 'Fertilizer')}
      </View>
    </View>
  );
}
