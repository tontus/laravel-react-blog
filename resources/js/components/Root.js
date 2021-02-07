import React from 'react';
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


function Root() {
    return (
        <Router>
            <>
                <Header/>

                <Container>
                    <Switch>
                        <Route path="/posts/:id" exact={true} component={PostView}/>
                        <Route path="/users/:id" exact={true} component={UserView}/>
                        <Route path="/users" exact={true}>
                           <UserList/>
                        </Route>
                        <Route path="/" exact={true}>
                            <Redirect to="/posts"/>
                        </Route>
                        <Route path="/posts" exact={true}>
                            <PostList/>
                        </Route><Route path="/register" exact={true}>
                            <Register/>
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
