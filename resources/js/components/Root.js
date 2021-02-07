import React from 'react';
import ReactDOM from 'react-dom';
import {Alert, Card, Container} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PostList from "./pages/posts/PostList";
import Header from "./layout/Header";


function Root() {
    return (
        <Router>
            <>
                <Header/>

                <Container>
                    <Switch>
                        <Route path="/users">
                           <h1>TODO user list</h1>
                        </Route>
                        <Route path="/">
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
