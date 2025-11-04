import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Header from "./Header";
import Products from "./pages/Products.jsx";
import Users from "./pages/Users.jsx";
import Reciepes from "./pages/Reciepes.jsx";
import Posts from "./pages/Posts.jsx";
import NotFound from "./pages/NotFound.jsx";
import "@mantine/core/styles.css";

function App() {
    return (
        <BrowserRouter>
            <MantineProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/reciepes" element={<Reciepes />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MantineProvider>
        </BrowserRouter>
    );
}

export default App;
