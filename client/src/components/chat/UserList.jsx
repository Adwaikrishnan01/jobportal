import React from 'react'

const UserList = ({ users, onUserClick }) => {
   
    return (
        <div>
            {users.map((user) => (
                <div className='w-full border border-y-fuchsia-200 px-2 py-1 h-20 flex items-center
                 bg-fuchsia-50' key={user.id} onClick={() => onUserClick(user)}>
                    <div className='w-1/6 mx-3'>
                        <img src='/avatar.jpg' alt='img' width={48} className='rounded-full'
                             /></div>
                    <div className="w-5/6 font-semibold text-gray-800">{user.name}</div>
                </div>
            ))}
        </div>
    //     <ul>
    //     {users.map(user => (
    //       <li
    //         key={user.id}
    //         onClick={() => onUserClick(user)}
    //         className="cursor-pointer hover:bg-gray-100 p-2 rounded"
    //       >
    //         {user.name}
    //       </li>
    //     ))}
    //   </ul>

    )
}

export default UserList