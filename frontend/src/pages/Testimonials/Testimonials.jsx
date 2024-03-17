import React from 'react'
import apas from '../../assets/apas.png';
import testleft from '../../assets/test-left.png';
import testright from '../../assets/test-right.png';
import profile from '../../assets/profile.png';
const Testimonials = () => {
  return (
    <div className='my-10'>
        <div>
            <h1 className='text-3xl md:mx-40 mx-4 text-with-glow' style={{ color: '#FFFFFF'}} data-aos="fade-right">What other say about me _____</h1>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 md:mx-40 mx-4 my-10'>
        <div className='border text-center text-white px-10 border-gray-300 rounded-3xl py-10 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{backgroundColor:'#3D3D3D'}}>
            <img src={apas} alt="apas" className=' h-7' />
            <p className='text-left font-light text-2xl my-2'>Working with Full Stack Developer was a game-changer! Their mastery of both front-end and back-end development is impressive. They tackled challenges effortlessly and delivered exceptional results. Highly recommend NGO full stack development project!</p>
        <div className='flex my-5 justify-around'>
            <div>
                <img src={testleft} alt="left" className='h-10' />
            </div>
            <div>
                <img src={profile} alt="profile" className='h-16' />
                <h1 className='text-xl text-white'>Asst.professor</h1>
            </div>
            <div>
            <img src={testright} alt="right" className='h-10' />
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Testimonials;