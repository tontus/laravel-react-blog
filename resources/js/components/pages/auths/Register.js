import React, {useState} from "react";
import {useHistory } from "react-router-dom";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import PostView from "../posts/PostView";
import {register} from "../../../services/AuthService";
const Register =() =>{
    const [name,setName] = useState("")
    const [username,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [password_confirmation,setPassword_confirmation] = useState("")
    const [errors,setErrors] = useState({})
    const [isLoading,setIsloading]= useState(false)
    let history = useHistory()

    const submitForm = async (e) => {
        e.preventDefault();
        // const { history } = this.props;
        setIsloading(true)


        const userData = {
            name: name,
            username:username,
            email:email,
            password:password,
            password_confirmation:password_confirmation,
        };
        const response = await register(userData);
        if (response.success) {
            setName("")
            setEmail("")
            setUserName("")
            setPassword("")
            history.push(`/`);
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
                    <h2>New User</h2>
                </div>
            </div>

            <Card>
                <Card.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter  Name"
                                // value={name}
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        {errors && errors.name && (
                            <p className="text-danger">{errors.name[0]}</p>
                        )}

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


                        <Form.Group controlId="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                // value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        {errors && errors.email && (
                            <p className="text-danger">{errors.email[0]}</p>
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
                        <Form.Group controlId="password_confirmation">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password again"
                                // value={password_confirmation}
                                name="password_confirmation"
                                onChange={(e) => setPassword_confirmation(e.target.value)}
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
                                Sign up
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
export default Register;
