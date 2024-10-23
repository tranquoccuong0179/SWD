import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('Đăng nhập thành công');
                navigation.navigate('Home');
            })
            .catch(error => {
                Alert.alert('Đăng nhập thất bại', error.message);
            });
    };

    const goToSignUp = () => {
        navigation.navigate('SignUp');
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Text style={styles.title}>Đăng nhập</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.btnDangnhap} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton}>
                    <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                        <Text style={{ color: "#4285F4" }}>
                            G<Text style={{ color: "#EA4336" }}>o</Text>
                            <Text style={{ color: "#FBBC04" }}>o</Text>
                            <Text style={{ color: "#4285F4" }}>g</Text>
                            <Text style={{ color: "#34A853" }}>l</Text>
                            <Text style={{ color: "#EA4336" }}>e</Text>
                        </Text>
                    </Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Bạn chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={goToSignUp}>
                        <Text style={styles.signupLink}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    btnDangnhap: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        height: 50,
        marginBottom: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        color: '#666',
    },
    signupLink: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
