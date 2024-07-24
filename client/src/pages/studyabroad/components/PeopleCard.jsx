import React from 'react'

const PeopleCard = () => {

const people=[
  {
    id:1,
    name:"Niel Adam",
    image:"/people/img1.jpg",
    heading:"Study in Sweden is good but no help available",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati eligendi ipsa explicabo, expedita consequatur dolorem odit possimus fugiat nostrum nesciunt, reprehenderit, sint temporibus laboriosam architecto nulla tempore? Quis, inventore est?"
  },
  {
    id: 2,
    name: "Emma Johnson",
    image: "/people/img3.jpg",
    heading: "Opportunities in Canada for International Students",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: 3,
    name: "Liam Brown",
    image: "/people/img2.jpg",
    heading: "Challenges of Studying in the USA",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  },
  {
    id: 4,
    name: "Olive Smith",
    image: "/people/img4.jpg",
    heading: "Affordable Education Options in Germany",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
  },
]

  return (
  <>
    {people.map(item=>(
      <div className='flex flex-col bg-white gap-1 px-3 py-4 rounded-sm w-full' key={item.id}>
        <div><img className='w-full bg-cover rounded-sm' src={item.image} alt='img'/></div>
        <div className='text-green-700'>{item.name}</div>
        <div className='font-semibold text-xl line-clamp-2'>{item.heading}</div>
        <div className='text-sm text-gray-600 line-clamp-4'>{item.description}</div>
        </div>
    ))}
  </>
  )
}

export default PeopleCard