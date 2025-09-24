import React, { useEffect, useState } from "react"; 
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, RefreshControl, } from "react-native";
 import { localImages } from "./localImages"; 
 import { getAuth } from "firebase/auth"; 
 import { collection, onSnapshot, setDoc, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore"; 
 import { auth,db } from "./firebaseConfig";

export function LibraryScreen({ navigation }) {
  const [catalog, setCatalog] = useState([]);
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
      setCatalog(plantList);
    } catch (error) {
      console.error("Error refreshing plants:", error);
      Alert.alert("Error", "Couldn't refresh plants. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  // Get global plant catalog
  useEffect(() => {
    const catalogRef = collection(db, "plants");
    const unsubCatalog = onSnapshot(catalogRef, (snapshot) => {
      setCatalog(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubCatalog();
  }, []);

  // Get user's plants
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userPlantsRef = collection(db, "users", user.uid, "plants");
    const unsubUserPlants = onSnapshot(userPlantsRef, (snapshot) => {
      setMyPlants(snapshot.docs.map((doc) => doc.id)); // store IDs only
      setLoading(false);
    });

    return () => unsubUserPlants();
  }, []);

  // Add plant
  const handleAddPlant = async (plantId) => {
    const user = getAuth().currentUser;
    if (!user) {
      Alert.alert("Not Logged In", "Please log in to add plants.");
      return;
    }

    try {
      const plantRef = doc(db, "plants", plantId);
      const plantSnap = await getDoc(plantRef);

      if (!plantSnap.exists()) {
        Alert.alert("Error", "Plant not found in catalog.");
        return;
      }

      const userPlantRef = doc(db, "users", user.uid, "plants", plantId);
      await setDoc(userPlantRef, {
        ...plantSnap.data(),
        addedAt: new Date(),
      });

      Alert.alert("Success", "Plant has been added to your collection!");
    } catch (error) {
      console.error("Error adding plant:", error);
      Alert.alert("Error", "Couldn't add the plant. Please try again.");
    }
  };

  // Remove plant
  const handleRemovePlant = async (plantId) => {
    const user = getAuth().currentUser;
    if (!user) {
      Alert.alert("Not Logged In", "Please log in to remove plants.");
      return;
    }

    try {
      const userPlantRef = doc(db, "users", user.uid, "plants", plantId);
      await deleteDoc(userPlantRef);

      Alert.alert("Removed", "Plant has been removed from your collection.");
    } catch (error) {
      console.error("Error removing plant:", error);
      Alert.alert("Error", "Couldn't remove the plant. Please try again.");
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
          {catalog.map((item) => {
            const isAdded = myPlants.includes(item.id); // ✅ fixed check

            return (
              <TouchableOpacity
                key={item.id}
                style={homeStyles.gridItem}
                onPress={() =>
                  navigation.navigate("PlantDetails", { plantId: item.id })
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

