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
import { db } from "./firebaseConfig"; // your Firebase setup file
import { Ionicons } from '@expo/vector-icons';
import PlantStatusBar from './PlantStatusBar';



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




// Local images mapping
const localImages = {
  POTHOS: require("./assets/POTHOS.png"),
  aloe: require("./assets/ALOE.png"),
  cactus: require("./assets/CROTON.png"),
};

export default function PlantDetailsScreen({ route }) {
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch plant data from Firestore
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
      <CustomHeader onMenuPress={() => navigation.navigate('Menu')} />
      <Text style={styles.title}>{plant.name}</Text>
      <Image
        source={
          plant.image && !plant.image.startsWith("http")
            ? localImages[plant.image] || require("./assets/icon.png")
            : { uri: plant.image }
        }
        style={styles.image}
      />

     
         <PlantStatusBar
          initialValues={{ water: 0.8, light: 0.8, fertilizer: 0.8 }}
        />

     
      <Text style={styles.description}>
        {plant.description || "No description available."}
      </Text>

     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 40,
    backgroundColor: "#8b1616ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // ✅ Aligns menu to far right
    paddingHorizontal: 30,
    marginTop: 20,
  },
  header: {
    height: 30,
    backgroundColor: 'fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000ff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#202020ff",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 10,
    justifyContent: "left",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});