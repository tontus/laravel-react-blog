import {Badge, Button, Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";



function fetchAllPosts(){


}

function PostList() {
    const baseURL = 'http://127.0.0.1:8000/api/posts/'
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(10);
    const [showAllLoadButton,setShowAllLoadButton] = useState(true)

    const showMorePosts=()=>{
        setVisible((visible+10))
        if(visible>= posts.length){
            setShowAllLoadButton(false)
        }
    }
    useEffect(() => {
        axios.get(baseURL)
            .then(function (response) {
                setPosts(response.data.data)
                if(visible>= posts.length){
                    setShowAllLoadButton(false)
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    });
    return (
        <> {posts.slice(0,visible).map((post,index) =>(
            <Card className={'mt-3'} key={index}>
            <Card.Header>
                {post.title} <span style={{float: 'right'}} > <Badge variant="success">Comments: {post.comments_count}</Badge></span>
           </Card.Header>
            <Card.Body>
            <Card.Text>
                {post.description.substring(0, 200)} ... ... ...
            </Card.Text>
            <Button variant="primary">Read more</Button>
            </Card.Body>
            </Card>
            ))}
            <div className="text-center mt-3">
                <Button className="btn btn-success" onClick={showMorePosts}>Load More...</Button>
            </div>

        </>

    );
}

export default PostList;
