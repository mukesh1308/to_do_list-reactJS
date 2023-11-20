import { useState } from "react";
import Add from "../add/Add";
import "./nav_bar.css";


const NavBar=({cookie,loadData})=>{
    const [show,setShow]=useState(false);
    const logOut=()=>{
        if(window.confirm("do you wanna log out")){
            console.log(cookie);
            cookie.removeCookie("user_id");
            window.location.reload();
        }
    }
    const addBar=()=>{
        setShow(true);
    }
    return(
        <nav>
            <div className="logo">
                <img src="/img/logo.png" alt="logo"/>
            </div>
            <div className="user">
                <button type="button" onClick={addBar}><img src="/img/add.png" alt="add"/><span>ADD</span></button>
                <span className="log_out" onClick={logOut}>log out</span>
            </div>
            {show && <Add setShow={setShow} loadData={loadData} cookie={cookie}/>}
        </nav>
    )
}
export default NavBar;