import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app from "../firebaseconfig";
import { getDatabase, ref, get } from "firebase/database";
import checkAuth from "../components/auth/checkAuth";
import { getAuth } from "firebase/auth";
import Navbar from "../components/navbar";

function ViewMedicine() {
  const { id } = useParams();
  const [post, setPost] = useState({ name: "", price: "", createdTime: "" });
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchPost = async () => {
      if (user) {
        const db = getDatabase(app);
        const dbRef = ref(db, `medicine/${user.uid}/${id}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setPost(snapshot.val());
        } else {
          console.log("No data available");
        }
      } else {
        console.error("User not logged in");
      }
    };
    fetchPost();
  }, [id, user]);

  return (
    <div><Navbar/>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3>{post.name}</h3>
            </div>
            <div className="card-body">
              <p>Price: {post.price}</p>
              <p>Created Time: {new Date(post.createdTime).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default checkAuth(ViewMedicine);
