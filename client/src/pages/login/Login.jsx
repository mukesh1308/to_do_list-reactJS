import React, { useState } from "react";
import LoginBlock from "../../components/log_in/LoginBlock";
import SignupBlock from "../../components/log_in/SignupBlock";
import "./login.css";


const Login=({cookie})=>{
    const[toggle,setToggle]=useState({state:true,comment:"new user? ",next:"sign up"});
    const change=()=>{
        if(toggle.state){
            setToggle({state:false,comment:"alrady have account? ",next:"log in"});
        }
        else{
            setToggle({state:true,comment:"new user? ",next:"sign up"});
        }
    }
    return(
        <>
            <div className="container">
                <div className="box">
                    {toggle.state?<LoginBlock cookie={cookie}/>:<SignupBlock/>}
                    <div>
                        <span>{toggle.comment}<span className="signup" onClick={change}>{toggle.next}</span></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;