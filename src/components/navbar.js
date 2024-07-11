import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch ();
    const navigate =useNavigate();
    
    function logout(){
       
            dispatch(removeUser());
            navigate('/login');
    
    }
  return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>MEDSHOP</h4>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
data-target="#navbarNav" aria-controls="navbarNav"aria-expanded="false"
           aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse " id="navbarNav " style={{ float: "left" }}>
            <ul className="navbar-nav mr-auto" style={{ color: "#ffffff" }}>
                <li className="nav-item mx-2">
                <NavLink to={"/"} className={'nav-link'+(({isActive})=>(isActive?'active':''))}>
                    Home
                </NavLink>
                </li>
 <li className="nav-item mx-2">
                <NavLink to={"/listmedicine"} className={'nav-link'+(({isActive})=>(isActive?'active':''))}>
                    List 
                </NavLink>
                </li>
                </ul>
                </div>
                <div
        className="collapse navbar-collapse " id="navbarNav " style={{ float: "right" }}>
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                
 <li className="nav-item mx-2 ">
                <NavLink to={"/signup"} className={'nav-link'+(({isActive})=>(isActive?'active':''))}>
                  Register
                </NavLink>
                </li>
    {user? <li className="nav-item mx-2">
           <span className={'nav-link'+(({isActive})=>(isActive?'active':''))} onClick={logout} >Logout</span>
  </li>:
                    <li className="nav-item">
                    <NavLink to={"/login"} className={'nav-link'+(({isActive})=>(isActive?'active':''))}>
                        Login
                    </NavLink>
                    </li>
            }
            </ul>
       </div>
    </nav>;
}

export default Navbar;