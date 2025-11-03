import { Atom } from "react-loading-indicators";
import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/users")
            .then((res) => setUsers(res.data.users))
            .catch((err) => {
                console.log(err.message);
            });
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <section className="products-section">
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
            {users.map((item) => (
                <p key={item.id}>{item.firstName}</p>
            ))}
        </section>
    );
}

export default Users;
