import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import '../../assets/img/hero/bg.png';
import { BsPlayCircleFill } from 'react-icons/bs'
const Features = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className='bg-section min-h-[428px] pt-8 pb-[38px] lg:pb-[150px] mt-[120px] lg:mt-[130px]'>
      <div className='container mx-auto'>
        <div className='h-[310px] bg-cover bg-center bg-no-repeat lg:h-[622px]
        w-full flex justify-center items-center rounded-md -mt-[150px] mb-[28px] lg:mb-20'
          style={{ backgroundImage: 'url(https://assets.vogue.in/photos/5ce43ad61dc267f2d8c79dbc/16:9/w_1920,c_limit/yoga-poses.jpg)' }}
          data-aos='fade-up'
          data-aos-duration='1500'
          data-aos-offset='500'


        >
          <div onClick={() => setIsOpen(!isOpen)} className='text-6xl lg:text-[120px] cursor-pointer hover:scale-110 text-orange transition'>


            <BsPlayCircleFill />
          </div>
        </div>
        {/* text */}
        <div className='flex flex-col lg:flex-row lg:gap-x-8'>
          <div className='flex-1'
            data-aos='fade-right'
          >
            <div className='w-9 h-[2px] bg-orange mb-2 lg:w-[70px] rounded-full'>

            </div>
            <h2 className='h22 mb-3 lg:mb-0'>
              The Better Way To <br /> Start Yoga
            </h2>
          </div>
          <div className='flex-1'
            data-aos='fade-left'
          >
            <p className='max-w-[360px] mb-[18px] lg:mb-[38px]'>
              Practice anywhere, anytime. Explore a new way to exercise and learn more
              about yourself. We are providing the best.
            </p>
            <button className='btn btn-sm btn-orange'>Get Started</button>
          </div>
        </div>
      </div>
      <div>
        <button onClick={openModal}></button>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId="j7rKKpwdXNE"
          onClose={closeModal}
        />
      </div>
    </section>
  );
};

export default Features;
