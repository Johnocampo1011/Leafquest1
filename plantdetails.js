import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import PlantStatusBar from "./PlantStatusBar";
import { localImages } from "./localImages";

export function CustomHeader({ onMenuPress }) {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }} />
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={30} color="green" />
      </TouchableOpacity>
    </View>
  );
}

  

export default function PlantDetailsScreen({ route, navigation }) {
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const docRef = doc(db, "plants", plantId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlant({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such plant document!");
        }
      } catch (error) {
        console.error("Error fetching plant details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantDetails();
  }, [plantId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading plant details...</Text>
      </View>
    );
  }

  if (!plant) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "red", fontSize: 18 }}>
          Plant details not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomHeader onMenuPress={() => navigation.navigate("Menu")} />

      <Text style={styles.title}>{plant.name}</Text>

      <Image
        source={
          plant.image && !plant.image.startsWith("http")
            ? localImages[plant.image] || require("./assets/icon.png")
            : { uri: plant.image }
        }
        style={styles.image}
      />

      <PlantStatusBar plantId={route.params.plantId} />

      {/* Description card */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>🌿 About This Plant</Text>
        <Text style={styles.descriptionText}>
          {plant.description || "No description available."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 30,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 40,
  },
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E481E",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    width: "100%",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#388E3C",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "justify",
    marginHorizontal: 8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
