import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    const next = () => {
        navigation.navigate('Login')
    }

    const handleSignUp = () => {
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('tạo tài khoản thành công')
            })
            .catch(error => {
                Alert.alert(`${error}`)
            })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Đăng ký" onPress={handleSignUp} />


            <TouchableOpacity style={styles.guestButton}>
            <Text style={styles.guestButtonText}>As a Guest</Text>
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>You don't have an account yet? </Text>
            <TouchableOpacity  onPress={next}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>


          
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
    input: {
        height: 50,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
      },

      
  guestButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    marginBottom: 50,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
