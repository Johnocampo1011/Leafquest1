import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const MOCK_PLANTS = [
  {
    plant_name: 'Rose',
    probability: 0.87,
    plant_details: {
      common_names: ['Garden Rose', 'Rosa'],
      family: 'Rosaceae',
      genus: 'Rosa',
    },
  },
  {
    plant_name: 'Sunflower',
    probability: 0.92,
    plant_details: {
      common_names: ['Common Sunflower', 'Helianthus'],
      family: 'Asteraceae',
      genus: 'Helianthus',
    },
  },
  {
    plant_name: 'Tulip',
    probability: 0.79,
    plant_details: {
      common_names: ['Garden Tulip', 'Tulipa'],
      family: 'Liliaceae',
      genus: 'Tulipa',
    },
  },
];

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          We need your permission to show the camera.
        </Text>
        {permission.canAskAgain ? (
          <Button onPress={requestPermission} title="Grant Permission" />
        ) : (
          <Text style={{ textAlign: 'center', color: 'grey' }}>
            Please enable camera permissions in your device settings.
          </Text>
        )}
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.7, base64: false, exif: false };
        const photoData = await cameraRef.current.takePictureAsync(options);
        setPhoto(photoData.uri);
        setLoading(true);
        setSuggestion(null);

        // Simulate processing delay
        setTimeout(() => {
          // Pick a random plant from MOCK_PLANTS
          const randomIndex = Math.floor(Math.random() * MOCK_PLANTS.length);
          setSuggestion(MOCK_PLANTS[randomIndex]);
          setLoading(false);
        }, 2000); // 2 seconds delay to simulate processing
      } catch (error) {
        console.error("Failed to take picture:", error);
        Alert.alert("Error", "Could not take picture.");
        setLoading(false);
      }
    }
  }

  function resetCamera() {
    setPhoto(null);
    setSuggestion(null);
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        >
          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.captureButton]} onPress={takePicture}>
              <View style={styles.captureButtonInner}></View>
            </TouchableOpacity>
            <View style={[styles.controlButton, { opacity: 0 }]} />
          </View>
        </CameraView>
      ) : (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: photo }} style={{ flex: 1 }} resizeMode="contain" />

          {loading && <ActivityIndicator size="large" color="#00ff00" />}
          {suggestion && (
            <ScrollView style={{ backgroundColor: 'white', padding: 16 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Suggested Plant:</Text>
              <Text>Name: {suggestion.plant_name}</Text>
              <Text>Probability: {(suggestion.probability * 100).toFixed(2)}%</Text>
              {suggestion.plant_details && (
                <>
                  <Text>Common Names: {suggestion.plant_details.common_names.join(', ')}</Text>
                  <Text>Family: {suggestion.plant_details.family}</Text>
                  <Text>Genus: {suggestion.plant_details.genus}</Text>
                </>
              )}
            </ScrollView>
          )}

          <Button title="RETAKE" onPress={resetCamera} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  controlButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
  },
});
