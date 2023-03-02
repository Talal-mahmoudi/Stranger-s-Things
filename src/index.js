import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import '../src/style.css';
import { NavBar , AllThings, SingleThing, RegisterUsers, LoginUsers } from "./Components";

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
            console.log(translatedData.data.posts);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchThingsData();
    }, [])


    return(       
        <BrowserRouter>
            <div>
              <NavBar isLoggedIn = {isLoggedIn} userData={userData}/>
                
                <Routes>
                    <Route path="/" element={<AllThings things={things} setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} 
                    isLoggedIn={isLoggedIn} userData={userData} />} />
                    <Route path="/:id" element={<SingleThing things={things} />} />
                    {/* <Route path="/users" element={<Profile />} /> */}
                    <Route path="/users/login" element={<LoginUsers things = {things} />} />
                    <Route path="/users/register" element={<RegisterUsers things = {things}  />} />
                </Routes>

            </div>
        </BrowserRouter> 
    )
}
root.render(<App />);
