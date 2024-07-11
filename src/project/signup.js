import { useState } from "react";
import { auth, database } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
const navigate= useNavigate()
    const registerUser = () => {
        if (password !== passwordConf) {
            setErrorMessage('Passwords do not match');
            return;
        }

        console.log("Attempting to register user:", email);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User registered:", user.uid);

                return set(ref(database, 'users/' + user.uid), {
                    name: name,
                    email: email,
                });
            })
            .then(() => {
            
                setName('');
                setEmail('');
                setPassword('');
                setPasswordConf('');
                setErrorMessage('');
                navigate('/login')
            })
            .catch((error) => {
                console.error('Error registering user:', error.message);
                setErrorMessage(error.message);
            });
    };
return (
    <div>
        <Navbar/>
        <div className="container ">
            <div className="row">
                <div className="col-8 offset-2">
                <div className="card mt-5">
              <div className="card-body">
                <h1 className="card-title">Register</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={passwordConf}
                            onChange={(event) => setPasswordConf(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary my-3" onClick={registerUser}>Submit</button>
                    </div>
                    <p>Already have account? <a href="login">click here</a> </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Signup;
