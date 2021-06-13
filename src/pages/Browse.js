import { useState, useEffect } from "react";
import styled from "styled-components";
import { auth } from "../firebase";

import { useSelector, useDispatch } from "react-redux";

import { IoPeopleCircle, IoStorefrontSharp } from "react-icons/io5";
import { MdEvent, MdOndemandVideo } from "react-icons/md";
import { BsPeopleFill, BsClockFill } from "react-icons/bs";

import { getUserDetails } from "../redux/postSlice";
import NavCenter from "../components/NavCenter";
import NavLeft from "../components/NavLeft";
import NavRight from "../components/NavRight";
import Sidebar from "../components/Sidebar";
import Stories from "../components/Stories";
import WritePosts from "../components/WritePosts";
import ShowPosts from "../components/ShowPosts";

const Header = styled.header`
  padding: 1em;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  height: 80px;
  background: #fff;
  z-index: 5;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1em;
`;
const Container = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
`;

const SidebarContainer = styled.aside`
  display: none;
  left: 0;
  flex: 0.3;
  padding-top: 1em;
  padding-left: 1em;
  flex-direction: column;
  gap: 2em;
  height: calc(100vh - 80px);
  @media screen and (min-width: 600px) {
    display: flex;
  }
`;

const HeroContainer = styled.section`
  padding: 1em;
  flex: 1;
  @media screen and (min-width: 600px) {
    flex: 0.5;
  }
`;

const Posts = styled.article`
  width: 95%;
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
  & > div {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 1em;
  }
`;

// const Loader = styled.div`
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background: #fff;
//   z-index: 100;
//   & > h2 {
//     font-size: 3rem;
//     margin-top: 2em;
//     text-align: center;
//   }
// `;

const Browse = () => {
  // const [loading, setLoading] = useState(true);

  const newPosts = useSelector((state) => state.posts.userPosts);
  const { user, profilePic } = useSelector((state) => state.posts.userDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred != null) {
        dispatch(
          getUserDetails({
            name: userCred.displayName,
            pic: userCred.photoURL,
            mail: userCred.email,
          })
        );
        localStorage.setItem("UserCreds", JSON.stringify(userCred));
        // setLoading(false);
      } else {
        console.log("No user!");
      }
    });
  }, []);

  // if (loading) {
  //   return (
  //     <Loader>
  //       <h2>Loading...</h2>
  //     </Loader>
  //   );
  // }
  return (
    <>
      <Header>
        <Navbar>
          {/* Left Component  */}
          <NavLeft />
          {/* Center Component  */}
          <NavCenter />
          {/* Right Component  */}
          <NavRight />
        </Navbar>
      </Header>
      <Container>
        {/* SideBar  */}
        <SidebarContainer>
          <Sidebar
            title={user || "full name"}
            image={profilePic || "images/fb.png"}
          />
          <Sidebar Icon={BsPeopleFill} title="friends" />
          <Sidebar Icon={IoPeopleCircle} title="groups" />
          <Sidebar Icon={IoStorefrontSharp} title="marketplace" />
          <Sidebar Icon={MdOndemandVideo} title="watch" />
          <Sidebar Icon={MdEvent} title="events" />
          <Sidebar Icon={BsClockFill} title="memories" />
        </SidebarContainer>
        {/* Hero  */}
        <HeroContainer>
          {/* Stories  */}
          <Stories />
          <Posts>
            {/* Write Posts  */}
            <WritePosts />
            {/* Show Posts  */}
            {newPosts &&
              newPosts.map((item) => {
                return <ShowPosts key={item.id} arrPost={item} />;
              })}
          </Posts>
        </HeroContainer>
      </Container>
    </>
  );
};

export default Browse;
