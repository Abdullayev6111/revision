import { Atom } from "react-loading-indicators";
import axios from "axios";
import { useEffect, useState } from "react";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/posts")
            .then((res) => setPosts(res.data.posts))
            .catch((err) => {
                console.log(err.message);
            });
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <section className="posts-section">
            {loading ? (
                <Atom
                    color="#000000"
                    size="large"
                    text="Loading..."
                    textColor=""
                />
            ) : (
                ""
            )}
            {posts.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))}
        </section>
    );
}

export default Posts;
