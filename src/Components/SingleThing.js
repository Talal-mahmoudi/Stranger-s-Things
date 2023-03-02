import {useParams} from "react-router-dom";


const SingleThing = (props) => {
    const {id} = useParams();
    const {things} = props;
    
    const [filteredThing] = things.filter((singleThing) =>{
        return singleThing._id == id;
    }) 

    // console.log(filteredThing);

    return (
        <div>
            <p>From: {filteredThing.author.username}</p>
            <p>Name: {filteredThing.title}</p>
            <p>Description: {filteredThing.description}</p>
            <p>Price: {filteredThing.price}</p>
            <p>Write a Message: </p>
            {filteredThing.willDeliver ? <p>We will Deliver</p>: <p>We will not deliver</p>}
            
        </div>
    )
}
export default SingleThing;