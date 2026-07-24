import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home";
import Listing from "../Pages/ListingPage/Listing";
import NewPage from "../Pages/NewPage/NewPage";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Contact from "../Pages/ContactPage/Contact";
import CarsDetails from "../Pages/CarsDetails/CarsDetails";
import LogIn from "../Auth/LogIn&Registation/LogIn";
import Registation from "../Auth/LogIn&Registation/Registation";
import AuthLayout from "../Layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: '/', Component: RootLayout, children: [
            { index: true, Component: Home },
            { path: 'listing', element: <Listing></Listing> },
            { path: 'newPage', element: <NewPage></NewPage> },
            { path: 'blog', element: <Blog></Blog> },
            { path: 'about', element: <About></About> },
            { path: 'contact', element: <Contact></Contact> },
            { path: 'carsDetails/:id', element: <CarsDetails></CarsDetails> },
        ]
    },
    //Todo Auth provider roter here.
    {
        path: 'auth', element: <AuthLayout></AuthLayout>, children: [
            { index: true, element: <LogIn></LogIn> },
            { path: 'registation', element: <Registation></Registation> }
        ]

    }
])
export default router