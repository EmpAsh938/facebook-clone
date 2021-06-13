import styled from "styled-components";
import LoginImage from "../components/LoginImage";
import LoginForm from "../components/LoginForm";

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  & > article {
    display: flex;
    justify-content: center;
    &:first-of-type {
      flex: 0.1;
      @media screen and (min-width: 900px) {
        justify-content: flex-end;
        flex: 0.5;
      }
    }
    &:last-of-type {
      flex: 0.9;
      @media screen and (min-width: 900px) {
        flex: 0.5;
        padding: 2em;
      }
    }
  }
  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

const Login = () => {
  return (
    <Wrapper>
      <article>
        <LoginImage />
      </article>
      <article>
        <LoginForm />
      </article>
    </Wrapper>
  );
};

export default Login;
