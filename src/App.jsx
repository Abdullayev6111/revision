import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((res) => setProducts(res.data.products))
            .catch((err) => {
                console.log(err);
            });
        [];
    });
    return (
        <>
            {products?.map((item) => (
                <div key={item.id}>
                    <img src={item.images} alt="" />
                    <h2>{item.title}</h2>
                </div>
            ))}
        </>
    );
}

export default App;
