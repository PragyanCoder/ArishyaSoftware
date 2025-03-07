import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDYrcJmNxZcHWHH5_ra0P9lqQMIOqOqE0g",
  authDomain: "arishya-software.firebaseapp.com",
  projectId: "arishya-software",
  storageBucket: "arishya-software.appspot.com",
  messagingSenderId: "581040210640",
  appId: "1:581040210640:web:3fc54f8f4d5c5d5d5c5d5c",
  measurementId: "G-XXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;