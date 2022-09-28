import { useState, useRef, useEffect, Fragment } from 'react';
// import HomePage from "@/layout/HomePage/HomePage";
// import LoginPage from "@/layout/LoginPage/LoginPage";
// import Head from "next/head";
// import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import LandingPage from '@/layout/LandingPage/LandingPage';
import InitialPageLoader from '@/layout/InitialPageLoader/InitialPageLoader';

const Home = () => {
   const [mainLoader, setMainLoader] = useState(false);
   // Load this effect on mount
   useEffect(() => {
      setMainLoader(true);
      const timer = setTimeout(() => {
         setMainLoader(false);
      }, 3000);
      // Cancel the timer while unmounting
      return () => clearTimeout(timer);
   }, []);
   return <>{mainLoader ? <InitialPageLoader /> : <LandingPage />}</>;
};

export default Home;
