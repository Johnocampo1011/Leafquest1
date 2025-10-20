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
import { auth, db } from "./firebaseConfig"; //
import { Ionicons } from "@expo/vector-icons";
import PlantStatusBar from "./PlantStatusBar";
import { localImages } from "./localImages";
import { getAuth } from "firebase/auth";  // ✅ import auth
import PlantInfoTabs from "./PlantInfoTab";
import { ImageBackground } from "react-native";




  

export default function PlantlibraryDetailsScreen({ route, navigation }) {
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchPlantDetails = async () => {
    try {
      // 🌍 Fetch from global catalog (shared)
      const docRef = doc(db, "plants", plantId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPlant({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("❌ Plant not found in global library!");
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
    <ImageBackground
    source={require("./assets/leafybg2.jpg")} // 👈 use your own image here
    resizeMode="cover"
    style={styles.background}
  >
    <ScrollView contentContainerStyle={styles.container}>


      <Text style={styles.title}>{plant.name}</Text>

      <Image
        source={
          plant.image && !plant.image.startsWith("http")
            ? localImages[plant.image] || require("./assets/icon.png")
            : { uri: plant.image }
        }
        style={styles.image}
      />

      <PlantInfoTabs plant={plant} />

      {/* Description card */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>🌿 About This Plant</Text>
        <Text style={styles.descriptionText}>
          {plant.description || "No description available."}
        </Text>
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingTop: 50,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0)", // optional translucent white overlay
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
  background: {
  flex: 1,
  width: "100%",
  height: "100%",
},
});
