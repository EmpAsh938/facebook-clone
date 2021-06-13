import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IoMdPhotos } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { MdAddAPhoto } from "react-icons/md";
import Sidebar from "./Sidebar";
import { addPost } from "../redux/postSlice";
import { db, storageRef } from "../firebase";

const Wrapper = styled.div`
  & > form {
    display: flex;
    align-items: center;
    gap: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    & > img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    & > div {
      flex: 1;
      display: flex;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      overflow: hidden;
      & > input {
        flex: 1;
        outline: none;
        border: none;
        border-radius: 20px;
        font-size: 1rem;
        padding: 0.5em;
      }
      & > button {
        border: none;
        color: #444;
        margin-right: 0.5em;
        cursor: pointer;
        border-left: 1px solid rgba(0, 0, 0, 0.3);
        padding-left: 0.5em;

        & > svg {
          font-size: 2rem;
        }
      }
    }
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 1em;
    & svg {
      color: red;
    }
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: grid;
  place-items: center;
  & > div:first-of-type {
    border-radius: 10px;
    padding: 1em;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    & > input {
      padding: 0.5em 1em;
      outline: none;
      border: none;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      font-size: 1rem;
    }
    & > input[type="file"] {
      padding: 1em;
      width: 300px;
    }
    & > p {
      margin-left: 2em;
      font-weight: 500;
      font-size: 1.2rem;
      text-transform: uppercase;
    }
    & > textarea {
      resize: none;
      outline: none;
      width: 300px;
      font-size: 1rem;
      @media screen and (min-width: 450px) {
        width: 400px;
      }
    }
    & > button {
      border: none;
      font-size: 1rem;
      font-weight: 500;
      color: #fff;
      background: #1a38de;
      padding: 0.5em 0;
      :hover {
        cursor: pointer;
        opacity: 0.9;
      }
    }
  }
  & > div:last-of-type {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: transparent;
    z-index: -1;
  }
`;

const WritePosts = () => {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [tempPosts, setTempPosts] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [standby, setStandby] = useState(false);

  const dispatch = useDispatch();

  const { profilePic, user } = useSelector((state) => state.posts.userDetails);

  const addPostImage = async (e) => {
    setStandby(true);
    // const reader = new FileReader();
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    // reader.onload = () => {
    //   setUrl(reader.result);
    // };
    const file = e.target.files[0];
    const newRef = storageRef.ref("images/" + file.name);
    await newRef.put(file);
    setUrl(
      await newRef.getDownloadURL().then((url) => {
        setStandby(false);
        return url;
      })
    );
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (input || url) {
      setToggleModal(false);
      db.collection("posts").add({
        id: new Date().getTime().toString(),
        username: user,
        profilePicture: profilePic,
        postText: input,
        postImage: url,
        likes: 0,
        likeSignature: [],
      });
      setInput("");
      setUrl("");
    }
  };
  useEffect(() => {
    db.collection("posts")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        setTempPosts(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
  }, []);
  useEffect(() => {
    dispatch(addPost(tempPosts));
  }, [tempPosts]);
  return (
    <Wrapper>
      <form onSubmit={handlePost}>
        <img src={profilePic || "/images/fb.png"} alt="Facebook stories" />
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's on your mind?"
          />
          {input && (
            <button type="button" onClick={() => setToggleModal(true)}>
              <MdAddAPhoto />
            </button>
          )}
          {toggleModal && (
            <Modal onSubmit={handlePost}>
              <div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows="15"
                  cols="20"
                >
                  Write Posts
                </textarea>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter url of image"
                />

                <p>or</p>
                <input type="file" accept="image/*" onChange={addPostImage} />
                {standby ? (
                  <p>Wait a moment...</p>
                ) : (
                  <button onClick={handlePost}>Done</button>
                )}
              </div>
              <div onClick={() => setToggleModal(false)}></div>
            </Modal>
          )}
        </div>
      </form>
      <div>
        <div onClick={() => setToggleModal(true)}>
          <Sidebar Icon={IoMdPhotos} title="Photos" />
        </div>
        <div onClick={() => setToggleModal(true)}>
          <Sidebar Icon={BsPencilSquare} title="Write a post" />
        </div>
      </div>
    </Wrapper>
  );
};

export default WritePosts;
