import React from "react";
import { Parallax } from 'react-parallax';
import Image from '../../assets/img/hero/guy.png';
import Header from './Header';
import '../../styles/Hero.css'


const Hero = () => {
  return (
    <section className="min-h-[618px] lg:min-h-[815px] pt-9 lg:bg-circle lg:bg-no-repeat lg:bg-right-top">
      <div className="container mx-auto">
        <Header />
        <div className="flex flex-col items-center lg:flex-row lg:items-start pt-32">
          <div className="flex-1 lg:mt-12">

            <h1 className="h1 mb-3 lg:mb-[22px]"
              data-aos='fade-down'
              data-aos-delay='500' >Discover the Power Within: <br /> Embrace Yoga's Harmony and Flourish</h1>
            <p className="mb-6 lg:mb-12 max-w-[480px] lg:text-lg"
              data-aos='fade-down'
              data-aos-delay='600'>Yoga invites us to transcend our limitations, to let go of self-imposed boundaries, and to tap into our unlimited potential. It encourages us to embrace our authentic selves and to step into our true power. Through this transformational practice, we become more aligned with our purpose, more connected to the world around us, and more in tune with our inner wisdom.</p>
          </div>
        </div>
        {/* btn group */}
        <div className="mb-12 space-x-4"
          data-aos='fade-down'
          data-aos-delay='700'>
          <button className="btn btn-sm lg:btn-lg btn-orange">Get started</button>
          <button className="btn-hover  lg:btn-lg text-heading bg-transparent border border-stroke-1 px-4 hover:bg-stroke-3 transition">Learn more</button>
        </div>
      </div>
      {/* image */}
      <div className="w-full bg-circle bg-cover lg:bg-none lg:w-auto">
        <div className="flex-1 flex justify-center lg:justify-end"
          data-aos='fade-left'
          data-aos-delay='600'>
          <div className="w-[234px] h-[234] lg:w-[504px] lg:h-[744px] lg:mt-0">
            <Parallax
              className="w-[650px] h-[600px] p-28 lg:p-16 absolute right-[270px]  "
              bgImage={Image}
              bgImageAlt='guy image'
              strength={200}
            />
          </div>
        </div>
      </div>
      {/* Hero */}
    </section>
  );
};

export default Hero;
