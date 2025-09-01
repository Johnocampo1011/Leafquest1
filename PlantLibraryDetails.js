import React, { useEffect, useState } from "react";
import {View,Text,Image,ScrollView,TouchableOpacity,ActivityIndicator,Alert,StyleSheet,} from "react-native";
import { localImages } from "./localImages";
import {collection,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

//Nedd pa ayusin ung sa pag click ng plants to go to details page

export function LibraryScreen({ navigation }) {
  const [plants, setPlants] = useState([]);
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kunin list of Plants sa database
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

  // my plants list
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
        plantId: plantId,
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
      <ScrollView contentContainerStyle={homeStyles.scrollContent}>

        <View style={homeStyles.gridContainer}>
          {plants.map((item) => {
            const isAdded = myPlants.some((p) => p.plantId === item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={homeStyles.gridItem}
                onPress={() => navigation.navigate("PlantDetails", { plant: item })}
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
                    e.stopPropagation(); // Prevent triggering plant detail navigation
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

export function PlantLibraryDetailsScreen({ route, navigation }) {
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

    {plant.image && (
        <Image
          source={
            plant.image.startsWith("http")
              ? { uri: plant.image }
              : localImages[plant.image] // <-- Make sure localImages has this key
          }
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      )}

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
