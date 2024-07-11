import { useState, useEffect } from "react";
import app from "../firebaseconfig";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import checkAuth from "../components/auth/checkAuth";
import { getAuth } from "firebase/auth";
import Navbar from "../components/navbar";

function CreateMedicine() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [medicineCount, setMedicineCount] = useState(0); 
  const navigate = useNavigate();
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      
      const db = getDatabase(app);
      const userMedicineRef = ref(db, `medicine/${user.uid}`);
      get(userMedicineRef).then((snapshot) => {
        if (snapshot.exists()) {
          setMedicineCount(Object.keys(snapshot.val()).length); 
        }
      }).catch((error) => {
        console.error("Error fetching medicine count:", error);
      });
    }
  }, [user]); 

  const addPost = () => {
    if (user) {
      if (medicineCount >= 5) {
        alert("You can only create up to 5 medicines.");
        return;
      }

      const db = getDatabase(app);
      const newDoc = push(ref(db, `medicine/${user.uid}`));
      set(newDoc, {
        name: name,
        price: price,
        createdTime: new Date().toISOString(),
        userId: user.uid
      })
      .then(() => {
        alert("Data saved successfully");
        navigate('/listmedicine'); 
        setMedicineCount(medicineCount + 1); 
      })
      .catch(error => alert("Error: " + error.message));
    } else {
      alert("User not logged in");
    }
  };

  return (
    <div> <Navbar/>
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
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>PRICE:</label>
            <textarea
              className="form-control"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary float-right" onClick={addPost}>Submit</button>
          </div>
        </div>
      </div>
    </div>
    </div> 
  );
}

export default checkAuth(CreateMedicine);
