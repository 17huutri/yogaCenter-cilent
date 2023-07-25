import React from 'react';
import { MdEmail } from 'react-icons/md'
import '../../styles/Nav.css'

const Newsletter = () => {
  return (
    <section className='newletter section-sm lg:section-lg bg-green min-h-[520px]'>
      <div className='container mx-auto'>
        <div className='border-[8px] border-green-300 rounded-lg text-center pt-[70px] pb-12'
          data-aos='fade-up'
          data-aos-delay='300'
          data-aos-offset='300'>
          <h4 className='text-[26px] text-white font-bold mb-[14px]'
            data-aos='fade-up'
            data-aos-delay='500'
            data-aos-offset='200'>Subscribe Our Newsletter</h4>
          <p className='text-green-200 mb-12'>Subscribe our newsletter for further updates about us</p>
          <form className='max-w-[752px] mx-auto relative flex flex-col lg:flex-row gap-y-6 lg:p-0 gap-x-4'
            data-aos='fade-up'
            data-aos-delay='1000'
          >
            <div className='w-full relative flex'>
              <div className='icon left-2 h-full w-12 flex justify-center items-center text-2xl'><MdEmail /></div>
              <input className='form-new form-control w-full border 
    border-green-300 bg-transparent outline-none
    placeholder:text-green-200 text-while pl-[60px]'
                placeholder='Enter your email address' type='email' />

            </div>
            <button className='btn btn-lg btn-orange text-while w-full lg:max-w-[18p0x]'>
              Get started
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
