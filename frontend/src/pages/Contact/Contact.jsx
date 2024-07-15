import React, { useState } from 'react';
import servicearrow from '../../assets/service-arrow.png';
import twittericon from '../../assets/twittericon.png';
import linkedin from '../../assets/linkedinicon.png';
import facebookicon from '../../assets/facebookicon.png';
import instaicon from '../../assets/instaicon.png';
import githubicon from '../../assets/githubicon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    emailjs.send('service_vu9dzr8', 'template_tmp0x2k', templateParams, 'l6rbabXEYkrhk3WSb')
      .then((result) => {
        toast.success('Email sent successfully', result.text);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        toast.error('Error sending email:', error.text);
      });
  };

  return (
    <div className='#contact'>
      <h1 className='text-3xl md:my-5 my-3 pt-10 font font-semibold md:mx-40 mx-4 text-with-glow' data-aos="fade-right" style={{ color: '#FFFFFF' }}>Book a call _____</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 md:mx-40 mx-4'>
        <section className='flex justify-center my-10'>
          <div>
            <div className='p-5 border border-gray-300 h-6/7 w-80 rounded-3xl'>
              <h1 className='capitalize text-4xl text-center font-semibold text-white'>Follow me on </h1>
              <div>
                <a href='https://github.com/manicdon7' data-aos="flip-up" className='flex justify-between rounded-xl my-5 p-3 border border-gray-100 text-white transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{ backgroundColor: '#313131' }}>
                  <p className=''>Github</p>
                  <img className='h-7' src={githubicon} alt="github" />
                </a>
                <a href='https://twitter.com/manicdon7' data-aos="flip-up" className='flex justify-between rounded-xl my-5 p-3 border border-gray-100 text-white transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{ backgroundColor: '#313131' }}>
                  <p className=''>Twitter</p>
                  <img src={twittericon} alt="twitter" />
                </a>
                <a href='https://www.linkedin.com/in/mani-kandan-1b0846248/' data-aos="flip-up" className='flex justify-between rounded-xl my-5 p-3 border border-gray-100 text-white transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{ backgroundColor: '#313131' }}>
                  <p className=''>LinkedIn</p>
                  <img src={linkedin} alt="linkedin" />
                </a>
                <a href='https://www.instagram.com/mr.vocalist._/' data-aos="flip-up" className='flex justify-between rounded-xl my-5 p-3 border border-gray-100 text-white transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{ backgroundColor: '#313131' }}>
                  <p className=''>Instagram</p>
                  <img src={instaicon} alt="instagram" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className='md:my-10 my-2'>
            <form onSubmit={handleSubmit} className='md:my-10 my-2'>
              <div className=''>
                <h1 className='text-xl md:text-3xl font-medium text-white'>Name</h1>
                <input type="text" name="name" value={formData.name} className="block md:py-2.5 py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-200" onChange={handleChange} />
              </div>
              <div className='mt-10'>
                <h1 className='text-xl md:text-3xl font-medium text-white'>Email</h1>
                <input type="email" name="email" value={formData.email} className="block md:py-2.5 py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-200" onChange={handleChange} />
              </div>
              <div className='mt-10'>
                <h1 className='text-xl md:text-3xl font-medium text-white'>Message</h1>
                <input type="text" name="message" value={formData.message} className="block md:py-2.5 py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-200" onChange={handleChange} />
              </div>
              <div className='md:py-5 py-3 px-10 md:px-20 text-white mt-5'>
                <button type="submit" className='border-2 text-xl rounded-3xl px-10 py-2 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105 border-glow' style={{ borderColor: '#FF4900' }}>Send</button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="colored"
      />
    </div>
  )
}

export default Contact;
