import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { FcGoogle } from 'react-icons/fc'
import {useNavigate} from 'react-router-dom'
import CustomGoogleLogin from '../components/GoogleLoginbtn'
import axios from 'axios'
import { API_URL } from '../utils/API'


const Register = () => {
 
    const [formData, setFormData] = useState({
      name: '',
      age: '',
      phone: '',
      email: '',
      password: '',
      gender: '',
      skills: '',
      experience: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${API_URL}/signup`, formData);
        console.log('Form submitted successfully:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

  const navigate=useNavigate()
  return (
    <section className='relative w-full bg-fuchsia-100 py-20 min-h-screen'>
      <div className="max-w-3xl sm:mx-auto mx-3 px-4 shadow-sm bg-white py-6 rounded-md">
        <div className='mx-6 md:mx-12 my-8'>
        <form onSubmit={handleSubmit}>
      <h2 className='text-3xl font-bold text-center text-fuchsia-800 mb-10'>Register</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        <Input label="Name" type="text" value={formData.name} onChange={handleChange} name="name" />
        <Input label="Age" type="text" value={formData.age} onChange={handleChange} name="age" />
        <Input label="Phone" type="text" value={formData.phone} onChange={handleChange} name="phone" />
        <Input label="Email" type="email" value={formData.email} onChange={handleChange} name="email" />
        <Input label="Password" type="password" value={formData.password} onChange={handleChange} name="password" />
        <Input label="Gender" type="text" value={formData.gender} onChange={handleChange} name="gender" />
        <Input label="Skills" type="text" value={formData.skills} onChange={handleChange} name="skills" />
        <Input label="Experience" type="text" value={formData.experience} onChange={handleChange} name="experience" />
      </div>
      <div className="text-center">
        <button className='text-white bg-fuchsia-600 py-2 px-6 w-full mt-3 font-bold
              border-solid border-2 border-fuchsia-700 hover:opacity-80
              rounded-md' type="submit">Register</button>
      </div>
    </form>

          <CustomGoogleLogin label={"Register with Google"}/>
            <hr/>
          <div className="text-sm my-3" >Already have an account?</div>
          <Button label={"Login"}  onClick={()=>{navigate('/login')} }/>
        </div>
      </div>
    </section>
 )}

export default Register;