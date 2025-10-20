import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 👈 Make sure you have this import

export default function PlantInfoTabs({ plant }) {
  const [activeTab, setActiveTab] = useState("Watering");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Watering":
        return (
          <Text style={styles.description}>
            {plant.Watering || "No watering information available."}
          </Text>
        );
      case "Lighting":
        return (
          <Text style={styles.description}>
            {plant.Lighting || "No lighting information available."}
          </Text>
        );
      case "Soil":
        return (
          <Text style={styles.description}>
            {plant.Soil || "No soil information available."}
          </Text>
        );
      case "Care Difficulty":
        return (
          <Text style={styles.description}>
            {plant.CareDifficulty || "No care difficulty info available."}
          </Text>
        );
      default:
        return null;
    }
  };

  // 👇 Define icons for each tab
  const tabData = [
    { name: "Watering", icon: "water-outline" },
    { name: "Lighting", icon: "sunny-outline" },
    { name: "Soil", icon: "leaf-outline" },
    { name: "Care Difficulty", icon: "barbell-outline" },
  ];

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabRow}>
        {tabData.map(({ name, icon }) => (
          <TouchableOpacity
            key={name}
            style={[
              styles.tabButton,
              activeTab === name && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(name)}
          >
            <Ionicons
              name={icon}
              size={24}
              color={activeTab === name ? "#fff" : "#307a01ff"}
              style={styles.icon}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === name && styles.activeTabText,
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabContent}>{renderTabContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tabButton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 13,
    borderRadius: 10,
    backgroundColor: "#ecececff",
    flexDirection: "column",
  },
  activeTabButton: {
    backgroundColor: "#3c9b00ff",
  },
  icon: {
    marginBottom: 4,
  },
  tabText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 12,
  },
  activeTabText: {
    color: "#fff",
  },
  tabContent: {
    marginTop: 8,
    paddingHorizontal: 5,
  },
  description: {
    color: "#5c5c5cff",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "justify",
  },
});
