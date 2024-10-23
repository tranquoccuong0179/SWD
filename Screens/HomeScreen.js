import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '54904457472-ct4aubrs1m29i7358n5sk2i4tmr3vfk6.apps.googleusercontent.com', // Thay thế bằng client ID của bạn từ Firebase Console
    });
  }, []);

  const handleLogout = async () => {
    try {
      // Check if the user is signed in with Google
      const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
      
      if (isSignedInWithGoogle) {
        // Sign out from Google
        await GoogleSignin.signOut();
      }

      // Sign out from Firebase
      await auth().signOut();

      Alert.alert('Đăng xuất thành công');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Đăng xuất thất bại', `${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
