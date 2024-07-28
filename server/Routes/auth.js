import express from "express";
// import fetch from "node-fetch";
import { config as configDotenv } from 'dotenv';
configDotenv();

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

router.get('/google', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    console.log(url);
    res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();
        const { access_token, id_token } = tokenData;

        const profileResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const profile = await profileResponse.json();

        // Handle user authentication here
        console.log('User profile:', profile);
        const redirectUrl = `http://localhost:5173/messages?name=${encodeURIComponent(profile.name)}`;
        // Redirect the user to the URL
        res.redirect(redirectUrl);

    } catch (error) {
        console.error('Error during Google authentication:', error);
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    // Handle user logout here
    res.redirect('/login');
});

export default router;
