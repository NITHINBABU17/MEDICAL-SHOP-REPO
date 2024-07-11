import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const checkAuth = (Component) =>{
    function Wrapper(props){
        // console.log(store, 'sjhdghsdsh')
        var user = useSelector(store=>store.auth.user);
        console.log(user, 1111)
        const navigate = useNavigate();
        useEffect(()=>{
            if(!user){
                console.log('heyy')
                navigate('/login');
            }
        },[user]);
        return <Component {...props}/>;
    }
    return Wrapper;
}

export default checkAuth;