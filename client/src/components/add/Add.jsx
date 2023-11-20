import { useRef, useState } from "react";
import "./add.css";
import axios from "axios";

const Add=({setShow,cookie,loadData})=>{
    const tital=useRef(null);
    const content=useRef(null);
    const[error,setError]=useState("");
    const closeBar=()=>{
        setShow(false);
    }
    const addToList=()=>{
        if(!tital.current.value){
            setError("tital is Empty");
            return;
        }
        let data={
            tital:tital.current.value,
            content:content.current.value
        }
        axios.post(`http://${window.location.hostname}:800/add_to_do`,data,{
            headers:{
                key:cookie.data.user_id
            }
        })
        .then((res)=>{
            loadData();
        })
        .catch((err)=>{
            if(!err.response){
                setError("internal error");
            }
            else{
                setError(err.response.data.data);
            }
        })
    }
    return(
        <>
            <div className="box add_to_do">
                <label form="email">
                    <span>Tital:</span><br/>
                    <input type="email" ref={tital} autoComplete="off" id="email"/><br/>
                </label>
                <label>
                    <span>Content:</span><br/>
                    <textarea type="password" ref={content} id="passward"/><br/>
                </label>
                <span className="error">{error}</span>
                <div>
                    <button type="button" onClick={addToList} className="add">Add</button>
                    <button type="button" onClick={closeBar}  className="cancel">Cancel</button>
                </div>
            </div>
        </>
    )

}
export default Add;