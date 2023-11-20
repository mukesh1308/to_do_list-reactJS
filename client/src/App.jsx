import { createBrowserRouter,RouterProvider } from "react-router-dom";
import {useCookies} from 'react-cookie';
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

const App=()=>{
    const[data,setCookie,removeCookie]=useCookies(['user_id']);
    const router=createBrowserRouter([
        {path:"/",element:<Home cookie={{data,setCookie,removeCookie}}/>},
        {path:"/login",element:<Login cookie={{data,setCookie,removeCookie}}/>}
    ])
    return(
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App;