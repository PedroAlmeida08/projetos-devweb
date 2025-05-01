import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import ContatosPage from "../pages/ContatosPage";
import ProdutosPage from "../pages/ProdutosPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "", element: <HomePage />},
            {path: "produtos", element: <ProdutosPage />},
            {path: "carrinho", element: <CarrinhoPage />},
            {path: "contatos", element: <ContatosPage />},
            {path: "login", element: <LoginPage />}
        ]
    }
])
export default router;