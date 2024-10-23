import { View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const GoogleLogin = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: '54904457472-ct4aubrs1m29i7358n5sk2i4tmr3vfk6.apps.googleusercontent.com'
    });

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            Alert.alert('Đăng nhập thành công');
            navigation.navigate('Home'); // Chuyển hướng đến màn hình Home
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Đăng nhập bị hủy');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Đang tiến hành đăng nhập');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Dịch vụ Google Play không khả dụng');
            } else {
                Alert.alert('Đăng nhập thất bại', `${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <Button title="Đăng nhập với Google" onPress={handleGoogleSignIn} disabled={loading} />
        </View>
    );
};

export default GoogleLogin;
