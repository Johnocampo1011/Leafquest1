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

  // Resource stock (how many uses remain)
  const [waterStock, setWaterStock] = useState(initialValues?.waterStock ?? 5);
  const [lightStock, setLightStock] = useState(initialValues?.lightStock ?? 5);
  const [fertilizerStock, setFertilizerStock] = useState(initialValues?.fertilizerStock ?? 5);

  const scaleAnims = {
    water: useRef(new Animated.Value(1)).current,
    light: useRef(new Animated.Value(1)).current,
    fertilizer: useRef(new Animated.Value(1)).current,
  };

  const animatePress = (type) => {
    Animated.sequence([
      Animated.timing(scaleAnims[type], { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnims[type], { toValue: 1, duration: 100, useNativeDriver: true }),
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
    if (type === 'water' && waterStock > 0) {
      animatePress(type);
      const newVal = Math.min(waterLevel + 0.1, 1);
      setWaterLevel(newVal);
      setWaterStock((prev) => prev - 1);
      if (newVal === 1) reward();
    }
    if (type === 'light' && lightStock > 0) {
      animatePress(type);
      const newVal = Math.min(lightLevel + 0.1, 1);
      setLightLevel(newVal);
      setLightStock((prev) => prev - 1);
      if (newVal === 1) reward();
    }
    if (type === 'fertilizer' && fertilizerStock > 0) {
      animatePress(type);
      const newVal = Math.min(fertilizerLevel + 0.1, 1);
      setFertilizerLevel(newVal);
      setFertilizerStock((prev) => prev - 1);
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

  const getStock = (type) => {
    if (type === 'water') return waterStock;
    if (type === 'light') return lightStock;
    if (type === 'fertilizer') return fertilizerStock;
    return 0;
  };

  const bar = (icon, value, type, label) => {
    const color = getColor(type);
    const stock = getStock(type);
    const isDisabled = stock <= 0;

    return (
      <View key={type} style={{ alignItems: 'center' }}>
        <Animated.View style={{ transform: [{ scale: scaleAnims[type] }] }}>
          <TouchableOpacity
            onPress={() => increase(type)}
            disabled={isDisabled}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: color,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: `${color}20`,
              opacity: isDisabled ? 0.4 : 1,
            }}
          >
            <Ionicons name={icon} size={24} color={color} />
            {/* Mini stock bubble */}
            <View
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: 'red',
                borderRadius: 10,
                paddingHorizontal: 5,
                paddingVertical: 1,
              }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {stock}
              </Text>
            </View>
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
          animated
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
