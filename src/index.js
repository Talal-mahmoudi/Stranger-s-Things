import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import './style.css';
import { NavBar , AllThings, SingleThing, RegisterUsers, LoginUsers, Profile, CreatePosts, HomePage } from "./Components";

const appElement = document.getElementById("app");
const root = createRoot(appElement);

const App = () =>{
    const [things, setThings] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    

   
    async function fetchThingsData(){
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts');
            const translatedData = await response.json();

            setThings(translatedData.data.posts);
            // console.log(translatedData.data.posts);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchThingsData();
    }, [])

        async function fetchUserData() {
            try {           
                const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`     
                    }
                })
                const translatedData = await response.json();
                // console.log("Below is our personal account data:")
                // console.log(translatedData);
                setUserData(translatedData.data)
            } catch (error) {
                console.log(error); 
            }
        }

    return(       
        <BrowserRouter>
            <div>
              <NavBar isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>
                
                <Routes>
                    <Route path="/" element={<HomePage userData ={userData} setIsLoggedIn={setIsLoggedIn} fetchUserData={fetchUserData} isLoggedIn={isLoggedIn} />} />
                    {/* <Route path="/posts" element={<AllThings things={things} fetchUserData={fetchUserData}setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} userData={userData} />} /> */}
                    <Route path="/posts" element={<AllThings things={things} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} fetchUserData={fetchUserData} setThings={setThings} fetchThingsData={fetchThingsData}/>} />
                    <Route path="/:id" element={<SingleThing things={things} userData={userData} />} />
                    <Route path="/users/me" element={<Profile userData={userData} setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} fetchUserData={fetchUserData} />} />
                    <Route path="/users/login" element={<LoginUsers things = {things} />} />
                    <Route path="/users/register" element={<RegisterUsers things = {things}  />} />
                    {/* <Route path="/posts" element={<CreatePosts userData={userData} setThings={setThings} things = {things}/>}/> */}
                </Routes>

            </div>
        </BrowserRouter> 
    )
}
root.render(<App />);
