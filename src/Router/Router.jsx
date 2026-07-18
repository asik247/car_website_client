import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home";
import Listing from "../Pages/ListingPage/Listing";
import NewPage from "../Pages/NewPage/NewPage";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Contact from "../Pages/ContactPage/Contact";

const router = createBrowserRouter([
    {
        path: '/', Component: RootLayout, children: [
            {index:true,Component:Home},
            {path:'listing',element:<Listing></Listing>},
            {path:'newPage',element:<NewPage></NewPage>},
            {path:'blog',element:<Blog></Blog>},
            {path:'about',element:<About></About>},
            {path:'contact',element:<Contact></Contact>}
        ]
    }
])
export default router