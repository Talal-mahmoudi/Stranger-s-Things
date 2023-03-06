import { useEffect } from "react";

const HomePage = (props) =>{
    const {userData, isLoggedIn, setIsLoggedIn} = props;
    // console.log(userData)
    // console.log(isLoggedIn)
    useEffect(() =>{
        if(localStorage.getItem("token")){
            setIsLoggedIn(true);
            // console.log(isLoggedIn);
            
            props.fetchUserData();
            // console.log(userData);
        }
        else{
            console.log("No token present");
            setIsLoggedIn(false);  
        }
        
    }, [])
    return(
        <div>
            
            {
                isLoggedIn ? <p>Welcome to Stranger's Things: {userData.username}</p> : <p>Welcome To Stranger's Things</p>
            }
            {
                isLoggedIn ? <p>You can now write a post or comment on other's posts</p>: <p>View posts, or sign in to write a post</p>

            }
           
        </div>
    )
}
export default HomePage;