import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { FaShare } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { db } from "../firebase";
import { likePost } from "../redux/postSlice";

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1em;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 1em;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  & > h2 {
    font-size: 1.1rem;
    letter-spacing: 1px;
    text-transform: capitalize;
  }
`;

const ContentPost = styled.div`
  & > img {
    display: block;
    width: 100%;
    height: 100%:
    object-fit: cover;
  }
`;

const PostButton = styled.div`
  //   border: solid red;
  & > div {
    display: flex;
    align-items: center;
    &:first-of-type {
      padding-bottom: 0.5em;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      gap: 1em;
      & svg {
        font-size: 1.4rem;
        color: #348aed;
      }
    }
    &:last-of-type {
      padding-top: 0.5em;
      justify-content: space-around;
      border: none;
      & > *,
      div {
        color: #348aed;
      }
    }
  }
`;

const ShowPosts = (props) => {
  const [docId, setDocId] = useState();
  const dispatch = useDispatch();
  const mail = useSelector((state) => state.posts.userDetails.email);
  const user = useSelector((state) => state.posts.userDetails.user);
  const {
    id,
    username,
    profilePicture,
    postImage,
    postText,
    likes,
    likeSignature,
  } = props.arrPost;

  const handleLike = () => {
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((docs) => {
          if (docs.data().id === id) {
            setDocId(docs.id);
          }
        });
      });
  };

  useEffect(() => {
    if (!docId) {
      return;
    }
    const ref = db.collection("posts").doc(docId);
    const checkState = likeSignature.some((item) => item.email === mail);
    const rest = likeSignature.filter((i) => i.email !== mail);
    const newArr = [...likeSignature, { email: mail, username: user }];
    ref
      .update({
        likes: checkState ? likes - 1 : likes + 1,
        likeSignature: checkState ? rest : newArr,
      })
      .then(() => {
        // dispatch(likePost({ uniqId: id }));
        console.log("Firestore updated!!!");
      })
      .catch(() => {
        console.log("Error while updating");
      });
    setDocId();
  }, [docId]);

  return (
    <Wrapper>
      <Header>
        {/* Header  */}
        <img src={profilePicture || "/images/fb.png"} alt="Stories" />
        <h2>{username}</h2>
      </Header>
      <ContentPost>
        {/* Text & Image Post   */}
        <p>{postText}</p>

        {postImage && <img src={postImage} alt="URL seems off" />}
      </ContentPost>
      <PostButton>
        {/* Buttons Post  */}
        {likes === 0 || (
          <div>
            <Sidebar Icon={AiFillLike} />
            <span>{likes}</span>
          </div>
        )}
        <div>
          <div onClick={handleLike}>
            <Sidebar Icon={AiFillLike} title="Like" />
          </div>
          <Sidebar Icon={VscComment} title="Comment" />
          <Sidebar Icon={FaShare} title="Share" />
        </div>
      </PostButton>
    </Wrapper>
  );
};

export default ShowPosts;
