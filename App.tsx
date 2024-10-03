import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './routes/MainStackNavigator';
import AuthStackNavigator from './routes/AuthStackNavigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; 

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const fetchUserData = async (userId: string) => {
    try {
      const userDocument = await firestore().collection('users').doc(userId).get();
      if (userDocument.exists) {
        setUserData(userDocument.data()); 
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching Firestore data: ', error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      onAuthStateChanged(user);
      if (user) {
        fetchUserData(user.uid); 
      }
    });
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        {user ? <MainStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});
