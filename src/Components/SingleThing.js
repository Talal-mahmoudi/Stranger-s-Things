import { useState } from "react";
import {useParams} from "react-router-dom";


const SingleThing = (props) => {
    const {id} = useParams();
    const [msg, setMsg] = useState("");
    const {things, userData} = props;
    
    const [filteredThing] = things.filter((singleThing) =>{
        return singleThing._id == id;
    }) 

    async function postMessage (){
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts/${filteredThing._id}/messages`,
            {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    message : {
                        content: msg
                    }

                })
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    const handleMessage = (event) =>{
        event.preventDefault();
        if(filteredThing.author._id == userData._id){
            alert("cannot send a message to yourself")
            return;

        }
        postMessage();
        setMsg("");
    }
    console.log(filteredThing);
    const messages = filteredThing.messages;

    return (
        <div>
            <p>From: {filteredThing.author.username}</p>
            <p>Name: {filteredThing.title}</p>
            <p>Description: {filteredThing.description}</p>
            <p>Price: {filteredThing.price}</p>
            <p>Write a Message: </p>
            <form onSubmit={handleMessage}>
                
                <input type="text" placeholder="write a message" value={msg} onChange= {(event) =>setMsg(event.target.value)}></input>
                <button type="submit"> Submit the message: </button>
            </form>
            {
                !messages.length ? <div>no messages so far</div>: messages.map((singleMessage, index)=>{
                    <div key={index +1}>
                        <p>{index}. {singleMessage}</p>
                    </div>
                })
            }
            {filteredThing.willDeliver ? <p>We will Deliver</p>: <p>We will not deliver</p>}
            
        </div>
    )
}
export default SingleThing;