import styled from "styled-components";

import { AiFillHome } from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";
import { IoStorefrontSharp, IoPeopleCircleOutline } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 5em;
  & > svg {
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    transition: all 0.3s linear;
    :first-of-type {
      color: #1e7de3;
    }
    :hover {
      color: #1e7de3;
    }
  }
  @media screen and (min-width: 600px) {
    gap: 2em;
  }
  @media screen and (max-width: 980px) {
    display: none;
  }
  @media screen and (min-width: 1100px) {
    gap: 3em;
  }
`;

const NavCenter = () => {
  return (
    <Container>
      <AiFillHome />
      <MdOndemandVideo />
      <IoStorefrontSharp />
      <IoPeopleCircleOutline />
    </Container>
  );
};

export default NavCenter;
