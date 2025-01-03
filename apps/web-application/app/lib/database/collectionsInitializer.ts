import connectToDatabase from "@lib/database/databaseConnection";

let postCollection: any;

const collectionInitializer = async (collectionName: string) => {
    if (!postCollection) {
        const db = await connectToDatabase();
        postCollection = db.collection(collectionName);
    }
}

export default collectionInitializer;