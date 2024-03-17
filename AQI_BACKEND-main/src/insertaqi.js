const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://hussainamaan87:hussain@cluster0.fg5lngw.mongodb.net//'; // Replace with your MongoDB URI



async function insertAqiData(databaseName, collectionName, document) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database
        const database = client.db(databaseName);

        // Select the collection
        const collection = database.collection(collectionName);

        // Insert the document into the collection
        const result = await collection.insertOne(document);
        console.log(`Inserted document: ${result.insertedId}`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}



// Call the function to insert the document


module.exports = insertAqiData;
