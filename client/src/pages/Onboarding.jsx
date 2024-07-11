import React from 'react'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/AxiosConfig'
const Onboarding = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleClick=async()=>{
        try{
            const response=await axios.put('/initial')
            if(response.status===200){
                navigate('/')
            }
        }catch(error){
            console.log(error)
        }
    }
    return ( 
        <section className='max-w-5xl mx-auto my-10'>
            <div className='space-y-8 flex justify-center items-center flex-col'>
                <div className='flex'>
                    <span className='text-gray-800 capitalize text-4xl font-sans'>Hello </span>
                    <img src='/hand.png' width={40} height={40} className='mx-2' alt="Waving hand" />
                    <span className='text-gray-800 capitalize text-4xl font-sans'>,{user.name}</span>
                </div>
                <div className='text-gray-700'>Choose which role you want to be assigned to :</div>
                <div className='w-1/4'><Button outline label={"Continue as a candidate"} onClick={handleClick}/></div>
                <div className='w-1/4'><Button outline label={"Register as an employer"} 
                onClick={async()=>{dispatch(openModal('employer'))
                }}/></div>
            </div>
        </section>
    )
}

export default Onboarding