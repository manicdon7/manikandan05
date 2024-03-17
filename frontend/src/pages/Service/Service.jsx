import React from 'react'
import servicearrow from '../../assets/service-arrow.png';

const Service = () => {

  return (
    <div className='#service'>
      <div>
        <h1 className='text-3xl md:my-5 my-0 pt-10 font font-semibold md:mx-40 mx-4 text-with-glow' data-aos="fade-right" style={{ color: '#FFFFFF'}}>Services _____</h1>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 md:gap-40 gap-10 md:mx-40 mx-4'>
      <div className=''>
      <div className='mt-10'>
        <p className='md:text-5xl text-2xl font-semibold text-white'>Services I offer</p>
      </div>
      <div className='mt-10'>
        <h1 className='text-left text-xl font-light text-white'>I’m a full-stack developer offers end-to-end web development solutions, adept in both front-end and back-end technologies. I design user interfaces, create server-side logic, manage databases, and ensure seamless integration across the entire application stack.</h1>
      </div>
        <section className='flex text-2xl gap-5 md:my-7 my-3 text-white'>
          <div>
            <p className='font-extrabold text-4xl'>20+</p>
            <p>Project Experience</p>
          </div>
          <div><h1></h1></div>
          <div>
            <p className='font-extrabold text-4xl'>96%</p>
            <p>User Satisfaction</p>
          </div>
          <div>
            <p className='font-extrabold text-4xl'>4.7</p>
            <p>Feedback and responses</p>
          </div>
        </section>
      </div>
      <section className='flex justify-center'>
        <div>
          <div className='p-5 border border-gray-300 h-96 w-80 rounded-3xl'>
            <h1 className='capitalize text-4xl text-left font-semibold text-white'>Service list</h1>
            <div>
              <div data-aos="flip-up" className='flex justify-between rounded-xl my-5 p-3 border border-gray-100 text-white transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105'  style={{backgroundColor:'#313131'}}>
              <p className=''>Front-End</p>
              <img src={servicearrow} alt="arrow" />
              </div>
              <div data-aos="flip-up" className='flex justify-between rounded-xl my-5 p-3 border border-gray-100 text-white transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105'  style={{backgroundColor:'#313131'}}>
              <p className=''>Back-End</p>
              <img src={servicearrow} alt="arrow" />
              </div>
              <div data-aos="flip-up" className='flex justify-between rounded-xl my-5 p-3 border border-gray-100 text-white transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105'  style={{backgroundColor:'#313131'}}>
              <p className=''>Database management</p>
              <img src={servicearrow} alt="arrow" />
              </div>
              <div data-aos="flip-up" className='flex justify-between rounded-xl my-5 p-3 border border-gray-100 text-white transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105'  style={{backgroundColor:'#313131'}}>
              <p className=''>Testing Service</p>
              <img src={servicearrow} alt="arrow" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Service