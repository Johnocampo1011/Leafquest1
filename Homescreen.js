import React, { useState, useEffect } from "react";
import { View,Text,StyleSheet,Image,ScrollView,TextInput,TouchableOpacity, Platform, Dimensions,ActivityIndicator,FlatList} from 'react-native';
import { useNavigation,useRoute, } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig"; // your Firebase setup file



const HomeStack = createNativeStackNavigator();
const VideosStack = createNativeStackNavigator();


function Header() {
  const navigation = useNavigation();
  return (
    <View style={headerStyles.container}>
      <Text style={{fontSize:20, fontWeight:"bold"}}>LEAFQUEST</Text>
      <TouchableOpacity style={{marginLeft:200}} onPress={() => {}}>
        <Ionicons name="menu" size={24} color="#000"/> 
      </TouchableOpacity>
      <View />
    </View>
  );
}


const localImages = {
  POTHOS: require("./assets/POTHOS.png"),
  "PHILODENDRON.png": require("./assets/PHILODENDRON.png"),
  "PrayerPlant.png": require("./assets/PrayerPlant.png"),
  "BirdNestFern.png": require("./assets/BirdNestFern.png"),
  "ZzPlant.png": require("./assets/ZzPlant.png"),
};

export function HomeScreenContent({ navigation }) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch plants from Firestore
useEffect(() => {
  const plantsCollection = collection(db, "plants");

  // Listen to real-time updates from Firestore
  const unsubscribe = onSnapshot(
    plantsCollection,
    (snapshot) => {
      const plantList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlants(plantList);
      setLoading(false);
    },
    (error) => {
      console.error("Error fetching plants:", error);
      setLoading(false);
    }
  );

  // Cleanup listener when component unmounts
  return () => unsubscribe();
}, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2E481E" />
        <Text>Loading plants...</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <Header />

      <ScrollView contentContainerStyle={homeStyles.scrollContent}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginHorizontal: 24, marginVertical: 4 }}>
          My Plants
        </Text>

        <View style={homeStyles.gridContainer}>
          {plants.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={homeStyles.gridItem}
              onPress={() =>
                navigation.navigate("PlantDetails", {
                plantId: item.id,              
  })
}
            >
              {item.image && (
                <Image
                  source={item.image.startsWith("http") ? { uri: item.image } : localImages[item.image]}
                  style={homeStyles.image}
                />
              )}
              <Text style={homeStyles.label}>{item.name}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[homeStyles.gridItem, { justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#ccc" }]}
            onPress={() => navigation.navigate("Plantlibrary") }
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
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Take Plant Quiz</Text>
      </TouchableOpacity>
    </View>
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




export function VideoPlayerScreen() {
  const route = useRoute();
  const { video } = route.params;
  const [selectedVideo, setSelectedVideo] = useState(video);

  const videoItems = [
    {
      id: 1,
      title: 'Intro to Plants',
      desc: 'YouTube Video 1',
      image: require('./assets/videoplant.png'),
      youtubeId: 'rOSHosF0',
    },
    {
      id: 2,
      title: 'Sunlight Tips',
      desc: 'YouTube Video 2',
      image: require('./assets/videoplant.png'),
      youtubeId: 'ugKWkJyGFQg', 
    },
    
  ];

 const screenHeight = Dimensions.get('window').height;
 
const renderVideoPlayer = () => {
  if (selectedVideo.youtubeId) {
    return (
      
        
      <View style={videoStyles.videoContainer}>
        
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={videoStyles.webview}
          source={{ uri: `https://www.youtube.com/embed/${selectedVideo.youtubeId}` }}
        />
      </View>
    );
  } else {
    return <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>No video source found.</Text>;
  }
};

  return (
    <View style={detailStyles.container}>
      <Header />

      {renderVideoPlayer()}

      <Text style={videoplayStyles.title}>{selectedVideo.title}</Text>
      <Text style={videoplayStyles.description}>{selectedVideo.desc}</Text>

      <ScrollView style={{ padding: 15 }}>
        {videoItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={videoStyles.videoItem}
            onPress={() => setSelectedVideo(item)}
          >
            <Image source={item.image} style={videoStyles.thumbnail} />
            <View style={videoStyles.infoBox}>
              <Text style={videoStyles.title}>{item.title}</Text>
              <Text style={videoStyles.desc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}


export function VideosScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const videoItems = [
    {
      id: 1,
      title: 'Video One',
      desc: 'Intro to plants',
      image: require('./assets/videoplant.png'),
      youtubeId: 'ew-rOSHosF0',
    },
    {
      id: 2,
      title: 'Video Two',
      desc: 'Sunlight tips',
      image: require('./assets/videoplant.png'),
      youtubeId: 'ObMGZbnc750',
    },
    
  ];

  const filteredItems = videoItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={otherStyles.container}>
      <Header />
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginHorizontal:24, marginTop:10 }}>Videos</Text>
      <TextInput
        style={videoStyles.searchBar}
        placeholder="Search videos..."
        value={search}
        onChangeText={setSearch}
      />
      <ScrollView style={{ padding: 15 }}>
        {filteredItems.map((item) => (

          
          <TouchableOpacity
            key={item.id}
            style={videoStyles.videoItem}
            onPress={() => navigation.navigate('VideoPlayer', { video: item })}
          >
            
            <Image source={item.image} style={videoStyles.thumbnail} />
            <View style={videoStyles.infoBox}>
              <Text style={videoStyles.videoTitle}>{item.title}</Text>
              <Text style={videoStyles.videoDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export function PlantLibraryDetailsScreen({ route }) {
  const { label, description, image } = route.params;
   const keywords = ["Size:", "Water:", "Fertilize:", "Description:",];
  const parts = description.split(/(\bSize:|\bWater:|\bFertilize:|\bDescription:)/g);

   return (
    <ScrollView style={PlantDetailsstyles.scrollContainer}>
      <View style={PlantDetailsstyles.container}>
        <Image source={image} style={PlantDetailsstyles.image} />
        <Text style={PlantDetailsstyles.label}>{label}</Text>

        <View style={PlantDetailsstyles.descriptionBox}>
          <Text style={PlantDetailsstyles.description}>
            {parts.map((part, index) =>
              keywords.includes(part) ? (
                <Text key={index} style={PlantDetailsstyles.bold}>{part}</Text>
              ) : (
                <Text key={index}>{part}</Text>
              )
            )}
          </Text>
        </View>
      </View>
    </ScrollView>
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
  container: { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: Platform.OS === 'android' ? 40 : 0,}, 
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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