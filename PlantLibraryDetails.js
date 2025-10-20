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
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { localImages } from "./localImages";
import { getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export function LibraryScreen({ navigation }) {
  const [catalog, setCatalog] = useState([]);
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter + Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const subCategories = {
    Lighting: ["Low Light", "Medium Light", "Bright Light"],
    "Care Difficulty": ["Easy", "Moderate", "Hard"],
    "Type of Plant": ["Indoor", "Outdoor", "Succulent", "Flowering"],
  };

  const lightingKeywords = {
    "Low Light": ["low", "shade"],
    "Medium Light": ["medium", "partial"],
    "Bright Light": ["bright", "sun"],
  };

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
      setLoading(false);
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

  // Apply search + filter
  const filteredItems = catalog.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (selectedFilter !== "All") {
      if (subCategories["Lighting"].includes(selectedFilter)) {
        const keywords = lightingKeywords[selectedFilter] || [];
        matchesFilter = item.Lighting
          ? keywords.some((kw) =>
              item.Lighting.toLowerCase().includes(kw.toLowerCase())
            )
          : false;
      } else if (subCategories["Care Difficulty"].includes(selectedFilter)) {
        matchesFilter = item.CareDifficulty
          ? item.CareDifficulty.toLowerCase().includes(
              selectedFilter.toLowerCase()
            )
          : false;
      } else if (subCategories["Type of Plant"].includes(selectedFilter)) {
        matchesFilter = item.Type
          ? Array.isArray(item.Type)
            ? item.Type.some((t) =>
                t.toLowerCase().includes(selectedFilter.toLowerCase())
              )
            : item.Type.toLowerCase().includes(selectedFilter.toLowerCase())
          : false;
      }
    }

    return matchesSearch && matchesFilter;
  });

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
      {/* 🔍 Search Bar + Filter Button */}
      <View style={homeStyles.header}>
        <View style={homeStyles.searchWrapper}>
          <TextInput
            style={homeStyles.searchBar}
            placeholder="SEARCH PLANTS..."
            placeholderTextColor="#ffffffff"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={homeStyles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#000000ff" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => setFilterVisible(true)}>
          <Ionicons name="filter" size={26} color="#2E481E" />
        </TouchableOpacity>
      </View>

      {/* 🌱 Plant Grid */}
      <ScrollView
        contentContainerStyle={homeStyles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4CAF50"]}
            tintColor="#4CAF50"
          />
        }
      >
        <View style={homeStyles.gridContainer}>
          {filteredItems.map((item) => {
            const isAdded = myPlants.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={homeStyles.gridItem}
                onPress={() =>
                  navigation.navigate("Plant Library Details", { plantId: item.id })
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

      {/* 🧩 Filter Modal */}
      <Modal visible={filterVisible} transparent animationType="slide">
        <View style={homeStyles.modalContainer}>
          <View style={homeStyles.modalContent}>
            <Text style={homeStyles.modalTitle}>
              {selectedCategory
                ? `Select ${selectedCategory}`
                : "Filter by Category"}
            </Text>

            {!selectedCategory ? (
              ["All", "Lighting", "Care Difficulty", "Type of Plant"].map(
                (category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      homeStyles.filterOption,
                      selectedFilter === category && homeStyles.filterOptionActive,
                    ]}
                    onPress={() => {
                      if (category === "All") {
                        setSelectedFilter("All");
                        setFilterVisible(false);
                      } else {
                        setSelectedCategory(category);
                      }
                    }}
                  >
                    <Text
                      style={[
                        homeStyles.filterText,
                        selectedFilter === category &&
                          homeStyles.filterTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                )
              )
            ) : (
              subCategories[selectedCategory].map((sub) => (
                <TouchableOpacity
                  key={sub}
                  style={[
                    homeStyles.filterOption,
                    selectedFilter === sub && homeStyles.filterOptionActive,
                  ]}
                  onPress={() => {
                    setSelectedFilter(sub);
                    setSelectedCategory(null);
                    setFilterVisible(false);
                  }}
                >
                  <Text
                    style={[
                      homeStyles.filterText,
                      selectedFilter === sub && homeStyles.filterTextActive,
                    ]}
                  >
                    {sub}
                  </Text>
                </TouchableOpacity>
              ))
            )}

            {selectedCategory && (
              <TouchableOpacity
                onPress={() => setSelectedCategory(null)}
                style={homeStyles.closeButton}
              >
                <Text style={homeStyles.closeText}>← Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                setFilterVisible(false);
                setSelectedCategory(null);
              }}
              style={homeStyles.closeButton}
            >
              <Text style={homeStyles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#dbe6d4ff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  searchWrapper: { flexDirection: "row", flex: 1, marginRight: 10, },
  searchBar: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    color: "black",
    backgroundColor: "#2E481E",
  },
  clearButton: { position: "absolute", right: 10, top: 10 },
  scrollContent: { paddingBottom: 20 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  gridItem: {
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
  },
  image: { width: "100%", height: 120, resizeMode: "contain", marginBottom: 8 },
  label: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  filterOption: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
  },
  filterOptionActive: { backgroundColor: "#4CAF50" },
  filterText: { textAlign: "center" },
  filterTextActive: { color: "white", fontWeight: "bold" },
  closeButton: { alignSelf: "center", marginTop: 10 },
  closeText: { color: "#2E481E", fontWeight: "bold" },
});
