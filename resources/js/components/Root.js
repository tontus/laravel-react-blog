import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Alert, Card, Container} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import PostList from "./pages/posts/PostList";
import Header from "./layout/Header";
import PostView from "./pages/posts/PostView";
import UserList from "./pages/users/UserList";
import UserView from "./pages/users/UserView";
import Footer from "./layout/Footer";
import Register from "./pages/auths/Register";
import Login from "./pages/auths/Login";
import {checkAuth} from "../services/AuthService";
import PrivateRoute from "./PrivateRoute";


function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        if (checkAuth()) {
            return true
        } else false
    })
    useEffect(() => {

    }, [])
    return (
        <Router>
            <>
                <Header/>
                <Container>
                    <Switch>
                        <PrivateRoute path="/posts/:id" authed={isLoggedIn} exact={true} component={PostView}/>
                        <PrivateRoute path="/users/:id" authed={isLoggedIn} exact={true} component={UserView}/>
                        <PrivateRoute path="/users" authed={isLoggedIn} exact={true} component={UserList}/>
                        <PrivateRoute path="/" authed={isLoggedIn} exact={true} component={PostView}/>
                        <PrivateRoute path="/posts" authed={isLoggedIn} exact={true} component={PostList}/>
                        <Route path="/register" exact={true}>
                            <Register/>
                        </Route>
                        <Route path="/login" exact={true}>
                            <Login/>
                        </Route>

                    </Switch>
                </Container>
                <Footer/>

            </>


        </Router>

    );
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root/>, document.getElementById('root'));
}
