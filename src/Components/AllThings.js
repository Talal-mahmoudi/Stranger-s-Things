import {Link} from "react-router-dom";
import { useState } from "react";

const AllThings = (props) =>{
    const [searchByName, setSearchByName] = useState("");
    const things = props.things;
    // console.log(things);


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