//GET /users/me request

import { useEffect, useState } from "react";

const Profile = (props) =>{

    const {userData, setIsLoggedIn, fetchUserData, setUserData} = props;
    const [userPost, setUserPost] = useState([]);
    const comments = userData.messages;


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
        

        async function fetchUserData() {
            try {           
                const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`     
                    }
                })
                const translatedData = await response.json();
     
                setUserData(translatedData.data)
            } catch (error) {
                console.log(error); 
            }
        }
    }, [])

    let myUserData = userData.posts ? userData.posts.filter((singlePost)=>{
        if(singlePost.active){
            return singlePost
        }
    }) : [];
    async function deletePost(event){
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts/${event.target.value}`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`  
                }
            });
            const translatedData = await response.json();
            console.log(translatedData)

            if (translatedData.success) {
                let filteredPosts = myUserData.filter((singlePost) => {
                    if (singlePost._id != event.target.value) {
                        return singlePost;
                    }
                })

                // console.log(filteredPosts);
                myUserData = filteredPosts;


            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        
        setUserPost(userData.posts)

    }, [])


    let myComments = comments.filter((mySingleMessage) =>{
        if(mySingleMessage.fromUser._id == userData._id){
            // console.log(mySingleMessage);
            return mySingleMessage;

        }
    })
    // console.log(myComments);
    // console.log(myUserData);
    return(
        <div>
            <h3>{userData.username}'s Posts: </h3>
            
            <section>
            {
                !myUserData.length ? <div>You don't have any posts</div> : myUserData.map((singlePost) =>{
                    return(
                        <div key={singlePost._id}>
                            <p>Title: {singlePost.title}</p>
                            <p>Messages:</p>
                            {
                                !singlePost.messages.length ? <div>No messages</div>: singlePost.messages.map((singleComment, index)=>{
                                    return(
                                        <div key={index}>
                                            <p>{index+1}. {singleComment.content} </p>
                                        </div>
                                    )
                                })
                            }
                            <br/>
                           
                            <button value={singlePost._id} onClick={deletePost} >
                                Delete {singlePost.title}
                            </button>
                        </div>
                    )
                })
            }
            </section>
            <h3> Messages from {userData.username} : </h3>
            <section>
            {
                !myComments.length? <div>You havent left any comments</div> : myComments.map((singleComment) =>{
                    return(
                        <div key={singleComment._id}>
                            <p>The post: {singleComment.post.title}</p>
                            <p>Your comment: {singleComment.content}</p>
                        </div>
                    )
                })
            }
            </section>


        </div>

    )

}
export default Profile;