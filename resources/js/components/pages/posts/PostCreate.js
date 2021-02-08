import React, {useContext, useEffect, useState} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {login} from "../../../services/AuthService";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {createPost} from "../../../services/PostService";


const PostCreate = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [currentUser,setCurrentUser] = useContext(CurrentUserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [errors,setErrors] = useState({})

    let history = useHistory()

    const submitForm = async (e) => {
        e.preventDefault();

        setIsLoading(true)


        const postData = {
            title:title,
            description:description,
            user_id:currentUser.id
        };
        const response = await createPost(postData);
        if (response.success) {
            setTitle("")
            setDescription("")
            if (response){
                history.push(`/posts`);
            }
        } else {

            setErrors(()=> response.errors ? response.errors : null)
            setIsLoading(false)
        }
    };

    return (
        <>
            <div className="header-part">
                <div >
                    <h2>Create new post</h2>
                </div>
            </div>

            <Card>
                <Card.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group controlId="title">
                            <Form.Label>Post title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        {errors && errors.title && (
                            <p className="text-danger">{errors.title[0]}</p>
                        )}



                        <Form.Group controlId="description">
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                // value={password}
                                name="description"
                                as="textarea"
                                rows="5"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        {errors && errors.description && (
                            <p className="text-danger">{errors.description[0]}</p>
                        )}

                        { isLoading && (
                            <Button variant="primary" type="button" disabled>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>{" "}
                                Saving...
                            </Button>
                        )}

                        { !isLoading && (
                            <Button variant="primary" type="submit">
                                Post
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
export default PostCreate;
