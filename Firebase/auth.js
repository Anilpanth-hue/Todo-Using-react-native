import Auth from '@react-native-firebase/auth';

// Get the auth settings
export const getAuthSettings = () => {
    const authSettings =  Auth().settings;
    return authSettings;
}

// Get the current signed in user
export const getCurrentUser = () => {
    const currentUser = Auth().currentUser;
    return currentUser || null;
}


// Sign in anonymously function
export const signInAnonymously = async () => {
    try {
        await Auth().signInAnonymously();

    } catch (error) {
        console.error(error);
    }
}
// Sign out function
export const signOut = async () => {
    try {
        await Auth().signOut();
    } catch (error) {
        console.error(error);
    }
}