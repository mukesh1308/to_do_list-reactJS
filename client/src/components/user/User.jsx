import axios from "axios";
import { useEffect, useState } from "react";
import "./user.css";

const User=({cookie})=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    useEffect(()=>{
        axios.get(`http://${window.location.hostname}:800/user`,{
            headers:{
                key:cookie.data.user_id
            }
        })
        .then((res)=>{
            console.log(res);
            setName(res.data.data.first_name+" "+res.data.data.last_name);
            setEmail(res.data.data.email);
        })
        .catch((err)=>{
            window.location.href="/login";
        })
    },[cookie]);
    return(
        <>
            <table className="user_data">
                <tr>
                    <td>Name</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{email}</td>
                </tr>
            </table>
        </>
    )
}
 export default User;