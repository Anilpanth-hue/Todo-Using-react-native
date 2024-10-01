import firestore from '@react-native-firebase/firestore';

const rootCollection = firestore();

export const getAllDocuments = async (collectionName) => {
    try {
        const collectionRef = rootCollection.collection(collectionName);



        const querySnapshot = await collectionRef.get();
        const collectionData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return collectionData;
    } catch (error) {
        console.error(`Error fetching ${collectionName} data:`, error);
        throw error;
    }
};

export const createDocument = async (collectionName, documentData, documentId = null) => {
    try {
        const documentRef = rootCollection.collection(collectionName).doc(documentId);
        const serverTimestamp = firestore.FieldValue.serverTimestamp();

        const dataWithTimestamps = {
            ...documentData,
            createdAt: serverTimestamp,
            modifiedAt: serverTimestamp,
        };

        await documentRef.set(dataWithTimestamps);
        return documentRef;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};


export const readDocumentData = async (collectionName, documentId) => {
    try {
        const documentSnapshot = await rootCollection.collection(collectionName).doc(documentId).get();

        if (documentSnapshot.exists) {
            return documentSnapshot.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error reading document data:', error);
        throw error;
    }
};

export const updateDocument = async (collectionName, documentId, updatedDocumentData) => {
    try {
        const serverTimestamp = firestore.FieldValue.serverTimestamp();

        const dataWithTimestamps = {
            ...updatedDocumentData,
            modifiedAt: serverTimestamp,
        };

        return rootCollection.collection(collectionName).doc(documentId).update(dataWithTimestamps);
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};

export const deleteDocument = async (collectionName, documentId) => {
    try {
        return rootCollection.collection(collectionName).doc(documentId).delete();
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};