import {Badge, Button, Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {fetchAllPosts} from "../../../services/PostService";
import {Link} from "react-router-dom";


function PostList() {
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(10);
    const [showAllLoadButton, setShowAllLoadButton] = useState(true)

    const showMorePosts = () => {
        setVisible((visible + 10))
        if (visible >= posts.length) {
            setShowAllLoadButton(false)
        }
    }
    const getAllPosts = async () => {
        const getResponse = await fetchAllPosts();
        setPosts(getResponse.data)
    }
    useEffect(() => {
        getAllPosts().then(r => {
                if (visible >= posts.length) {
                    setShowAllLoadButton(false)
                }
            }
        )
    }, []);
    return (
        <>  <Button variant="success" className={'mt-3'}><Link to={'/posts/create'} className={"text-white"}>+ Create Post</Link></Button>
            {posts.slice(0, visible).map((post, index) => (
            <Card className={'mt-3'} key={index}>
                <Card.Header>
                    {post.title} <span style={{float: 'right'}}> <Badge
                    variant="success">Comments: {post.comments_count}</Badge></span>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {post.description.substring(0, 200)} (. . . . .)
                    </Card.Text>
                    <Button variant="primary">
                        <Link to={`/posts/${post.id}`} className={"text-white"}>Read more</Link>
                    </Button>
                </Card.Body>
            </Card>
        ))}
            <div className="text-center mt-3">
                <Button className="btn btn-success" onClick={showMorePosts}>Load More...</Button>
            </div>

        </>

    );
}

export default PostList;
