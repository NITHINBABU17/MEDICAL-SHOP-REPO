import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../store/authSlice";
import checkGuest from "../components/auth/checkGuest";
import Navbar from '../components/navbar';


function LOgin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || ''
      };

      const token = await user.getIdToken();

      dispatch(setUser({ user: userData, token }));

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      navigate('/');
    } catch (error) {
      const errorMessage = error.message;
      console.error('Error logging in user:', errorMessage);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div>
      <Navbar/>
   
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <div className="card mt-5">
              <div className="card-body">
                <h1 className="card-title">Login</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary float-center" onClick={loginUser}>Login</button>
                </div>
                <p className="mt-3">New User? <a href="signup">Click here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  );
}

export default checkGuest(LOgin);
