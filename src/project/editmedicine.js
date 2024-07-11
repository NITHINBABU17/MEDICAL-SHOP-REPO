import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import app from "../firebaseconfig";
import { getDatabase, ref, get, update } from "firebase/database";
import checkAuth from "../components/auth/checkAuth";
import { getAuth } from "firebase/auth";
import Navbar from "../components/navbar";
function EditMedicine() {
  const { id: postId } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const db = getDatabase(app);
          const dbRef = ref(db, `medicine/${user.uid}/${postId}`);
          const snapshot =  await get(dbRef);
          console.log("dbref", dbRef);
          console.log("user.uid", user.uid);
          console.log("postId", postId  );
          if (snapshot.exists()) {
            const data = snapshot.val();
            setName(data.name);
            setPrice(data.price);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      } else {
        console.error("User not logged in");
      }
    };
    fetchData();
  }, [postId, user]);

  const updatePost = async () => {
    if (user) {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, `medicine/${user.uid}/${postId}`); 
        await update(dbRef, {
          name,
          price,
        });
        alert("Post updated successfully");
        navigate('/listmedicine', { state: { updated: true } });
      } catch (error) {
        alert("Error updating post: " + error.message);
      }
    } else {
      console.error("User not logged in");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">Edit Medicine</h1>
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
              <input 
                type="text" 
                className="form-control" 
                value={price} 
                onChange={(event) => setPrice(event.target.value)} 
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary float-right" onClick={updatePost}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(EditMedicine);
