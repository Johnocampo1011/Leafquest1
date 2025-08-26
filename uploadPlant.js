// uploadPlants.js
import { db } from "./firebaseAdminConfig.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { plants } from "./plantData.js";

async function uploadPlants() {
  try {
    console.log("🌱 Starting plant data upload...");

    for (const plant of plants) {
      // 🔍 Check if this plant already exists in Firestore by name
      const q = query(collection(db, "plants"), where("name", "==", plant.name));
      const existing = await getDocs(q);

      if (existing.empty) {
        // 🆕 Create a new Firestore document with plantId as the ID
        const plantRef = doc(db, "plants", String(plant.plantId));
        await setDoc(plantRef, {
          ...plant,
          createdAt: new Date(),
        });
        console.log(`✅ Uploaded: ${plant.name}`);
      } else {
        console.log(`⚠️ Skipped: ${plant.name} (already exists)`);
      }
    }

    console.log("🎉 Plant data upload completed!");
  } catch (error) {
    console.error("❌ Error uploading plants:", error);
  }
}

// 🚀 Run the uploader
uploadPlants();
