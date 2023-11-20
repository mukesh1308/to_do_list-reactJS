import axios from "axios"
import "./list.css"

const List=({toDo,cookie,loadData})=>{
    const mark=(list_id)=>{
        axios.put(`http://${window.location.hostname}:800/done`,{list_id},{
            headers:{
                key:cookie.data.user_id
            }
        })
        .then((res)=>{
            loadData();
        })
        .catch((err)=>{
            if(!err.response){
                alert("internal error");
            }
            else{
                alert(err.response.data.data);
            }
        })
    }
    const remove=(list_id)=>{
        axios.delete(`http://${window.location.hostname}:800/remove`,{
            headers:{
                key:cookie.data.user_id
            },
            data:{list_id}
        })
        .then((res)=>{
            console.log(res);
            loadData();
        })
        .catch((err)=>{
            console.log(err);
            if(!err.response){
                alert("internal error");
            }
            else{
                alert(err.response.data.data);
            }
        })
    }
    return(
        <>
            {toDo.map((ele)=>{
                return(
                    <label key={ele.list_id} htmlFor={ele.list_id} className="list_item">
                        <div className="list_cont">
                            <div className="tital_div">
                                <img src={ele.status?"/img/checked.png":"/img/unchecked.png"} alt="marker"/>
                                <span className="tital">{ele.tital}</span>
                            </div>
                            <div className="button_cont">
                                {!ele.status && <button type="button" onClick={()=>mark(ele.list_id)}>mark Done</button>}
                                <img src="/img/cross.png" onClick={()=>remove(ele.list_id)} alt="cross"/>
                            </div>
                        </div>
                        <input type="checkbox" name="show" id={ele.list_id}/>
                        <div className="drop_down">
                            <hr/>
                            <span className="content">{ele.content}</span>
                        </div>
                    </label>
                )
            })}
        </>
    )
}

export default List;