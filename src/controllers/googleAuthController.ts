// import { Request, Response } from 'express';
// import { google } from 'googleapis';

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// export const googleAuth = (req: Request, res: Response) => {
//     const scopes = [
//         'https://www.googleapis.com/auth/userinfo.profile',
//         'https://www.googleapis.com/auth/userinfo.email',
//         'https://www.googleapis.com/auth/calendar'
//     ];

//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes,
//     });

//     res.redirect(url);
// };

// export const googleAuthCallback = async (req: Request, res: Response) => {
//     const { code } = req.query;

//     try {
//         const { tokens } = await oauth2Client.getToken(code as string);
//         oauth2Client.setCredentials(tokens);

//         // Save the tokens to the user session or database
//         (req.session as any).tokens = tokens;

//         res.redirect('/dashboard'); // Redirect to your application's dashboard
//     } catch (error) {
//         console.error('Error retrieving access token', error);
//         res.status(500).json({ error: 'Error retrieving access token' });
//     }
// };
