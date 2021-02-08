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
import CurrentUserContext, {CurrentUserProvider} from "./contexts/CurrentUserContext";


function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        if (checkAuth()) {
            return true
        } else return false
    })
    const [currentUser,setCurrentUser] = useState({})
    useEffect(()=>{
        if(checkAuth()){
            setCurrentUser(checkAuth())
        }
    },[])

    return (
        <Router>
            <>
                <CurrentUserProvider>
                <Header/>
                <Container>
                    <Switch>
                        <PrivateRoute path="/posts/:id" authed={isLoggedIn} exact={true} component={PostView}/>
                        <PrivateRoute path="/users/:id" authed={isLoggedIn} exact={true} component={UserView}/>
                        <PrivateRoute path="/users" authed={isLoggedIn} exact={true} component={UserList}/>

                        <PrivateRoute path="/posts" authed={isLoggedIn} exact={true} component={PostList}/>
                        <Route path="/register" exact={true}>
                            <Register/>
                        </Route>
                        <Route path="/login" exact={true}>
                            <Login/>
                        </Route>
                        <Route path="/" exact={true} >
                            <Redirect to="/posts"/>
                        </Route>


                    </Switch>
                </Container>
                <Footer/>
                </CurrentUserProvider>
            </>


        </Router>

    );
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root/>, document.getElementById('root'));
}
