import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ListPosts from "./components/blog/ListPost";
import CreatePost from "./components/blog/CreatePost";
import ViewPost from "./components/blog/Viewpost";
import EditPost from "./components/blog/editpost";
// import Register from "./components/auth/register";
// import Login from "./components/auth/Login";
import CreateMedicine from "./project/createmedicine";
import ListMedicine from "./project/listmedicine";
import ViewMedicine from "./project/viewmedicine";
import EditMedicine from "./project/editmedicine";
import Signup from "./project/signup";
import LOgin from "./project/login";
// import checkAuth from "./components/auth/checkAuth";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path : 'blog/posts' , element : <ListPosts/> },
    {path:'blog/posts/create', element:<CreatePost/>},
    {path:'blog/posts/:postId', element:<ViewPost/>},
    {path:'blog/posts/:postId/edit', element:<EditPost/>},
    // {path:'register', element:<Register/>},
    // {path:'Login', element:<Login/>},
    {path:'createmedicine', element:<CreateMedicine/>},
    {path:'/listmedicine',element:<ListMedicine/>},
    {path:'/medicine/:id', element:<ViewMedicine/>},
    {path:'/medicine/:id/edit', element:<EditMedicine/>},
    {path:'signup', element:<Signup/>},
    {path:'login', element:<LOgin/>}
]);

export default router;