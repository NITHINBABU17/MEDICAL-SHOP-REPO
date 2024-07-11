import { useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebaseconfig";
import { getDatabase, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const auth = getAuth(app);
const user = auth.currentUser;

function PostListMedicine(props) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const deletePost = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `medicine/${props.post.id}`);
    console.log(props.post.id)
    await remove(dbRef);
    alert("Post deleted successfully");
    props.deletePost(props.post.id);
    handleCloseModal();
  };

  return (
    <div className="card">
      <div className="card-body">
        {props.post.name}
        <button className="btn btn-danger float-right" onClick={handleShowModal}>
          Delete
        </button>
        <Link to={`/medicine/${props.post.id}/edit`} className="btn btn-primary float-right">
          Edit
        </Link>
        <Link to={`/medicine/${props.post.id}`} className="btn btn-info float-right">
          View
        </Link>
      </div>

    
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this medicine post?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostListMedicine;
