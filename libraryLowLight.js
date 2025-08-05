import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export function PothosLibrary() {
  const route = useRoute();
  const { plantId } = route.params || {};

  console.log('Received plantId:', plantId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader onMenuPress={() => useNavigation().navigate('Menu')} />
      <ScrollView contentContainerStyle={plntstyles.container}>
        <View style={plntstyles.headerlibrary}>
          <Text style={plntstyles.titlelibrary}>POTHOS</Text>
        </View>
        <View style={plntstyles.content}>
          <Image
            source={require('./assets/pothos.png')}
            style={plntstyles.plantImage}
            resizeMode="contain"
          />
        </View>
        <View style={plntstyles.circlesRow}>
          {[{ icon: 'water', count: 12 }, { icon: 'sunny', count: 8 }, { icon: 'leaf', count: 3 }].map(({ icon, count }, idx) => (
            <TouchableOpacity key={idx} style={plntstyles.circleButton}>
              <Ionicons name={icon} size={24} color="#3a7d44" />
              <View style={plntstyles.badge}>
                <Text style={plntstyles.badgeText}>{count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={plntstyles.detailSectionlibrary}>
          <Text style={plntstyles.sectionTitle}>(Epipremnum aureum)</Text>
          <Text style={plntstyles.paragraph}>
            • Botanical family: Araceae{'\n'}• Origin: Tropical rainforests
          </Text>
          <Text style={[plntstyles.paragraph, { marginTop: 20 }]}>
            <Text style={{ fontWeight: 'bold' }}>Size:</Text> Vines 6 to 10 feet long{'\n'}
            <Text style={{ fontWeight: 'bold' }}>Water:</Text> Allow the top inch of soil to dry out between watering.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>Fertilizer:</Text> Light feeders, use a balanced liquid fertilizer every 1 to 3 months.{'\n\n'}
            One of the easiest houseplants to grow. This tropical vine comes in a variety of foliage colors and patterns. Pothos can be trimmed and kept compact, allowed to trail from hanging baskets, or trained up vertical supports.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// DI PA NAGANA TO BE UPDATED

export function PhilodendronLibrary() {
  const route = useRoute();
  const { plantId } = route.params || {};

  console.log('Received plantId:', plantId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader onMenuPress={() => useNavigation().navigate('Menu')} />
      <ScrollView style={plntstyles.container}>
        <View style={plntstyles.headerlibrary}>
          <Text style={plntstyles.titlelibrary}>PHILODENDRON</Text>
        </View>
        <View style={plntstyles.content}>
          <Image
            source={require('./assets/PHILODENDRON.png')}
            style={plntstyles.plantImage}
            resizeMode="contain"
          />
        </View>
        <View style={plntstyles.circlesRow}>
          {[{ icon: 'water', count: 12 }, { icon: 'sunny', count: 8 }, { icon: 'leaf', count: 3 }].map(({ icon, count }, idx) => (
            <TouchableOpacity key={idx} style={plntstyles.circleButton}>
              <Ionicons name={icon} size={24} color="#3a7d44" />
              <View style={plntstyles.badge}>
                <Text style={plntstyles.badgeText}>{count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={plntstyles.detailSectionlibrary}>
          <Text style={plntstyles.sectionTitle}>(Philodendron spp.)</Text>
          <Text style={plntstyles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}>Size:</Text> Vines to 8 feet long{'\n'}
            <Text style={{ fontWeight: 'bold' }}>Water:</Text> Prefers evenly moist soil, but not soggy. Water if top inch of soil is dry.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>Fertilizer:</Text> Apply a water-soluble houseplant fertilizer from spring through fall.
          </Text>
          <Text style={[plntstyles.paragraph, { marginTop: 20 }]}>
            Another very easy-to-grow houseplant, similar to pothos. Tolerates low light, but grows faster in medium to bright light. Foliage comes in many shapes and colors. Can also grow outdoors in mild climates.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
