import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import PostView from "../posts/PostView";
import {login} from "../../../services/AuthService";
const Register =() =>{
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState({})
    const [isLoading,setIsloading]= useState(false)
    let history = useHistory()

    const submitForm = async (e) => {
        e.preventDefault();
        // const { history } = this.props;
        setIsloading(true)


        const userData = {
            username:username,
            password:password,
        };
        const response = await login(userData);
        if (response.success) {
            setUserName("")
            setPassword("")
            return <Redirect to='/' />
        } else {
            console.log("response.errors", response.message);
            setErrors(response.message)
            setIsloading(false)
        }
    };

    return (
        <>
            <div className="header-part">
                <div >
                    <h2>Log in</h2>
                </div>
            </div>

            <Card>
                <Card.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group controlId="username">
                            <Form.Label>username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter  username"
                                // value={username}
                                name="username"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>
                        {errors && errors.username && (
                            <p className="text-danger">{errors.username[0]}</p>
                        )}



                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                // value={password}
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {errors && errors.password && (
                            <p className="text-danger">{errors.password[0]}</p>
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
                                Sign in
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
export default Register;
