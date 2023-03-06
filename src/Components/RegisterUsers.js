//once registered, have them, logged in, and nagivate() back to original "AllThings.js" page with them logged in 

import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

const RegisterUsers = (props) =>{
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState(""); 
    // const { setIsLoggedIn, setUserData} = props;
    

    const navigate = useNavigate();
    

    async function sendRegisterRequest(event) {
        event.preventDefault();
        try {
            if (newPassword.length < 8) {
                alert("Password is too short. Must be at least 8 characters")
                return;
            } else if (newUsername.length < 8) {
                alert("Username is too short. Must be at least 8 characters");
                return; 
            }

            const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                },
                body: JSON.stringify({
                    user: {
                        username: newUsername,
                        password: newPassword
                    }
                })
            })
            const translatedData = await response.json(); 

            // console.log(translatedData);

            if (!translatedData.success) {
                alert("Account was not successfully created. Please try again!")
            } else {
                const myJWT = translatedData.data.token;
                // console.log(myJWT);
                localStorage.setItem("token", myJWT)
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <br/>
            <div className="registerForm">
                <h2>Sign up for a new account: </h2>

                <form onSubmit={sendRegisterRequest}>
                    <input
                        className="registerInput"  
                        type="text" 
                        placeholder="New Username"
                        value={newUsername}
                        onChange={(event) => setNewUsername(event.target.value)}
                    />
                    <input 
                        className="registerInput"
                        type="text"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(event) =>setNewPassword(event.target.value)}
                    />
                    <br />
                    <br/>
                    <button type="submit" className="registerButton">Create Account</button>
                    <br/>
                    <br/>
                </form>
            </div>
        </div>
    )

}
export default RegisterUsers;