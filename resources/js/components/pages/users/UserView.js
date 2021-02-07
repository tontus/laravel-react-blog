import React, {useEffect, useState} from "react";
import {fetchAllComments, fetchPost} from "../../../services/PostService";
import {Badge, Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {fetchAllPostsOfUser, fetchUser} from "../../../services/UserService";

const UserView = (props) => {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])


    const getUserDetails = async () => {
        await fetchUser(props.match.params.id).then(res => {
                setUser(res.data)
            }
        )
    }
    const getPosts = async () => {
        await fetchAllPostsOfUser(props.match.params.id).then(res => {
                setPosts(res.data)
            }
        )
    }
    useEffect(() => {
        getUserDetails()
        getPosts()

    }, [])
    return (
        <>
            <Card className={'mt-3'}>

                <Card.Header>
                    {user.name}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Username: <Link to={`/users/${user.id}`}>{user.username}</Link></small>
                        <br/>
                        Email: {user.email}
                    </Card.Text>
                </Card.Body>
            </Card>

            <br/>
            <br/>
            <h2>
                Posts:
            </h2>

            {posts.map((post, index) => (
                <Card className={'mt-3'} key={index}>
                    <Link to={`/posts/${post.id}`}>
                        <Card.Body>
                            <Card.Text>
                                {post.title}
                            </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
            ))}
        </>
    );
}
export default UserView;
