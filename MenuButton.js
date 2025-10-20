import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth,db } from "./firebaseConfig"; // adjust path
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import * as Progress from "react-native-progress";

export function MenuButton() {
  const navigation = useNavigation();

  return (
    <Menu>
      <MenuTrigger>
        <Ionicons name="menu" size={32} color="black" style={{ marginRight: 15 }} />
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: {
            marginTop: 35,               // position below trigger
            padding: 12,
            borderRadius: 12,
            width: 200,              // make menu wider
            alignItems: "center",    // center content
          },
          optionWrapper: {
                         // make each option bigger
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          },
          optionTouchable: {
            underlayColor: "green", // ✅ turns green when pressed
            activeOpacity: 70,
          },
        }}
      >
        <MenuOption onSelect={() => navigation.navigate("ProfileScreen")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="person" size={22} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 18 }}>Profile</Text>
          </View>
        </MenuOption>

        <MenuOption
  onSelect={async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out", "You have been logged out.");
      navigation.replace("LoginScreen"); // send user back to login screen
    } catch (error) {
      Alert.alert("Logout failed", error.message);
    }
  }}
>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Ionicons name="log-out" size={22} style={{ marginRight: 12 }} />
    <Text style={{ fontSize: 18 }}>Logout</Text>
  </View>
</MenuOption>

      
      </MenuOptions>
    </Menu>
  );
}

export function MenuHeaderScreen({ navigation, children }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <MenuButton />,
      headerShown: true,
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}>{children}</View>;
}


async function handleLogout(navigation) {
  try {
    await signOut(auth);
    console.log("✅ User logged out");
    navigation.replace("Login"); // redirect to login screen
  } catch (error) {
    console.error("❌ Logout error:", error.message);
  }
}



export function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plantCount, setPlantCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // ✅ Fetch user info from users/{uid}/usersData/profile
        const profileRef = doc(db, "users", user.uid, "usersData", "profile");
        const snap = await getDoc(profileRef);

        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          console.warn("Profile document not found for user:", user.uid);
        }

        // 🔹 Fetch plant count
        const plantSnap = await getDocs(collection(db, "users", user.uid, "plants"));
        setPlantCount(plantSnap.size);

        // 🔹 Fetch quiz results count
        const quizSnap = await getDocs(collection(db, "users", user.uid, "quizResults"));
        setQuizCount(quizSnap.size);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>

      {/* 👤 Avatar */}
      <Image
        source={{
          uri:
            userData?.avatarUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.avatar}
      />

      {/* 📝 User Info */}
      <Text style={styles.name}>
        {userData?.firstName} {userData?.lastName}
      </Text>
      <Text style={styles.username}>{userData?.username}</Text>
      <Text style={styles.email}>{userData?.email}</Text>

      {userData?.createdAt && (
        <Text style={styles.joined}>
          🌱 Joined{" "}
          {new Date(
            typeof userData.createdAt === "string"
              ? userData.createdAt
              : userData.createdAt?.seconds * 1000
          ).toDateString()}
        </Text>
      )}

      {/* 🎮 Gamified Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="leaf" size={22} color="#4CAF50" />
          <Text style={styles.statValue}>{plantCount}</Text>
          <Text style={styles.statLabel}>Plants</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={22} color="#FFD700" />
          <Text style={styles.statValue}>{quizCount}</Text>
          <Text style={styles.statLabel}>Quizzes</Text>
        </View>
      </View>

      {/* 🌟 Level Progress */}
      <Text style={styles.sectionTitle}>Current Level</Text>
      <Progress.Bar
        progress={Math.min(plantCount / 10, 1)} // Example: 1 level per 10 plants
        width={250}
        height={10}
        color="#4CAF50"
        style={{ marginVertical: 12 }}
        backgroundColor="#d2d2d2ff"
      />
      <Text style={styles.levelText}>
        Level {Math.floor(plantCount / 10) + 1}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20, backgroundColor: "#f6fff7", paddingBottom: 173, },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 40,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 20,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10, borderWidth: 5 , borderColor: "#4CAF50" },
  username: { fontSize: 18, fontWeight: "600" ,  },
  name: { fontSize: 25,fontWeight: "bold",color: "#2E7D32" },
  email: { fontSize: 16, color: "gray" },
  joined: { fontSize: 14, marginTop: 6, color: "#888" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    padding: 10, 
  },
  
  statCard: {
    alignItems: "center",
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 3,
    width: 120,
  },
  statValue: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  statLabel: { fontSize: 14, color: "#666" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 20 },
  levelText: { fontSize: 16, marginBottom: 20, color: "#4CAF50", },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  editText: { color: "white", fontWeight: "bold", marginLeft: 8 },
});