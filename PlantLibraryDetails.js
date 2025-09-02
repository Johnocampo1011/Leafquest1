import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { localImages } from "./localImages";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export function LibraryScreen({ navigation }) {
  const [plants, setPlants] = useState([]);
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const plantsCollection = collection(db, "plants");
      const snapshot = await getDocs(plantsCollection);
      const plantList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlants(plantList);
    } catch (error) {
      console.error("Error refreshing plants:", error);
      Alert.alert("Error", "Couldn't refresh plants. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch all available plants from Firestore
  useEffect(() => {
    const plantsCollection = collection(db, "plants");
    const unsubscribe = onSnapshot(plantsCollection, (snapshot) => {
      const plantList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlants(plantList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch user's plants
  useEffect(() => {
    const fetchUserPlants = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userPlantsQuery = query(
        collection(db, "userPlants"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(userPlantsQuery);
      const userPlantsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        plantId: doc.data().plantId,
      }));

      setMyPlants(userPlantsList);
    };

    fetchUserPlants();
  }, []);

  // Add plant to user's collection
  const handleAddPlant = async (plantId) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Not Logged In", "Please log in to add plants.");
      return;
    }

    try {
      const newDocRef = doc(collection(db, "userPlants"));
      await setDoc(newDocRef, {
        userId: user.uid,
        plantId,
        addedAt: new Date().toISOString(),
      });

      setMyPlants((prev) => [...prev, { id: newDocRef.id, plantId }]);

      Alert.alert("Success", "Plant added to your collection!");
    } catch (error) {
      console.error("Error adding plant:", error);
      Alert.alert("Error", "Couldn't add plant. Please try again.");
    }
  };

  // Remove plant from user's collection
  const handleRemovePlant = async (plantId) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Not Logged In", "Please log in to remove plants.");
      return;
    }

    try {
      const plantToRemove = myPlants.find((p) => p.plantId === plantId);
      if (!plantToRemove) return;

      await deleteDoc(doc(db, "userPlants", plantToRemove.id));

      setMyPlants((prev) => prev.filter((p) => p.plantId !== plantId));

      Alert.alert("Removed", "Plant removed from your collection!");
    } catch (error) {
      console.error("Error removing plant:", error);
      Alert.alert("Error", "Couldn't remove plant. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={homeStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#2E481E" />
        <Text>Loading plants...</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <ScrollView
        contentContainerStyle={homeStyles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4CAF50"]}
            tintColor="#4CAF50"
            title="Refreshing plants..."
          />
        }
      >
        <View style={homeStyles.gridContainer}>
          {plants.map((item) => {
            const isAdded = myPlants.some((p) => p.plantId === item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={homeStyles.gridItem}
                onPress={() =>
                  navigation.navigate("PlantDetails", { plantId: item.id }) // ✅ FIXED
                }
              >
                {item.image && (
                  <Image
                    source={
                      item.image.startsWith("http")
                        ? { uri: item.image }
                        : localImages[item.image]
                    }
                    style={homeStyles.image}
                  />
                )}
                <Text style={homeStyles.label}>{item.name}</Text>

                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    isAdded
                      ? handleRemovePlant(item.id)
                      : handleAddPlant(item.id);
                  }}
                  style={{
                    marginTop: 8,
                    backgroundColor: isAdded ? "#E53935" : "#4CAF50",
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {isAdded ? "Remove" : "Add Plant"}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98B486',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  gridItem: {
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

