import {Badge, Button, Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";



function fetchAllPosts(){


}

function PostList() {
    const baseURL = 'http://127.0.0.1:8000/api/posts/'
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(baseURL)
            .then(function (response) {
                setPosts(response.data.data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    });
    return (
        <> {posts.map((post,index) =>(
            <Card className={'mt-3'} key={index}>
            <Card.Header>
                {post.title} <span style={{float: 'right'}} > <Badge variant="success">Comments: {post.comments_count}</Badge></span>
           </Card.Header>
            <Card.Body>
            <Card.Text>
                {post.description}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
            ))}

        </>

    );
}

export default PostList;
