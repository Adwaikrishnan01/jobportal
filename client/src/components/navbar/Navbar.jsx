import { Link } from "react-router-dom";
import UserMenu from "./UserMenu.jsx";

const Navbar = ({user}) => {
    return ( 
        <div className="flex w-full justify-between items-center 
        shadow-sm md:px-4 lg:px-8 px-2 py-3">
            <div className="font-bold text-2xl text-fuchsia-800">Jobportal</div>
            {<div className="flex items-center">
                <div className="mx-8 text-fuchsia-800 text-lg">
                    <Link to='/post-job'>Job</Link></div>
                    <UserMenu user={user}/></div>}
        </div>

     );
}
 
export default Navbar;