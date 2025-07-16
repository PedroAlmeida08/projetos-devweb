import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import ProdutosPage from "../pages/ProdutosPage";
import ContatosPage from "../pages/ContatosPage";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "", element: <HomePage />},
            {path: "produtos", element: <ProdutosPage />},
            {path: "contatos", element: <ContatosPage />},
            {path: "login", element: <LoginPage />},
        ]
    }
])
export default router;