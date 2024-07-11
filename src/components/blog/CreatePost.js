import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import checkAuth from "../auth/checkAuth";

function CreatePost() {
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    var navigate = useNavigate()
    function addPost() {
        axios.post('https://demo-blog.mashupstack.com/api/posts',{
            name: name,
            price: price
        }).then(response=>{
            navigate('/')
        })
    }
    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Create MEDICINE List</h1>
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
                        <button className="btn btn-primary float-right" onClick={addPost}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default checkAuth(CreatePost);