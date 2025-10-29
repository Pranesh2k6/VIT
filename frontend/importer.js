// importer.js
import { db } from './firebase-config.js'; 
import { collection, writeBatch, doc } from 'firebase/firestore'; 

// Get button and log elements from importer.html
const importPhysicsBtn = document.getElementById('importPhysicsBtn');
const importChemistryBtn = document.getElementById('importChemistryBtn');
const importMathsBtn = document.getElementById('importMathsBtn');
const logList = document.getElementById('log');

// Function to add status messages to the HTML page
function logMessage(message) {
    const li = document.createElement('li');
    li.textContent = message;
    logList.appendChild(li);
    console.log(message); // Also output to the browser console (F12)
}

// Main function to import data for a given subject
async function importSubjectData(subjectName, jsonFilePath) {
    logMessage(`Starting import for ${subjectName}...`);
    try {
        // 1. Fetch the JSON data from the specified file path
        const response = await fetch(jsonFilePath);
        if (!response.ok) {
            // If the file isn't found or there's an error loading it
            throw new Error(`HTTP error! Status: ${response.status} while loading ${jsonFilePath}`);
        }
        
        // Parse the fetched text as JSON
        const dataArray = await response.json(); 

        // 2. Validate the loaded data
        if (!Array.isArray(dataArray)) {
             throw new Error(`Data loaded from ${jsonFilePath} is not a valid JSON array.`);
        }
        if (dataArray.length === 0) {
            logMessage(`Warning: ${jsonFilePath} is empty. No data imported for ${subjectName}.`);
            return; // Exit if the file is empty
        }

        // 3. Define Firestore Collection Name
        //    This creates collections like 'physics_data', 'chemistry_data', etc.
        const collectionName = `${subjectName}_data`; 
        const subjectCollectionRef = collection(db, collectionName); 
        
        logMessage(`Attempting to import ${dataArray.length} items into collection '${collectionName}'...`);

        // 4. Use Firestore Batched Writes for Efficiency
        //    Batches allow uploading up to 500 documents in a single operation
        let batch = writeBatch(db); 
        let operationsCount = 0; // Total documents imported
        let batchCounter = 0;    // Documents in the current batch

        for (const item of dataArray) {
            // Ensure the item from the JSON array is a valid object
            if (typeof item !== 'object' || item === null) {
                logMessage(`Skipping invalid item in ${jsonFilePath}: ${JSON.stringify(item)}`);
                continue; // Skip this item and move to the next
            }

            // Create a reference for a new document (Firestore will auto-generate the ID)
            const newDocRef = doc(subjectCollectionRef); 
            // Add the operation to set this document's data to the batch
            batch.set(newDocRef, item); 
            operationsCount++;
            batchCounter++;

            // Commit the batch when it reaches 500 operations
            if (batchCounter === 500) {
                await batch.commit();
                logMessage(`Committed batch of 500 documents for ${subjectName}.`);
                batch = writeBatch(db); // Start a new, empty batch
                batchCounter = 0;       // Reset the counter for the new batch
            }
        }

        // Commit any remaining operations in the last batch (if less than 500)
        if (batchCounter > 0) {
            await batch.commit();
            logMessage(`Committed final batch of ${batchCounter} documents for ${subjectName}.`);
        }
        
        // Success message
        logMessage(`✅ Successfully imported ${operationsCount} documents for ${subjectName} into '${collectionName}'!`);

    } catch (error) {
        // Error handling during fetch or Firestore write
        logMessage(`❌ Error importing data for ${subjectName}: ${error}`);
        console.error(`Full Error details for ${subjectName} from ${jsonFilePath}:`, error);
    }
}

// 5. Attach the import function to the button clicks
importPhysicsBtn.addEventListener('click', () => {
    // Assumes 'physics.json' is in the same directory as 'importer.html'
    importSubjectData('physics', './physics.json'); 
});

importChemistryBtn.addEventListener('click', () => {
    // Assumes 'chemistry.json' is in the same directory
    importSubjectData('chemistry', './chemistry.json'); 
});

importMathsBtn.addEventListener('click', () => {
    // Assumes 'maths.json' is in the same directory
    importSubjectData('maths', './maths.json'); 
});

