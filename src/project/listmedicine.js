import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import app from "../firebaseconfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import PostListMedicine from "./postlistmedicine";
import { Link } from "react-router-dom";
import checkAuth from "../components/auth/checkAuth";
import { getAuth } from "firebase/auth";
import Navbar from '../components/navbar';
import ReactPaginate from 'react-paginate';

function ListMedicine() {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(3);
  const location = useLocation();
  const auth = getAuth(app);
  const user = auth.currentUser;

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const searchTermLower = value.toLowerCase();
    if (value.trim() === "") {
      setFilteredPosts(allPosts);
    } else {
      const filteredItems = allPosts.filter((item) =>
        item.name.toLowerCase().startsWith(searchTermLower)
      );
      setFilteredPosts(filteredItems);
    }
    setCurrentPage(0); // Reset to the first page after search
  };

  const fetchPosts = useCallback(async () => {
    try {
      if (user) {
        const db = getDatabase(app);
        const dbRef = ref(db, `medicine/${user.uid}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const postsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));
          setAllPosts(postsArray);
          setFilteredPosts(postsArray);
        } else {
          console.log("No data available");
        }
      } else {
        console.error("User not logged in");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, [user]);

  const deletePost = async (postId) => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, `medicine/${user.uid}/${postId}`);
      await remove(dbRef);
      console.log("Post deleted successfully");

      setAllPosts(allPosts.filter(post => post.id !== postId));
      setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [location.state, user, fetchPosts]);

  // Get current posts
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageClick = (event) => {
    console.log(`Selected page: ${event.selected}`);
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    console.log(`Current page: ${currentPage}`);
  }, [currentPage]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card mt-5">
       <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>
                Search Medicine: </label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">MEDICINE LIST</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/createmedicine" className="btn btn-info mb-2">
              ADD MEDICINE
            </Link>
            {currentPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              currentPosts.map((post) => (
                <PostListMedicine
                  key={post.id}
                  post={post}
                  deletePost={deletePost}
                />
              ))
            )}
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              forcePage={currentPage}
              previousClassName={'page-item'}
              nextClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default checkAuth(ListMedicine);
