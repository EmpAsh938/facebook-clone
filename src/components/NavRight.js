import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/postSlice";
import { db, auth, storageRef } from "../firebase";
import { AiOutlinePlus } from "react-icons/ai";
import { FaFacebookMessenger, FaTimes } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import { IoNotificationsSharp, IoPersonCircleOutline } from "react-icons/io5";
import { getUserDetails } from "../redux/postSlice";

const Profile = styled.div`
  display: none;
  position: absolute;
  width: 120px;
  top: 100%;
  right: 0%;
  background: #fff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 1em;
  z-index: 20;
  & > h5 {
    text-transform: capitalize;
  }
  & > button {
    border: none;
    font-weight: 500;
    transition: all 0.3s linear;
    :hover {
      cursor: pointer;
      font-weight: 600;
      padding-left: 0.5em;
    }
  }
`;
const Container = styled.div`
  display: flex;
  gap: 1em;
  & > div {
    display: flex;
    align-items: center;
    gap: 0.5em;
    position: relative;
    z-index: 10;
    :hover {
      ${Profile} {
        display: block;
      }
    }
    img {
      width: 45px;
      height: 45px;
      object-fit: cover;
    }

    & > h3 {
      text-transform: capitalize;
      display: none;
      font-weight: 600;
      font-size: 0.9rem;
      margin-top: 0.3em;
      letter-spacing: 0.8px;
      @media screen and (min-width: 500px) {
        display: block;
      }
    }
    svg {
      font-size: 2rem;
    }
  }
  & > svg {
    display: none;
    font-size: 2.5rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    border: 7px solid rgba(0, 0, 0, 0.01);

    @media screen and (min-width: 700px) {
      display: block;
    }
  }
  @media screen and (min-width: 900px) {
    display: flex;
    gap: 1.5em;
  }
`;

const EditProfile = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: 0 1em;
  display: grid;
  place-items: center;
  & > div {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
    height: 300px;
    background: #fff;
    padding: 1rem;
    border-radius: 10px;

    input[type="file"] {
      display: none;
    }
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 1em 0;
      :first-of-type > p {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 1em;
      }
      :first-of-type svg {
        font-size: 3rem;
        cursor: pointer;
      }
      :last-of-type {
        gap: 1em;
        & > input {
          border: 1px solid rgba(0, 0, 0, 0.4);
          border-radius: 5px;
          font-size: 1rem;
          padding: 0.5em;
          outline: none;
        }
      }
    }
    & > button {
      display: block;
      border: none;
      margin: auto;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      background-color: #0d48ff;
      cursor: pointer;
      padding: 0.5em 1em;
      border-radius: 20px;
      :last-of-type {
        position: absolute;
        top: 0;
        right: 0;
        width: 80px;
        height: 80px;
        border: none;
        display: inline-block;
        background: transparent;
        & > svg {
          font-size: 2.5rem;
          color: red;
          transition: all 0.3s linear;
          :hover {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
`;

const NavRight = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [name, setName] = useState("");
  const [hold, setHold] = useState(false);

  const dispatch = useDispatch();
  const { user, profilePic, email } = useSelector(
    (state) => state.posts.userDetails
  );

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        localStorage.removeItem("UserCreds");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSave = () => {
    if (name || profileUrl) {
      // do this
      const userRef = auth.currentUser;
      userRef
        .updateProfile({
          displayName: name || user,
          photoURL: profileUrl || profilePic,
        })
        .then(() => {
          // Update successful
          db.collection("posts")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((docs) => {
                if (docs.data().username.toLowerCase() === user.toLowerCase()) {
                  docs.ref.update({
                    username: name || user,
                    profilePicture: profileUrl || profileUrl,
                  });
                }
              });
            });
          dispatch(
            getUserDetails({
              name: name || user,
              pic: profileUrl || profilePic,
              mail: email,
            })
          );

          setIsEdit(false);
        })
        .catch((error) => {
          // An error occured
          console.log(error.message);
        });
      setName("");
      setProfileUrl("");
    }
  };

  const handleImage = async (e) => {
    setHold(true);
    const file = e.target.files[0];
    const newRef = storageRef.ref("images/" + file.name);
    await newRef.put(file);
    setProfileUrl(
      await newRef.getDownloadURL().then((url) => {
        setHold(false);
        return url;
      })
    );
  };
  return (
    <>
      <Container>
        <div onClick={() => setIsEdit(true)}>
          <img src={profilePic || "/images/fb.png"} alt={user} />
          <h3>{user ? user.split(" ")[0] : "UserName"}</h3>
          <Profile>
            <h5>{user}</h5>
            <button onClick={() => setIsEdit(true)}>Edit Profile</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </Profile>
        </div>
        <AiOutlinePlus />
        <FaFacebookMessenger />
        <IoNotificationsSharp />
      </Container>
      {isEdit && (
        <EditProfile>
          <div>
            <div>
              <p>Add Profile Picture</p>
              <label htmlFor="profileImage">
                <RiImageEditFill />
              </label>
              <input
                type="file"
                onChange={handleImage}
                accept="image/*"
                id="profileImage"
              />
              {profileUrl && <p>Image Added</p>}
            </div>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New Username"
              />
            </div>
            <button onClick={handleSave}>Click to Save Changes</button>
            {hold ? (
              <p>Image is processing...</p>
            ) : (
              <button onClick={() => setIsEdit(false)}>
                <FaTimes />
              </button>
            )}
          </div>
        </EditProfile>
      )}
    </>
  );
};

export default NavRight;
