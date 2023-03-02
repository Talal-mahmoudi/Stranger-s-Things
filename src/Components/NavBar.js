import { Link } from "react-router-dom";
import LoginUsers from "./LoginUsers";
import {useState, useEffect} from "react";



const NavBar = (props) =>{
    // const [userData, setUserData] = useState({});
    const {isLoggedIn, userData} = props
 


    return(
        <div>
            <nav>
                <div>
                    <h2>Stranger's Things</h2>
                </div>
                <div>
                    <div>
                        {isLoggedIn ?  <h2>Welcome, {userData.username} </h2>: <h2>Please sign in</h2>}
                        
                    </div>
                </div>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    Posts
                </div>
                <div>
                    Profile
                </div>
                <div>
                    {/* Link to login page... ternary if token is present.  show button for logout feature,
                        else <link> to login so we can login  */}
                        {isLoggedIn ? "Logout" :<Link to={"/users/login"} element={<LoginUsers />}>Login</Link>}
                    {/* <Link to={"/users/login"} element={<LoginUsers />}>Login</Link> */}
                    {/* Login */}
                </div>
            </nav>
        </div>

    )


}
export default NavBar;