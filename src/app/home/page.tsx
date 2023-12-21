'use client';
import Header from '@/app/home/home_component/Home/Header';
import { HOME_HEADER } from '@/constants';
import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import Main from './home_component/Home/Main';
import Footer from './home_component/Home/Footer';
import FAQ from './home_component/FAQ';
import Navbar from './home_container/Navbar';

function HomePage() {

  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration in milliseconds
      delay: 200, // Delay between animations in milliseconds
      once: true, // Whether to animate elements only once
    });
    AOS.refresh();
  }, []);

  const handleToast = () => {
    // toast.info('Coming soon');
  }
  return (
    <div className="  max-w-[1200px] overflow-x-hidden w-full mx-auto flex flex-col gap-8">
      {/* <Navbar /> */}
      <Header data={HOME_HEADER} />
      <Main />
      <Footer />
      <FAQ />
    </div>
  )
}

export default HomePage