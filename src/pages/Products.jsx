import axios from "axios";
import { useEffect, useState } from "react";
import { Atom } from "react-loading-indicators";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((res) => setProducts(res.data.products))
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
            {products.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))}
        </section>
    );
}

export default Products;
