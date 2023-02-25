import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import '../src/style.css';

const appElement = document.getElementById("app");
const root = createRoot(appElement);

const App = () =>{
    const [things, setThings] = useState([]);

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
        
        <div>
            <p>Placeholder</p>
        </div>
    )
}

root.render(<App />);
