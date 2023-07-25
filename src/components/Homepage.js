import React from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Hero from '../components/homepage/Hero';
import Cards from '../components/homepage/Cards';
import Facts from '../components/homepage/Facts';
import Features from '../components/homepage/Features';
import Courses from '../components/homepage/Courses';
import Pricing from '../components/homepage/Pricing';
import Newsletter from '../components/homepage/Newsletter';
import Contact from '../components/homepage/Contact';
import Footer from '../components/homepage/Footer';
import BackToTopButton from './homepage/BackToTop';

const Homepage = () => {
    Aos.init({
        duration: 1800,
        offset: 100,
    });

    return (
        <div className='overflow-hidden'>
            <Hero />
            <Cards />
            <Facts />
            <Features />
            <Courses />
            <Pricing />
            <Newsletter />
            <Contact />
            <BackToTopButton />
            <Footer />
        </div>
    );
};

export default Homepage;