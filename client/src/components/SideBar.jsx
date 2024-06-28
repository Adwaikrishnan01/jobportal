import MenuItem from './navbar/MenuItem'

const Sidebar = () => {

 const sidebarlist=["skills","qualification","experience","salary","location"]


    return ( 
         <div className="w-1/6 bg-gray-100 py-4 px-2 shadow-md">
            <div className="font-bold text-2xl text-gray-700 w-full text-center mb-3">Filter</div>
          
         { sidebarlist.map((item,index)=>(
            <MenuItem label={item} key={index}/>
            
         ))}
         </div>

     );
}
 
export default Sidebar;