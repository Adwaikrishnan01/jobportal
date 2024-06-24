import UserMenu from "./UserMenu.jsx";

const Navbar = () => {
    return ( 
        <div className="flex w-full justify-between items-center 
        shadow-sm md:px-4 lg:px-8 px-2 py-3">
            <div className="font-bold text-2xl text-fuchsia-800">Jobportal</div>
            <div><UserMenu/></div>
        </div>

     );
}
 
export default Navbar;