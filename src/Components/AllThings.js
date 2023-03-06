import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import CreatePosts from "./CreatePosts";

const AllThings = (props) =>{
    const {things, setIsLoggedIn, setUserData, isLoggedIn, userData, setThings, fetchThingsData, fetchUserData} = props;
    const [searchByName, setSearchByName] = useState("");
    const [filterThingsByName, setFilterThingsByName] = useState(!things.length ? [] : things);
    

    useEffect(() => {
        fetchThingsData();
    }, [])
    
    useEffect(()=>{
       
        if(things.length){
           setFilterThingsByName(things.filter((singleThing) =>{
            // console.log(singleThing);

            let lowerCaseThing = singleThing.title.toLowerCase();
            
            return lowerCaseThing.includes(searchByName.toLowerCase())
        })
        // console.log("this is the all Things useEffect");
        // console.log(filterThingsByName)) 
           )
        }
    
    }, [searchByName])

    return (

        
        <div>
            <CreatePosts setIsLoggedIn={setIsLoggedIn} fetchUserData={fetchUserData} isLoggedIn={isLoggedIn} filterThingsByName={filterThingsByName} setFilterThingsByName={setFilterThingsByName} setThings={setThings}/>
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