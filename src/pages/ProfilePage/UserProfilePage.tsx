import React from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer.tsx";
import '../LandingPage/LandingPage.css';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Breadcrumb, Typography, Input, message } from 'antd';

const UserProfilePage = () => {
    const [userData, setUserData] = useState<any>([]);

    const getUserData = () => {
        const userName = localStorage.getItem('userName');
        const fullName = localStorage.getItem('fullName');
        const email = localStorage.getItem('email');
        const phoneNumber = localStorage.getItem('phoneNumber');
        const gender = localStorage.getItem('gender');
        const userData = localStorage.getItem('userData');
        return {
            userName,
            fullName,
            email,
            phoneNumber,
            gender,
            userData
        };
    };

    const userInfo = getUserData();
    console.log(userInfo.userData);


    return (
        <Layout className="landing-page">
            <Header />
            <div>ĐÂY LÀ PROFILE</div>
            <Footer />
        </Layout>
    );
};
export default UserProfilePage;