import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import checkAuth from "../auth/checkAuth";

function EditPost() {
    const {postId} = useParams();
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    let navigate = useNavigate();
    useEffect(()=>{
        axios.get('https://demo-blog.mashupstack.com/api/posts/'+postId).then(response=>{
            setname(response.data.title);
            setprice(response.data.content);
        })
    },[postId]);
    function updatePost(){
        axios.post('https://demo-blog.mashupstack.com/api/posts/'+postId,{
            name: name,
            price: price
        }).then(response=>{
            alert(response.data.message)
        })
        navigate('/blog/posts');
    }
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Edit Post</h1>
                    <div className="form-group">
                        <label>NAME:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setname(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>PRICE:</label>
                        <textarea 
                        className="form-control" 
                        value={price} 
                        onChange={(event)=>{setprice(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={updatePost}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(EditPost);