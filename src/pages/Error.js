import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(45deg, #0575e6, #021b79);

  & > div {
    height: 400px;
    padding: 5em 0;
    & > h2 {
      font-size: clamp(1.4rem, 2vw, 2rem);
      text-align: center;
      color: #fff;
    }
    & > a {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
      margin-top: 2em;
      color: palevioletred;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Error = () => {
  return (
    <Container>
      <div>
        <h2>Oops! You have come to a dead end.</h2>
        <Link to="/">Get Back</Link>
      </div>
    </Container>
  );
};

export default Error;
