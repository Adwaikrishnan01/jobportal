import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { FcGoogle } from 'react-icons/fc'



const Register = () => {
  return (
    <section className='relative w-full bg-fuchsia-100 py-20 min-h-screen'>
      <div className="max-w-3xl sm:mx-auto mx-3 px-4 shadow-sm bg-white py-6 rounded-md">
        <div className='mx-6 md:mx-12 my-8'>
          <form >
            <h2 className='text-3xl font-bold text-center text-fuchsia-800 mb-10'>Register</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              
            <Input
                label={"Name"}
                type="text"
                 // value={name}
                onChange={() => { }}
                />
             <Input
                label={"Age"}
                type="text"
                // value={age}
                onChange={() => { }}
              />   
              <Input
                label={"Phoneno"}
                type="text"
                // value={phone}
                onChange={() => { }}
              />
              <Input
                label={"Email"}
                type="email"
                //value={email}
                onChange={() => { }}
              />
              <Input
                label={"Password"}
                type="password"
                //value={password}
                onChange={() => { }}
              />
              <Input
                label={"Gender"}
                type="text"
                // value={age}
                onChange={() => { }}
              /> 
              <Input
                label={"Skills"}
                type="text"
                // value={age}
                onChange={() => { }}
              /> 
              <Input
                label={"Experience"}
                type="text"
                // value={age}
                onChange={() => { }}
              /> 
              
            </div>
            <div className="text-center">
              <button className='text-white bg-fuchsia-600 py-2 px-6 w-full mt-3 font-bold
         border-solid border-2 border-fuchsia-700 hover:opacity-80
        rounded-md' type="submit">Register</button>
            </div>
          </form>

          <Button icon={FcGoogle} label={"Register with google"}
            onClick={() => { }} outline />
          <div className="text-sm my-2">Already have an account?</div>
          <Button label={"Login"} onClick={() => { navigate('/login') }} />
        </div>
      </div>
    </section>
  )
}

export default Register