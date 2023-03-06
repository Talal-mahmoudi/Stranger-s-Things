import { Link } from "react-router-dom";
import LoginUsers from "./LoginUsers";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Profile from "./Profile";



const NavBar = (props) =>{
    // const [userData, setUserData] = useState({});
    const {isLoggedIn, userData, setIsLoggedIn} = props
    
    // const navigate = useNavigate();
 
    function logoutUser(){
        if(localStorage.getItem("token")){
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        }
    }


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
                    {/* Posts */}
                    <Link to="/posts">Posts</Link>
                </div>
                <div>
                    {/* Profile */}
                    { isLoggedIn ? <Link to={"/users/me"} element={<Profile />}>Profile</Link> : <div>Login to see your profile!</div> }
                </div>
                <div>
                    {/* Link to login page... ternary if token is present.  show button for logout feature,
                        else <link> to login so we can login  */}

                        {isLoggedIn ? <Link to={"/"} onClick={logoutUser}>Logout</Link> :<Link to={"/users/login"} element={<LoginUsers />}>Login</Link>}
                        {/* {isLoggedIn ? <button onClick={logoutUser}>Logout</button> :<Link to={"/users/login"} element={<LoginUsers />}>Login</Link>} */}


                    {/* <Link to={"/users/login"} element={<LoginUsers />}>Login</Link> */}
                    {/* Login */}
                </div>
            </nav>
        </div>

    )


}
export default NavBar;