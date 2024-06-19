import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Pages/Common/Header/Header";
import Footer from "./Pages/Common/Footer/Footer";
import PrivateRouteComponent from "./Pages/Cms/PrivateRouteComponent";
import { ToastContainer } from "react-toastify";
import Registration from "./Pages/Auth/Reg/Registration";
import { AuthProvider } from "./Context/AuthProvider";
import Notfound from "./Utils/Notfound";
import ProductDetails from "./Pages/Cms/ProductDetails";

const Home = lazy(() => import("../src/Pages/Cms/Home"));
const Login = lazy(() => import("../src/Pages/Auth/Login/Login"));
const Reg = lazy(() => import("../src/Pages/Auth/Reg/Reg"));
const CreateProduct = lazy(() => import("../src/Pages/Cms/CreateProduct"));
const ProductList = lazy(() => import("../src/Pages/Cms/ProductList"));
const Update = lazy(() => import("../src/Pages/Cms/Update"));

const PublicRoute = [
    {
        path: "/login",
        Component: <Login />,
    },
    {
        path: "/reg",
        Component: <Registration />,
    },
    {
        path: "/",
        Component: <Home />,
    },
];

const PrivateRoute = [
    {
        path: "/createproduct",
        Component: <CreateProduct />,
    },
    {
        path: "/productlist",
        Component: <ProductList />,
    },
    {
        path: "/update/:id",
        Component: <Update />,
    },
    {
        path: "/details/:id",
        Component: <ProductDetails />,
    },
];

function App() {
    return (
        <>
            <AuthProvider>
                <Suspense fallback={<h1>Loading.....</h1>}>
                    <Router>
                        <Header />

                        <Routes>
                            {PublicRoute?.map((route, i) => (
                                <Route
                                    key={i}
                                    path={route.path}
                                    element={route.Component}
                                />
                            ))}
                            {PrivateRoute?.map((route, i) => (
                                <Route
                                    key={i}
                                    path={route.path}
                                    element={
                                        <PrivateRouteComponent>
                                            {route.Component}
                                        </PrivateRouteComponent>
                                    }
                                />
                            ))}
                            <Route path="*" element={<Notfound />} />
                        </Routes>
                        <Footer />
                    </Router>
                </Suspense>
            </AuthProvider>
        </>
    );
}

export default App;
