import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

function PlantDetailsScreen({ route, navigation }) {
  const { label, Lighting, Soil, Watering, CareDifficulty, Description = "", image } = route.params || {};

  const [activeTab, setActiveTab] = useState("Care Difficulty"); // default tab

  //Custom Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Plant Details',
      headerStyle: { backgroundColor: '#2E481E' },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'monospace',
        fontSize: 22,
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  // content to show per tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Watering":
        return <Text style={styles.description}>{Watering}</Text>;
      case "Lighting":
        return <Text style={styles.description}>{Lighting}</Text>;
      case "Soil":
        return <Text style={styles.description}>{Soil}</Text>;
      case "Care Difficulty":
        return <Text style={styles.description}>{CareDifficulty}</Text>;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.label}>{label}</Text>

        {/* Description Box */}
        <View style={styles.descriptionBox}>
          <Text style={styles.bold}>Description:</Text>
          <Text style={styles.description}>{Description}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["Care Difficulty","Watering", "Lighting", "Soil" ].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {renderTabContent()}
        </View>
      </View>
    </ScrollView>
  );
}

export default PlantDetailsScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionBox: {
    backgroundColor: '#cfe8b8',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2E481E',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    fontFamily: 'sans-serif',
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#d9efcb',
    borderRadius: 10,
    paddingVertical: 8,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#2E481E',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContent: {
    marginTop: 15,
    backgroundColor: '#f0f8ea',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E481E',
  },
});
