import { Suspense, lazy } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Pages/Common/Header/Header";
import Footer from "./Pages/Common/Footer/Footer";
import PrivateRouteComponent from "./Pages/Cms/PrivateRouteComponent";

import { AuthProvider } from "./Context/AuthProvider";
import Notfound from "./Utils/Notfound";
import ProductDetails from "./Pages/Cms/ProductDetails";
import Loader from "./Utils/Loader";

const Home = lazy(() => import("../src/Pages/Cms/Home"));
const Login = lazy(() => import("../src/Pages/Auth/Login/Login"));
const Registration = lazy(() => import("../src/Pages/Auth/Reg/Regstration"));
const CreateProduct = lazy(() => import("../src/Pages/Cms/CreateProduct"));
const ProductList = lazy(() => import("../src/Pages/Cms/ProductList"));
const Update = lazy(() => import("../src/Pages/Cms/Update"));
const Profile = lazy(() => import("../src/Pages/Cms/Profile"));

const PublicRoute = [
    {
        path: "/login",
        Component: <Login />,
    },
    {
        path: "/registration",
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
    {
        path: "/profile",
        Component: <Profile />,
    },
];

function App() {
    return (
        <>
            <AuthProvider>
                <Suspense fallback={<Loader />}>
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
