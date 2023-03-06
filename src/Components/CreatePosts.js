import { useState, useEffect } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";


const CreatePosts = (props) =>{

    const{userData, things, setThings, isLoggedIn, setFilterThingsByName, filterThingsByName, setIsLoggedIn, fetchUserData} = props;
    // console.log(isLoggedIn);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [location, setLocation] = useState("[On Request]");
    const [deliver, setDeliver] = useState(false);

    const[formOnOrOff, setFormOnOrOff] = useState(false);

    const navigate = useNavigate();

    async function sendNewPostRequest(event){
        event.preventDefault();
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        location: location,
                        willDeliver: deliver
                    }
                })
            });
            const translatedData = await response.json();
            setFilterThingsByName([...filterThingsByName, translatedData.data.post])
            navigate("/posts");
            // return result;       
            
        } catch (error) {
            console.log(error);
        }

    }

    function setForm(){
        if(localStorage.getItem("token")){
            setFormOnOrOff(true);
        }
        else{
            setFormOnOrOff(false);
        }
    }

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
            { !isLoggedIn ?  <div>Sign in to create a post</div> : <div><button onClick={setForm} >Create a post</button></div>}
            {formOnOrOff?  <form onSubmit={sendNewPostRequest}>
                <input type="text" placeholder="Title" onChange={(event) =>{
                    setTitle(event.target.value)
                }}></input>
                <input type="text" placeholder="Descrption" onChange={(event)=>{
                    setDescription(event.target.value)
                }}></input>
                <input type="text" placeholder="Price" onChange={(event) =>{
                    setPrice(event.target.value)
                }}></input>
                <input type="text" placeholder="Location" onChange={(event) =>{
                    setLocation(event.target.value)
                }}></input>
                <label htmlFor="checkbox">Will Deliver?</label>
                <input type="checkbox" onChange={(event)=>{
                    setDeliver(!deliver);
                }} />

                <button type="submit">Create Post</button>

            </form>: ""}

            {/* <p>Placeholder</p> */}
        </div>
    )

}
export default CreatePosts;