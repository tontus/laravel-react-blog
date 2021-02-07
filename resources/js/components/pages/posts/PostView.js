import React, {useEffect, useState} from "react";
import {fetchPost} from "../../../services/PostService";
import {Badge, Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const PostView = (props) => {
    const [post, setPost] = useState({})
    const getPostDetails = async () => {
        const postResponse = await fetchPost(props.match.params.id)
        setPost(postResponse.data)
        console.log(post)

    }
    useEffect(() => {
            getPostDetails()
        }
        , [])
    return (
        <>
            <Card className={'mt-3'}>
                <Card.Body>
                    <Card.Title>
                        {post.title}
                    </Card.Title>
                    <Card.Text>
                        {post.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
export default PostView;
