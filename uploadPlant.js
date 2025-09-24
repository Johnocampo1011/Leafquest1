// uploadPlants.js (CommonJS version)

// ✅ Use CommonJS require
const admin = require("firebase-admin");
const { plants } = require("./plantData.js");

// Load service account key JSON
const serviceAccount = require("./serviceAccountKey.json");

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadPlants() {
  try {
    console.log("🌱 Starting plant data upload...");

    const batch = db.batch();
    let newCount = 0;
    let updatedCount = 0;

    for (const plant of plants) {
      const plantRef = db.collection("plants").doc(String(plant.plantId));
      const existingDoc = await plantRef.get();

      if (existingDoc.exists) {
        const existingData = existingDoc.data();

        // ✅ Only update if there are changes
        const hasChanges = Object.keys(plant).some(
          (key) => plant[key] !== existingData[key]
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
          console.log(`⏭ Skipped (no changes): ${plant.name}`);
        }
      } else {
        batch.set(plantRef, {
          ...plant,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`✅ Uploaded new: ${plant.name}`);
        newCount++;
      }
    }

    // 🚀 Commit all writes in one go
    await batch.commit();
    console.log(
      `🎉 Plant data upload completed! (${newCount} new, ${updatedCount} updated)`
    );
  } catch (error) {
    console.error("❌ Error uploading plants:", error);
  }
}

// 🚀 Run the uploader
uploadPlants();
