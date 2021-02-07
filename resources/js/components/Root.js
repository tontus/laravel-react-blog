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


function Root() {
    return (
        <Router>
            <>
                <Header/>

                <Container>
                    <Switch>
                        <Route path="/posts/:id" exact={true} component={PostView}/>
                        <Route path="/users" exact={true}>
                           <h1>TODO user list</h1>
                        </Route>
                        <Route path="/" exact={true}>
                            <Redirect to="/posts"/>
                        </Route>
                        <Route path="/posts" exact={true}>
                            <PostList/>
                        </Route>

                    </Switch>
                </Container>

            </>


        </Router>

    );
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root/>, document.getElementById('root'));
}
