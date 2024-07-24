import React from 'react'

const Admission = () => {

  const admissionlist=[
    {
      id:1,
      title:"Create Profile",
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex officia dolore sapiente illo sequi quo? Neque voluptates non aliquam nam atque repudiandae tenetur dicta, consequuntur, praesentium autem suscipit fuga quod!"
    },
    {
      id:2,
      title:"Select Interest",
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex officia dolore sapiente illo sequi quo? Neque voluptates non aliquam nam atque repudiandae tenetur dicta, consequuntur, praesentium autem suscipit fuga quod!"
    },
    {
      id:3,
      title:"Compare University",
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex officia dolore sapiente illo sequi quo? Neque voluptates non aliquam nam atque repudiandae tenetur dicta, consequuntur, praesentium autem suscipit fuga quod!"
    },
    {
      id:4,
      title:"Start Applying",
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex officia dolore sapiente illo sequi quo? Neque voluptates non aliquam nam atque repudiandae tenetur dicta, consequuntur, praesentium autem suscipit fuga quod!"
    },
  ]
  return (
    <section className="bg-gray-200 py-10">
      <div className='max-w-7xl flex px-14 py-12 mx-auto'>
      <div className="w-1/2 mx-auto px-4 sm:px-6 hidden md:flex">
       <img className='w-full rounded-md' src='admission/img1.jpg' alt='img'/>
      </div>
      <div className='w-5/6 md:w-1/2'>
        <div className='text-3xl font-semibold text-green-700 pb-6 text-center'>Get admission in 4 easy steps</div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-center'>
      {admissionlist.map(list=>(
          <div className='flex flex-col gap-2 bg-white rounded-md py-4 px-2 hover:bg-green-100' key={list.id}>
                    <div className='flex flex-row items-center'>
                      <div className='py-2 px-4 bg-green-600 text-white rounded-md'>{list.id}</div>
                      <div className='text-xl mx-3'>{list.title}</div>
                    </div>
                    <div className="flex">
                    <div className="w-1/6"></div>
                    <div className='text-gray-600 line-clamp-4 w-5/6'>{list.description}</div>
                  </div>
                  </div>
      ))}
      </div></div></div>
    </section>
  )
}

export default Admission