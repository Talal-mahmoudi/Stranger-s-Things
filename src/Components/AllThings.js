import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

const AllThings = (props) =>{
    const [searchByName, setSearchByName] = useState("");
    const {things, setIsLoggedIn, setUserData, isLoggedIn, userData} = props;
    // console.log(things);

    useEffect(() =>{
        if(localStorage.getItem("token")){
            setIsLoggedIn(true);
            console.log(isLoggedIn);
            
            fetchUserData();
            console.log(userData);
        }
        else{
            console.log("No token present");
            setIsLoggedIn(false);  
        }
        async function fetchUserData() {
            try {           
                const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`     
                    }
                })
                const translatedData = await response.json();
                console.log("Below is our personal account data:")
                console.log(translatedData);
                setUserData(translatedData.data)
            } catch (error) {
                console.log(error); 
            }
        }
    }, [])


    let filterThingsByName = things.filter((singleThing) =>{
        let lowerCaseThing = singleThing.title.toLowerCase();
        return lowerCaseThing.includes(searchByName.toLowerCase())
    })

    return (
        
        <div>
            <div>
                <p className="inputBar">Name: </p>
                <input type="text" placeholder="Search by name." onChange={(event) =>{
                    setSearchByName(event.target.value);
                }}>
                </input>
            </div>
            <section>
                {
                    !filterThingsByName.length ? <div>loading data...</div> : filterThingsByName.map((singleThing) =>{
                        return(
                            <div key={singleThing._id}>
                                {/* <Link to={`/${singleThing.author._id}`}> Item: {singleThing.title}</Link>  */}
                                <p>item title: {singleThing.title}</p>
                                <p>item price: {singleThing.price}</p>
                                <Link to={`/${singleThing._id}`}> See detailed view</Link> 
                            </div>
                        )
                    }) 
                }
            </section>
        </div>
    )

}
export default AllThings;