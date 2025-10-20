import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Animated,
  PanResponder,
  Image,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import PlantStatusBar from "./PlantStatusBar";
import { localImages } from "./localImages";
import PlantInfoTabs from "./PlantInfoTab";


// 🌿 Rotatable image component
const RotatablePlantImage = ({ source }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const rotate = rotation.interpolate({
    inputRange: [-400, 400],
    outputRange: ["-150deg", "150deg"],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        rotation.setValue(gesture.dx);
      },
      onPanResponderRelease: () => {
        Animated.spring(rotation, {
          toValue: 0,
          useNativeDriver: true,
          friction: 4,
          tension: 40,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.imageContainer,
        { transform: [{ rotateY: rotate }] },
      ]}
    >
      <Image source={source} style={styles.image} />
    </Animated.View>
  );
};


// 🌱 Main screen
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
    <ImageBackground
      source={require("./assets/leafybg.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{plant.name}</Text>

        {/* 🌀 Replaced <Image> with the interactive RotatablePlantImage */}
        <RotatablePlantImage
          source={
            plant.image && !plant.image.startsWith("http")
              ? localImages[plant.image] || require("./assets/icon.png")
              : { uri: plant.image }
          }
        />

        <PlantStatusBar plantId={route.params.plantId} />
        <PlantInfoTabs plant={plant} />

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


// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0)",
    alignItems: "center",
    
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    perspective: 1000, // ✅ adds depth for Y-rotation
  },
  image: {
    width: 200,
    height: 200,
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
    elevation: 3,
    shadowColor: "#000",
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
