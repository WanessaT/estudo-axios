
import { createBrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { Home } from "../screens/Home";
import { NewPost } from "../screens/NewPost";
import { PostDetails } from "../screens/PostDetails";



export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/new', element: <NewPost /> },
            { path: '/posts/:id', element: <PostDetails /> },
        ]
    }
]);