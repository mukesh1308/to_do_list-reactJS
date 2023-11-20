import { useRef, useState } from "react";
import "./block.css";
import axios from "axios";

const LonginBlock=({cookie})=>{
    const email=useRef(null);
    const passward=useRef(null);
    const [error,setError]=useState("");
    const login=()=>{
        if(!email.current.value || !passward.current.value){
            setError("fill all the fields");
            return;
        }
        let data={email:email.current.value,passward:passward.current.value};
        axios.post(`http://${window.location.hostname}:800/logIN`,data,)
        .then((res)=>{
            cookie.setCookie("user_id",res.data.data);
            window.location.href="/";
        })
        .catch((err)=>{
            if(!err.response){
                setError("internal error");
                return;
            }
            setError(err.response.data.data);
        })
    }
    return(
        <>
            <h1>Login</h1>
            <label form="email">
                <span>Email:</span><br/>
                <input type="email" ref={email} autoComplete="off" id="email"/><br/>
            </label>
            <label>
                <span>Passward:</span><br/>
                <input type="password" ref={passward} id="passward"/><br/>
            </label>
            <span className="error">{error}</span>
            <button type="button" onClick={login}>Login</button>
        </>
    )
}

export default LonginBlock;