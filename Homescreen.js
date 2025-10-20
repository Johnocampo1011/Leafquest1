import React, { useState, useEffect, useLayoutEffect } from "react";
import { View,Text,StyleSheet,Image,ScrollView,TextInput,TouchableOpacity, Platform, Dimensions,ActivityIndicator,FlatList,} from 'react-native';
import { useNavigation,useRoute, } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { localImages } from "./localImages";
import { MenuHeaderScreen,MenuButton } from "./MenuButton";
import { ImageBackground } from "react-native";


const HomeStack = createNativeStackNavigator();


function Header() {
  return (
    <View style={headerStyles.container}>
      <Text style={{fontSize:28, fontWeight:"bold"}}>LEAFQUEST</Text>
      <MenuButton />  
    </View>
  );
}


export function HomeScreenContent({ navigation }) {
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const user = auth.currentUser;
  if (!user) {
    console.error("⚠️ No user logged in");
    setLoading(false);
    return;
  }

  // ✅ Listen to user's personal plant collection
  const userPlantsRef = collection(db, "users", user.uid, "plants");

  const unsubscribe = onSnapshot(
    userPlantsRef,
    (snapshot) => {
      const userPlants = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyPlants(userPlants);
      setLoading(false);
    },
    (error) => {
      console.error("Error getting user's plants:", error);
      setLoading(false);
    }
  );

  return () => unsubscribe();
}, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2E481E" />
        <Text>Loading your plants...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("./assets/leafybg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
    <View style={homeStyles.container}>
      
      <Header />



      <ScrollView contentContainerStyle={homeStyles.scrollContent}>
        <Text style={{ fontSize: 26, fontWeight: "bold", marginHorizontal: 24, marginVertical: 4, textAlign: "center"}}>
          MY PLANTS
        </Text>

        <View style={homeStyles.gridContainer}>
          {myPlants.length > 0 ? (
            myPlants.map((item) => (
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

  {/* Plant Name */}
  <Text style={homeStyles.label}>{item.name}</Text>

  {/* Plant Level */}
  {item.plantLevel !== undefined && (
    <View style={homeStyles.levelContainer}>
      <Ionicons name="leaf" size={14} color="#4CAF50" />
      <Text style={homeStyles.levelText}>Level {item.plantLevel}</Text>
    </View>
  )}
</TouchableOpacity>
            ))
          ) : (
            <Text style={{ margin: 20, fontSize: 16, color: "gray" }}>
              You don't have your Plants yet
            </Text>
          )}

          
          <TouchableOpacity
            style={[
              homeStyles.gridItem,
              { justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#ccc" },
            ]}
            onPress={() => navigation.navigate("Library") }
          >
            <Ionicons name="add-circle-outline" size={40} color="#4CAF50" />
            <Text style={homeStyles.label}>Add Plant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      
      <TouchableOpacity
        style={{
          backgroundColor: "#4CAF50",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          marginHorizontal: 14,
          marginTop: 10,
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate("QuizScreen")}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Take Plant Quiz
        </Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}


export function MessageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to LeafQuest!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
});


export function VideosStackNavigator() {
  return (

    <VideosStack.Navigator screenOptions={{ headerShown: false }}>
      <VideosStack.Screen name="VideosMain" component={VideosScreen} />
      <VideosStack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
    </VideosStack.Navigator>
  );
}





const PlantDetailsstyles = StyleSheet.create({
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
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'monospace',
  },
});

// --- Styles ---


const headerStyles = StyleSheet.create({ 
  container: { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, backgroundColor: '#ffffff09',  marginTop: Platform.OS === 'android' ? 40 : 0,}, 
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa2c',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensures even spacing
    paddingHorizontal: 10,
    paddingTop: 10,
  },
   gridItem: {
    width: "48%",                // Two tiles per row
    height: 180,                 // Fixed tile height ✅
    marginBottom: 15,
    backgroundColor: "#fff",     // Fixed missing '#' ✅
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",          // Ensures image corners are clipped ✅
    alignItems: "center",
    justifyContent: "flex-start", // Keeps content aligned properly ✅
    elevation: 3,                 // Android shadow ✅
    shadowColor: "#000",          // iOS shadow ✅
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 140,               // Bigger image ✅
    resizeMode: "contain",       // Fills the tile ✅
  },
  label: {
    position: "absolute",      // Lock the label at bottom ✅
    bottom: 8,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#2E481E",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background ✅
    paddingVertical: 4,
  },
  levelContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: -10,
  backgroundColor: "rgba(76, 175, 80, 0.1)", // light green background
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 8,
},
levelText: {
  fontSize: 10,
  fontWeight: "600",
  marginLeft: 4,
  color: "#2E481E",
},

});

const plntstyles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#fff', padding: 20, }, headerlibrary: { alignItems: 'center', marginBottom: 20, }, titlelibrary: { fontSize: 24, fontWeight: 'bold', color: '#333', }, content: { alignItems: 'center', marginBottom: 30, }, plantImage: { width: '80%', height: 240, resizeMode: 'contain', }, circlesRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30, }, circleButton: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#3a7d44', alignItems: 'center', justifyContent: 'center', position: 'relative', }, badge: { position: 'absolute', top: -6, right: -6, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 4, paddingVertical: 2, borderWidth: 1, borderColor: 'black', }, badgeText: { fontSize: 12, color: '#3a7d44', fontWeight: 'bold', }, detailSectionlibrary: { paddingBottom: 40, }, sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10, }, paragraph: { fontSize: 14, lineHeight: 20, color: '#555', },
});

const videoStyles = StyleSheet.create({ 
  searchBar: { 
    backgroundColor: '#f0f0f0', 
    margin: 12, 
    paddingHorizontal: 18, 
    paddingVertical: 14, 
    borderRadius: 20, 
    fontSize: 16 
  },

  videoItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10,          // ✅ Added vertical spacing between items
    marginBottom: 10,             // ✅ Space below each item
    backgroundColor: '#fdfdfd',   // ✅ Prevent webview from blending with list
    borderRadius: 8, 
    paddingHorizontal: 10,
    elevation: 1,
  },

  thumbnail: { 
    height: 90,
    width: 100, 
    marginRight: 15, 
    borderRadius: 6 
  },

  infoBox: { 
    flex: 1 
  },

  videoTitle: {                // ✅ Renamed from 'title' to avoid clash
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 4, 
    color: '#222' 
  },

  videoDesc: {                 // ✅ Renamed from 'desc' to avoid clash
    fontSize: 13, 
    color: '#666' 
  },

  videoContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 3,  
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#000',     
    marginTop:20,
  },

  webview: {
    flex: 1,                    
    backgroundColor: '#000'     
  },
});


const videoplayStyles = StyleSheet.create({ 
  title: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 15, marginTop: 10, color: '#333' }, description: { fontSize: 14, paddingHorizontal: 15, marginTop: 5, marginBottom: 15, color: '#555',}, 
});

const libraryStyles = StyleSheet.create({ 
  title: { fontSize: 30, fontWeight: 'bold', marginHorizontal: 15, marginBottom: 5, color: '#333' }, 
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 10 }, gridItem: { width: '23%', marginBottom: 15, alignItems: 'center', borderWidth:1, borderColor: 'black', borderRadius: 6, backgroundColor: 'lightgray',paddingBottom: 18, paddingHorizontal:8, }, 
  image: { width: 'contain', aspectRatio: .8, }, 
  label: { marginTop: 6, fontSize: 12, color: '#333', textAlign: 'center' }, 
  searchBar: { backgroundColor: '#f0f0f0', margin: 15, marginBottom: 10, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, fontSize: 16 }, 
});

const detailStyles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#fff', padding: 10, }, content: { flex: 1, alignItems: 'center', justifyContent: 'center' }, text: { fontSize: 18 }, 
});

const otherStyles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#fff', }, content: { flex: 1, alignItems: 'center', justifyContent: 'center' }, 
});