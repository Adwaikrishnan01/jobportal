import { Link } from "react-router-dom";
import UserMenu from "./UserMenu.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "../../redux/slices/authSlice.js";

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log("currentUser",user)
    useEffect(() => {
      if (isAuthenticated) {
        dispatch(fetchCurrentUser());
      }
    }, [isAuthenticated, dispatch]);
    return ( 
        <div className="flex w-full justify-between items-center 
        shadow-sm md:px-4 lg:px-8 px-2 py-3">
            <div className="font-bold text-2xl text-fuchsia-800">Jobportal</div>
            {<div className="flex items-center">
                <div className="mx-8 text-fuchsia-800 text-lg space-x-5">
                <Link to='/' className=" hover:text-fuchsia-500 font-serif">Home</Link>
                    <Link to='/' className=" hover:text-fuchsia-500 font-serif">Feeds</Link></div>
                    <UserMenu user={user}/></div>}
        </div>

     );
}
 
export default Navbar;