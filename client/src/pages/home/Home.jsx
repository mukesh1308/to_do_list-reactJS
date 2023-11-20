import NavBar from "../../components/nav_bar/NavBar";
import List from "../../components/list/List";
import User from "../../components/user/User";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Home=({cookie})=>{
    const[list,setList]=useState([]);
    const loadData=()=>{
        axios.get(`http://${window.location.hostname}:800/list`,{
            headers:{
                key:cookie.data.user_id
            }
        })
        .then((res)=>{
            console.log(res.data.data);
            setList(res.data.data);
        })
        .catch((err)=>{
            console.log.apply(err);
            if(!err.response){
                if(window.confirm("some internal error do you want to reload")){
                    window.location.reload();
                }
            }
            else{
                cookie.removeCookie("user_id");
                window.location.href="/login";
            }
        })
    }
    useEffect(loadData,[cookie]);
    if(!cookie.data.user_id){
        console.log(window.location.hostname);
        window.location.href="/login";
    }
    else{
        return(
            <>
                <NavBar cookie={cookie} loadData={loadData}/>
                <div className="user_data">
                    <User cookie={cookie}/>
                    <hr/>
                </div>
                <div className="list_container">
                    <List toDo={list} cookie={cookie} loadData={loadData}/>
                </div>
            </>
        )
    }
}

export default Home;