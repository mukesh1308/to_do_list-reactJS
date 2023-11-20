import { useRef, useState } from "react";
import axios from "axios";
import "./block.css";

const SignupBlock=()=>{
    const firstName=useRef(null);
    const lastName=useRef(null);
    const email=useRef(null);
    const passward=useRef(null);
    const conformPassward=useRef(null);

    const [error,setError]=useState("");

    const signUp=()=>{
        let fName=firstName.current.value;
        let lName=lastName.current.value;
        let email_id=email.current.value;
        let pass=passward.current.value;
        let cPass=conformPassward.current.value;
        if(!fName || !lName || !email_id || !pass || !cPass){
            setError("fill all the fields");
            return;
        }
        if(pass!==cPass){
            setError("passward does not match");
            return;
        }
        let data={
            first_name:fName,
            last_name:lName,
            email:email_id,
            passward:pass
        }
        axios.post(`http://${window.location.hostname}:800/signUP`,data)
        .then((res)=>{
            alert("registration is completed");
            window.location.reload();
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
            <h1>Sign Up</h1>
            <label form="fName">
                <span>First Name:</span><br/>
                <input type="text" ref={firstName} autoComplete="off" id="fName"/><br/>
            </label>
            <label form="lName">
                <span>Last Name:</span><br/>
                <input type="text" ref={lastName} autoComplete="off" id="lName"/><br/>
            </label>
            <label form="email">
                <span>Email:</span><br/>
                <input type="email" ref={email} autoComplete="off" id="email"/><br/>
            </label>
            <label form="password">
                <span>Passward:</span><br/>
                <input type="password" ref={passward} id="password"/><br/>
            </label>
            <label form="cPass">
                <span>Conform Passward:</span><br/>
                <input type="password" ref={conformPassward} id="cPass"/><br/>
            </label>
            <span className="error">{error}</span>
            <button type="button" onClick={signUp}>Sign up</button>
        </>
    )
}

export default SignupBlock;