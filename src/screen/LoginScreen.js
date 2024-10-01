import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getCurrentUser } from '../../Firebase/auth';
import { createDocument } from '../../Firebase/firestore';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  const handleLogin = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      console.log('User account created & signed in!');

      const user = getCurrentUser();


      const userData = {
        uid: user.uid,
        email: user.email,

    
      }




     await createDocument('users', userData);


     console.log('User created!, in firestore');




    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
