//have a link to registerUSers.js
import { useState } from "react";
import RegisterUsers from "./RegisterUsers";
import {Link, useNavigate} from "react-router-dom";

const LoginUsers = (props) =>{
    const {things}  = props;
    const[login, setLogin] = useState("");
    const [pass, setPass] = useState("");


    const navigate = useNavigate();

    async function sendLoginRequest(event) {
        event.preventDefault();
        try {
            if (pass.length < 8) {
                alert("Password is too short. Must be at least 8 characters")
                return;
            } else if (login.length < 8) {
                alert("Username is too short. Must be at least 8 characters");
                return; 
            }

            const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                },
                body: JSON.stringify({
                    user: {
                        username: login,
                        password: pass
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

    return(
        <div>
            <h2>Login: </h2>
            <form onSubmit={sendLoginRequest}>
                <input 
                    type="text"
                    placeholder="username"
                    value={login}
                    onChange={(event) =>setLogin(event.target.value)}
                
                />
               
                <input 
                    type="text"
                    placeholder="password"
                    value={pass}
                    onChange={(event) =>setPass(event.target.value)}
                />
                <br />
                <button type="submit">Login</button>
                <br />
                <Link to="/users/register" element={<RegisterUsers />}>Don't have an account? Sign Up here!</Link>
            </form>
        </div>

    )
   
}
export default LoginUsers;