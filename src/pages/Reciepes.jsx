import { Atom } from "react-loading-indicators";
import axios from "axios";
import { useEffect, useState } from "react";

function Reciepes() {
    const [reciepes, setReciepes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/recipes")
            .then((res) => setReciepes(res.data.recipes))
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
            {reciepes.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </section>
    );
}

export default Reciepes;
