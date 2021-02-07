import React, {useEffect, useState} from "react";
import {fetchAllComments, fetchPost} from "../../../services/PostService";
import {Badge, Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fetchUser} from "../../../services/UserService";

const PostView = (props) => {
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const [comments, setComments] = useState([])


    const getPostDetails = async () => {
        await fetchPost(props.match.params.id).then(res => {
                setPost(res.data)
                getAuthorDetails(res.data.user_id)
            }
        )
    }
    const getComments = async () => {
        await fetchAllComments(props.match.params.id).then(res => {
                setComments(res.data)
            }
        )
    }
    const getAuthorDetails = async (id) => {
        const postResponse = await fetchUser(id)
        setAuthor(postResponse.data)

    }
    useEffect(() => {
        getPostDetails()
        getComments()

    }, [])
    return (
        <>
            <Card className={'mt-3'}>

                <Card.Header>
                    {post.title}
                    <></>
                    <br/>
                    <small>By: <Link to={`/users/${author.id}`}>{author.username}</Link></small>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {post.description}
                    </Card.Text>
                </Card.Body>
            </Card>

            <br/>
            <br/>
            <h2>
                Comments:
            </h2>

            {comments.map((comment, index) => (
                <Card className={'mt-3'} key={index}>
                    <Card.Body>
                        <Card.Text>
                            {comment.comment}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}
export default PostView;
