import React, {useContext, useEffect, useState} from "react";
import {createPost, deletePost, fetchAllComments, fetchPost} from "../../../services/PostService";
import {Badge, Button, Card, Form, Spinner} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {fetchUser} from "../../../services/UserService";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {createComment} from "../../../services/CommentService";

const PostView = (props) => {
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSelf, setIsSelf] = useState(false)

    let history = useHistory()
    const submitForm = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const commentData = {
            comment: comment,
            user_id: currentUser.id,
            post_id: post.id
        };
        const response = await createComment(commentData);
        if (response.success) {
            setComment('')
            setIsLoading(false)
            getComments()
        } else {

            setErrors(() => response.errors ? response.errors : null)
            setIsLoading(false)
        }
    };
    const deletePostHandler = async () => {
        setIsLoading(true)
        // console.log(post.id)
        const response = await deletePost(post.id);
        if (response) {
            history.push(`/posts`);
        } else {
            setIsLoading(false)
        }
    };
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
        if (postResponse.data.id === currentUser.id) {
            setIsSelf(true)
        }

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
                    {isSelf && !isLoading && (
                        <Button variant="danger" type="button" onClick={deletePostHandler}>
                            Delete
                        </Button>
                    )}
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

            <Card className={'mt-3'}>
                <Card.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group controlId="comment">
                            <Form.Control
                                type="text"
                                placeholder="Enter comment"
                                // value={password}
                                name="description"
                                as="textarea"
                                rows="3"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                        {errors && errors.comment && (
                            <p className="text-danger">{errors.comment[0]}</p>
                        )}

                        {isLoading && (
                            <Button variant="primary" type="button" disabled>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>{" "}
                            </Button>
                        )}

                        {!isLoading && (
                            <Button variant="primary" type="submit">
                                Comment
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
export default PostView;
