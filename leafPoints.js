// leafPoints.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const LEAF_POINTS_KEY = "leafPoints";

// Get current leaf points
export async function getLeafPoints() {
  try {
    const points = await AsyncStorage.getItem(LEAF_POINTS_KEY);
    return points ? parseInt(points, 10) : 0;
  } catch (error) {
    console.error("Error fetching leaf points:", error);
    return 0;
  }
}

// Add new points
export async function addLeafPoints(pointsToAdd) {
  try {
    const current = await getLeafPoints();
    const newTotal = current + pointsToAdd;
    await AsyncStorage.setItem(LEAF_POINTS_KEY, newTotal.toString());
    return newTotal;
  } catch (error) {
    console.error("Error updating leaf points:", error);
    return null;
  }
}
