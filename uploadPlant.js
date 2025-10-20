// uploadPlants.js

// ✅ Import Firebase Admin SDK
const admin = require("firebase-admin");
const { plants } = require("./plantData.js");
const path = require("path");

// ✅ Load service account key safely
const serviceAccountPath = path.resolve(__dirname, "serviceAccountKey.json");
const serviceAccount = require(serviceAccountPath);

// ✅ Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function uploadPlants() {
  console.log("🌱 Starting plant data upload...");
  const batch = db.batch();
  let newCount = 0;
  let updatedCount = 0;

  try {
    for (const plant of plants) {
      const plantRef = db.collection("plants").doc(String(plant.plantId));
      const docSnap = await plantRef.get();

      if (docSnap.exists) {
        const existing = docSnap.data();
        const hasChanges = Object.keys(plant).some(
          (key) => plant[key] !== existing[key]
        );

        if (hasChanges) {
          batch.set(
            plantRef,
            { ...plant, updatedAt: new Date() },
            { merge: true }
          );
          console.log(`🔄 Updated: ${plant.name}`);
          updatedCount++;
        } else {
          console.log(`⏭ No changes: ${plant.name}`);
        }
      } else {
        batch.set(plantRef, {
          ...plant,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`✅ Added new: ${plant.name}`);
        newCount++;
      }
    }

    // Commit batch writes
    await batch.commit();
    console.log(
      `🎉 Upload complete! (${newCount} new, ${updatedCount} updated)`
    );
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
  }
}

// Run uploader
uploadPlants()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("🚨 Unexpected error:", err);
    process.exit(1);
  });
