import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
  & > form {
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 0.5em 0.8em;
    & > svg {
      font-size: 1.2rem;
      color: rgba(0, 0, 0, 0.6);
    }
    & > input {
      flex: 1;
      border: none;
      outline: none;
      padding-left: 1em;
      font-size: 1rem;
    }
  }
`;

const Image = styled.img`
  display: none;
  height: 45px;
  object-fit: contain;
  margin-left: -1em;
  @media screen and (min-width: 500px) {
    display: block;
  }
`;

const NavLeft = () => {
  return (
    <Container>
      <Image src="/images/fb.png" alt="facebook logo" />
      <form>
        <FaSearch />
        <input type="text" placeholder="Search Facebook" />
      </form>
    </Container>
  );
};

export default NavLeft;
